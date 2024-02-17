import  express  from "express";
import { getBranches,getBranchByName,editBranch } from "../controller/branch.js";
const router = express.Router()
router.get("/", getBranches);
router.get("/:id", getBranchByName);
router.put("/:id", editBranch);
export default router