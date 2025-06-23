import XLSX from 'xlsx';
import File from '../models/File';
import { exportChartAsImage } from '../utils/exportChart';

exports.uploadExcel = async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(sheet);

    const file = new File({
      user: req.user.id,
      filename: req.file.filename,
      originalname: req.file.originalname,
      parsedData: data,
    });

    await file.save();
    res.json({ message: 'File uploaded and parsed', file });
  } catch (err) {
    res.status(500).json({ error: 'Parsing failed', message: err.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const files = await File.find({ user: req.user.id }).sort({ uploadDate: -1 });
    res.json(files);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching files' });
  }
};

exports.downloadChart = async (req, res) => {
  try {
    const { chartHtml } = req.body;
    const buffer = await exportChartAsImage(chartHtml);
    res.set('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ error: 'Chart download failed', message: err.message });
  }
};
