const express = require('express');
const app = express();
const port = 3000;
const path = require("path");



app.set("view engine", "ejs");
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.render('resumeForm.ejs');
    });

 app.post('/resume', (req, res) => {

      if (!req.body || !req.body.resume) {
        return res.status(400).send('Invalid resume data');
    }
    

    const resumeData = { ...req.body.resume };
    
  
      res.render('resumeData.ejs', resumeData);
});

app.listen(port, () =>  {
    console.log(`Server is running on port ${port}`);
});
