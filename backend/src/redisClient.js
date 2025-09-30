import { createClient } from "redis"

const client = createClient({
  url: "redis://localhost:6379",
})

client.on("error", (err) => console.error("Erro ao conectar no Redis:", err))
client.on("connect", () => console.log("✅ Conectado ao Redis"))

await client.connect()

export default client
