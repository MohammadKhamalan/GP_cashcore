import  express  from "express";
import { getAccounts,getAccount,CreateNewWaitingAccount,editAccount,deletewaitingaccount ,login} from "../controller/waiting.js";

const router = express.Router()
router.get("/", getAccounts);
router.post("/signup", CreateNewWaitingAccount);
router.delete("/:id", deletewaitingaccount);
router.get("/:id", getAccount);
router.put("/:id", editAccount);
router.post("/login", login);

export default router