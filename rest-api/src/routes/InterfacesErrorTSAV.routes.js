import { Router } from "express";
const router = Router();

import { getInterfacesErrorTSAV, getEnviarTSAV } from "../controllers/InterfacesErrorTSAV.controller";

router.get("/", getInterfacesErrorTSAV);
router.get("/enviar-tsav", getEnviarTSAV);

export default router;