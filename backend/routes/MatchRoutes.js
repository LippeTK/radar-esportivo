import { Router } from "express"
import MatchController from "../controllers/MatchController.js"

const router = Router()
router.get("/:id", MatchController.getMatchById)
router.get("/", MatchController.getDailyMatches)

export default router
