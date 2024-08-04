// src/modules/borrowing/borrowing.router.js
import { Router } from "express";
import * as borrowingController from './borrowing.controller.js';

const router = Router();

router.post("/borrow", borrowingController.borrowBook);
router.post("/return", borrowingController.returnBook);
router.get("/viewBorrowedBooks", borrowingController.viewBorrowedBooks);

export default router;
