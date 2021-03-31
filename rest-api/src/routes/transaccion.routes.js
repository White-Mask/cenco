import { Router } from "express";
const router = Router();

import { getTransaccion } from "../controllers/transaccion.controller";

router.get("/", getTransaccion);

export default router;