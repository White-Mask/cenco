import { Router } from "express";
const router = Router();

import { getExcluyeLocalAlarma} from "../controllers/excluyeLocalAlarma.controller";

router.get("/", getExcluyeLocalAlarma);

export default router;