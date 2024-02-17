import  express  from "express";
import { getAllVisits,getVisitsByDate,addVisit,deleteVisit,editVisit } from "../controller/visit.js";
const router = express.Router()
router.get("/", getAllVisits);
router.post("/", addVisit);
router.delete("/:id", deleteVisit);
router.get('/:date', getVisitsByDate);
router.put("/:id", editVisit);
export default router