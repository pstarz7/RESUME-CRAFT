const express = require('express');
const app = express();
const port = 3000;
const path = require("path");

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from node_modules (for html2pdf.js if needed)
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.render('resumeForm.ejs');
});

app.post('/resume', (req, res) => {
    // Validate data before rendering
    if (!req.body || !req.body.resume) {
        return res.status(400).send('Invalid resume data');
    }
    
    // Sanitize data if needed
    const resumeData = { ...req.body.resume };
    
    // Render the resume template
    res.render('resumeData.ejs', resumeData);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});