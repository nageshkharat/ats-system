const multer = require('multer');
const pdfParse = require('pdf-parse');
const atsScoring = require('../utils/atsScoring');

const upload = multer();

app.post('/api/resume', async (req, res) => {
    if (req.method === 'POST') {
        upload.single('resume')(req, {}, async (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error uploading file.' });
            }
            
    
            try {
                const resumeData = await pdfParse(req.file.buffer);
                const jobDescription = req.body.jobDescription || '';
                const role = req.body.role || '';

                const atsScore = atsScoring.calculateATSScore(resumeData.text, jobDescription);

                return res.json({ score: atsScore, role });
            } catch (error) {
                console.error("Error:", error.message);
                res.status(500).json({ error: 'Internal Server Error', details: error.message });
            }
        });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};


app.post('/api/resume', async (req, res) => {
    try {
        // ATS score processing logic
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});
