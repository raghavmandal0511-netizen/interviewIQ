import { Router } from "express";
import userCreateByRegister, { userLogin } from "./auth.controllers.js";
import authRegisterMiddleware, { authLogginMiddleware } from "../../middleware/auth.middleware/auth.middleware.js";

const router = Router();

router.post("/register", [authRegisterMiddleware], userCreateByRegister);
router.post("/login", [authLogginMiddleware], userLogin);

export default router;