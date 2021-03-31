import { Router } from "express";
const router = Router();

import { getTotalesCDP } from "../controllers/totalesCDP.controller";

router.get("/", getTotalesCDP);

export default router;