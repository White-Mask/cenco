import { Router } from "express";
const router = Router();

import { getSucursalesStatus, GetDetalleErrorEstadoLocal } from "../controllers/sucursalesStatus.controller";

router.get("/", getSucursalesStatus);
router.get("/DetalleErrorEstadoLocal", GetDetalleErrorEstadoLocal);

export default router;