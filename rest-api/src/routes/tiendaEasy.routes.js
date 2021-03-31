import { Router } from "express";
const router = Router();

import { getTiendas } from "../controllers/tiendasEasy.controller";

router.get("/", getTiendas);

export default router;