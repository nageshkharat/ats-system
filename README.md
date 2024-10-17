   # ATS Resume Scanner

   ATS Resume Scanner is a web application that helps you scan resumes and compare them with job descriptions to determine an ATS (Applicant Tracking System) score.

   ## Features

   - Upload a PDF resume
   - Provide job description for comparison
   - Get an ATS score that compares the resume with the job description

   ## Installation

   1. Clone the repository:
      ```bash
      git clone https://github.com/nageshkharat/ats-system.git
      ```
   
   2. Navigate into the project directory:
      ```bash
      cd ats-system
      ```

   3. Install the dependencies:
      ```bash
      npm install
      ```

   4. Start the server:
      ```bash
      npm start
      ```

   The server will run on `http://localhost:3000` by default.

   ## Usage

   1. Fill in your details, including name, email, phone number, and the role you're applying for.
   2. Upload your resume in PDF format.
   3. Provide a job description to compare the resume against.
   4. Click the submit button to receive your ATS score.

   ## Folder Structure

   ```
   ats-system/
   ├── public/              # Contains static files like HTML, CSS, and JS
   ├── server/              # Contains the backend server code (Express.js)
   ├── uploads/             # Stores uploaded resume files
   ├── utils/               # Contains helper functions (e.g., ATS scoring)
   ├── package.json         # Node.js dependencies and scripts
   └── README.md            # Project documentation
   ```

   ## Technologies Used

   - Frontend: HTML, CSS, JavaScript
   - Backend: Node.js, Express.js
   - File Upload Handling Multer
   - PDF Parsing: pdf-parse
