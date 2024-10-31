const multer = require('multer');
const pdfParse = require('pdf-parse');
const atsScoring = require('../utils/atsScoring');

const upload = multer();

module.exports = async (req, res) => {
    try {
        if (req.method === 'POST') {
            upload.single('resume')(req, {}, async (err) => {
                if (err) {
                    return res.status(400).json({ message: 'Error uploading file.' });
                }

                if (!req.file) {
                    return res.status(400).json({ message: 'No file uploaded.' });
                }

                const jobDescription = req.body.jobDescription || '';
                const role = req.body.role || '';

                const resumeData = await pdfParse(req.file.buffer);
                const atsScore = atsScoring.calculateATSScore(resumeData.text, jobDescription);

                return res.json({ score: atsScore, role });
            });
        } else {
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error processing the request:', error);
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
};
