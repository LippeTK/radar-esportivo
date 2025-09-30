import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const api = axios.create({
  baseURL: "https://v3.football.api-sports.io",
  headers: {
    "x-rapidapi-key": process.env.API_KEY,
    "x-rapidapi-host": "v3.football.api-sports.io",
  },
})
export default api
