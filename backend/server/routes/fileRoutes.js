const express = require('express');
const auth = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadExcel, getHistory, downloadChart } = require('../controllers/fileController');

const router = express.Router();

router.post('/upload', auth, upload.single('file'), uploadExcel);
router.get('/history', auth, getHistory);
router.post('/download-chart', auth, downloadChart);

module.exports = router;
