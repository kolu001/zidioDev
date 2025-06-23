import express from "express";
import auth from '../middleware/authMiddleware.js';
import { verifyToken } from "../middleware/authMiddleware.js";
import upload from '../middleware/uploadMiddleware.js';
import { parseExcelFile, getHistory, downloadChart } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', verifyToken, upload.single('file'), parseExcelFile);
router.get('/history', verifyToken, getHistory);
router.post('/download-chart', auth, downloadChart);

export default router;
