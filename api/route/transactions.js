import  express  from "express";
import { addTransaction,getTransaction,getTransactionforaccount } from "../controller/transaction.js";
const router = express.Router()
router.post("/", addTransaction);
router.get("/", getTransaction);

router.get("/:id", getTransactionforaccount);



export default router