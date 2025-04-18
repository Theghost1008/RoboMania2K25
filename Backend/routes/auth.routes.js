import {Router} from "express";
import { login,logout } from "../controllers/authController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/login").post(login)
router.route("/logout").post(verifyJWT,logout)

export default router;