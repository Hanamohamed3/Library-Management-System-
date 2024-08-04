import { Router } from "express";
import * as bookController from './book.controller.js'

const router=Router();
router.post("/addBook", bookController.addBook)
router.put("/updateBook", bookController.updateBook)
router.delete("/deleteBook", bookController.deleteBook)
router.get("/getBook", bookController.getBooks)
router.get("/getSpecificBook", bookController.getSpecificBook)


export default router;