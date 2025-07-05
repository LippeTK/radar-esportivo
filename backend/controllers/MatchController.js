import api from "../utils/api.js"
import redis from "../redisClient.js"
export default class MatchController {
  static async getDailyMatches(req, res) {
    const cacheKey = "dailyMatches"
    try {
      // 1. Tenta pegar do Redis
      const cachedData = await redis.get(cacheKey)
      if (cachedData) {
        console.log("🔁 Respondendo do Redis (getDailyMatches)")
        return res.json(JSON.parse(cachedData))
      }

      // 2. Se não tiver cache, busca na API
      console.log("🔁 Puxando da API")
      const response = await api.get("/fixtures", {
        params: {
          timezone: "America/Sao_Paulo",
          live: "all",
        },
      })
      const games = response.data.response.map((game) => ({
        league: game.league.name,
        home: game.teams.home.name,
        away: game.teams.away.name,
        goalsHome: game.goals.home,
        goalsAway: game.goals.away,
        status: game.fixture.status.short, // Ex: 1H, 2H, FT...
        elapsed: game.fixture.status.elapsed,
        id: game.fixture.id,
      }))

      // 3. Salva no Redis, cache expira em 30 segundos
      await redis.set(cacheKey, JSON.stringify(games), { EX: 30 })

      res.json(games)
    } catch (error) {
      console.error(
        "Erro na requisição:",
        error.response?.data || error.message
      )
      res.status(500).json({ error: "Erro ao buscar dados da API" })
    }
  }

  static async getMatchById(req, res) {
    const { id } = req.params
    const cacheKey = `match:${id}`

    try {
      //  Verifica se já tem cache
      const cachedData = await redis.get(cacheKey)

      if (cachedData) {
        console.log("🔁 Respondendo do Redis")
        return res.json(JSON.parse(cachedData))
      }

      //  Se não tiver no cache, busca da API
      console.log("🔁 Puxando da API")
      const response = await api.get(`/fixtures`, { params: { id } })
      const data = response.data.response[0]

      if (!data) {
        return res.status(404).json({ error: "Jogo não encontrado" })
      }

      //  Estatísticas
      const statistics = data.statistics.map((stat) => {
        const find = (type) => {
          const item = stat.statistics.find((s) => s.type === type)
          return item ? item.value : null
        }

        return {
          team: stat.team.name,
          shotsOnGoal: find("Shots on Goal"),
          shotsOffGoal: find("Shots off Goal"),
          totalShots: find("Total Shots"),
          blockedShots: find("Blocked Shots"),
          shotsInsideBox: find("Shots insidebox"),
          shotsOutsideBox: find("Shots outsidebox"),
          fouls: find("Fouls"),
          corners: find("Corner Kicks"),
          offsides: find("Offsides"),
          possession: find("Ball Possession"),
          yellowCards: find("Yellow Cards"),
          redCards: find("Red Cards"),
          goalkeeperSaves: find("Goalkeeper Saves"),
          totalPasses: find("Total passes"),
          passesAccurate: find("Passes accurate"),
          passPercentage: find("Passes %"),
          expectedGoals: find("expected_goals"),
          goalsPrevented: find("goals_prevented"),
        }
      })

      //  Escalações
      const lineups = data.lineups.map((team) => ({
        team: team.team.name,
        formation: team.formation,
        startXI: team.startXI.map((p) => ({
          id: p.player.id,
          name: p.player.name,
          number: p.player.number,
          pos: p.player.pos,
          grid: p.player.grid,
        })),
        substitutes: team.substitutes.map((p) => ({
          id: p.player.id,
          name: p.player.name,
          number: p.player.number,
          pos: p.player.pos,
          grid: p.player.grid,
        })),
      }))

      //  Eventos
      const events = data.events.map((event) => ({
        time: event.time.elapsed,
        team: event.team.name,
        player: event.player?.name || "",
        assist: event.assist?.name || "",
        type: event.type, // Goal, Card, subst, etc.
        detail: event.detail, // Yellow Card, Red Card, etc.
        comments: event.comments,
      }))

      //  Dados principais do jogo
      const match = {
        fixture: data.fixture,
        league: data.league,
        teams: data.teams,
        goals: data.goals,
      }

      const fullData = { match, statistics, lineups, events }

      //  Salva no Redis com expiração
      await redis.set(cacheKey, JSON.stringify(fullData), { EX: 60 })

      res.json(fullData)
    } catch (error) {
      console.error(
        "Erro ao buscar dados do jogo:",
        error.response?.data || error.message
      )
      res.status(500).json({ error: "Erro ao buscar dados do jogo" })
    }
  }
}
