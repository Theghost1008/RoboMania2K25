import { Router } from "express";
import { updateMatchScore, liveStandings,getMatches } from "../controllers/matchController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/table").get(liveStandings)
router.route("/matches").get(getMatches)
router.route("/match/:matchId").put(verifyJWT,updateMatchScore)

export default router;