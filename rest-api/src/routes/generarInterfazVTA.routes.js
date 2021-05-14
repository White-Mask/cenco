import { Router } from "express";
const router = Router();

import { createInterfazVTA } from "../controllers/GeneraInterfazVta.controller";

router.get("/", createInterfazVTA);

export default router;