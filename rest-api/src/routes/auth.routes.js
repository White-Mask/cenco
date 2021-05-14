import { Router } from "express";
const router = Router();

import { Signin, isAuth } from "../controllers/auth.controller";

router.post('/signin', Signin);
router.post('/Verify', isAuth);

export default router;