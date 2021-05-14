import { Router } from "express";
const router = Router();

import { getTipoInterfaces } from "../controllers/tiposInterfaces.controller";

router.get("/", getTipoInterfaces);

export default router;