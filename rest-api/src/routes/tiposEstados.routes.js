import { Router } from "express";
const router = Router();

import { getTiposEstados } from "../controllers/tiposEstados.controller";

router.get("/", getTiposEstados);

export default router;