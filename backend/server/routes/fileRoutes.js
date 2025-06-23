import express from "express";
import auth from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';
import { parseExcelFile, getHistory, downloadChart } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', auth, upload.single('file'), parseExcelFile);
router.get('/history', auth, getHistory);
router.post('/download-chart', auth, downloadChart);

export default router;
