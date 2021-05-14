import { Router } from "express";
const router = Router();

import { createReenviarCC3 } from "../controllers/reenviarCC3.controller";

router.get("/", createReenviarCC3);

export default router;