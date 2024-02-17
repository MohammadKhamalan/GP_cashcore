import  express  from "express";
import { getAccounts,addaccount,editAccount,deleteAccount,getAccount  } from "../controller/account.js";
const router = express.Router()
router.get("/", getAccounts);
router.post("/", addaccount);
router.delete("/:account_id", deleteAccount);
router.get("/:id", getAccount);
router.put("/:id", editAccount);
export default router