import { Router } from "express";
const router = Router();

import { getLogs, insertLogs, verificarInterfazVTA} from "../controllers/Logs.controller";

router.get("/", getLogs);
router.get("/insert", insertLogs)
router.get("/verificar", verificarInterfazVTA);

export default router;