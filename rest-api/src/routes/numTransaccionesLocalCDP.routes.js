import { Router } from "express";
const router = Router();

import { getNumTransaccionLocalCDP } from "../controllers/numTransaccionesLocalCDP.controller";

router.get("/", getNumTransaccionLocalCDP);

export default router;