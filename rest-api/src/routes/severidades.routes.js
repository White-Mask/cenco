import { Router } from "express";
const router = Router();

import { getSeveridades } from "../controllers/severidades.controller";

router.get("/", getSeveridades);

export default router;