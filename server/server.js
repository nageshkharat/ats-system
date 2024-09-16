const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const bodyParser = require('body-parser');
const path = require('path');
const atsScoring = require('./utils/atsScoring');

const app = express();
const port = 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDFs are allowed.'));
    }
  }
});

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/resume', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const resumePath = path.join(__dirname, '../uploads', req.file.filename);
    const resumeData = await pdfParse(resumePath);

    const jobDescription = req.body.jobDescription || "";
    const role = req.body.role || "";

    const atsScore = atsScoring.calculateATSScore(resumeData.text, jobDescription);

    res.json({ score: atsScore, role });
  } catch (error) {
    console.error('Error processing the resume:', error);
    res.status(500).json({ message: 'Error processing the resume. Try again later.' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
