import { Router } from "express";
const router = Router();

import { getPerfiles, getModulos, getModulosId } from "../controllers/perfiles.controller";

router.get("/", getPerfiles);
router.get("/modulos", getModulos);
router.get("/modulosid", getModulosId);

export default router;