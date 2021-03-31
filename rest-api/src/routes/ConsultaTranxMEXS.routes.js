import { Router } from "express";
const router = Router();

import { getConsultaTranxMEXS } from "../controllers/ConsultaTranxMEXS.controller";

router.get("/", getConsultaTranxMEXS);

export default router;