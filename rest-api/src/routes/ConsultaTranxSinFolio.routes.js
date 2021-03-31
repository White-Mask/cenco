import { Router } from "express";
const router = Router();

import { getConsultaTranxSinFolio } from "../controllers/ConsultaTranxSinFolio.controller";

router.get("/", getConsultaTranxSinFolio);

export default router;