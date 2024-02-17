import  express  from "express";
import { getAllPdfDocumentsForUser,insertPdfDocument } from "../controller/pdf_document.js";    

const router = express.Router()
// router.get("/i/:id", getPdfForInteraction);
router.post("/", insertPdfDocument);
router.get("/:userId", getAllPdfDocumentsForUser);


export default router