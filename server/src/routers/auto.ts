import { Router } from "express";
import { verifyToken } from "../utils/verifyToken";
import { fetchUserConnected, logIn, logOut, register } from "../controller/auto.controller";

const router = Router();

router.post("/register", register );

router.post("/login", logIn);

router.post("/logout", logOut);

router.get("/me", verifyToken, fetchUserConnected);

export default router;
