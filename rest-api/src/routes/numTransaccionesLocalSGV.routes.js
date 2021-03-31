import { Router } from "express";
const router = Router();

import { getNumTransaccionLocalSGV } from "../controllers/numTransaccionesLocalSGV.controller";

router.get("/", getNumTransaccionLocalSGV);

export default router;