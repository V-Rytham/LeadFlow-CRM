import { Router } from "express";
import addLead from "../controllers/addLead.controller.js";
import deleteLead from "../controllers/destroyLead.controller.js";
import getAll from "../controllers/getAllLeads.controller.js";
import searchById from "../controllers/searchLeadById.controller.js";
import updateLead from "../controllers/updateLead.controller.js";
import protect from "../controllers/authorise.controller.js";
import authorize from "../controllers/authenticate.controller.js";

const router = Router()
router.post("/lead", protect, authorize, addLead)
router.get("/all", getAll);
router.delete("/lead/:id", protect, authorize, deleteLead)
router.get("/search-lead/:id", protect, searchById)
router.put("/update-lead/:id", protect, authorize, updateLead)

export default router;