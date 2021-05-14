import { Router } from "express";
const router = Router();

import { getEAMTRAN, updateEAMTRAN } from "../controllers/EAMTRAN.controller";

router.get("/", getEAMTRAN);
router.put("/", updateEAMTRAN);

export default router;