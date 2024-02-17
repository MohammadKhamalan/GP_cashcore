import  express  from "express";
import { getusers,adduser,getuser,updateUser } from "../controller/user.js";
const router = express.Router()
router.get("/", getusers);
router.post("/", adduser);
 router.get("/:id", getuser);
router.put("/:id", updateUser);


export default router