import express from "express";
import auth from '../middleware/authMiddleware';
import upload from '../middleware/uploadMiddleware';
import { uploadExcel, getHistory, downloadChart } from '../controllers/fileController.js';

const router = express.Router();

router.post('/upload', auth, upload.single('file'), uploadExcel);
router.get('/history', auth, getHistory);
router.post('/download-chart', auth, downloadChart);

module.exports = router;
