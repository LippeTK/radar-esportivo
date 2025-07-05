import express from "express"
import axios from "axios"
import cors from "cors"

import MatchRoutes from "./routes/MatchRoutes.js"

const app = express()

app.use(cors({ credentials: true, origin: "http://localhost:3000" }))

app.use(express.json())

app.use("/match", MatchRoutes)

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000")
})

const API_KEY = process.env.API_KEY || "SUA_API_KEY_AQUI"
