const express = require('express');
// const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const app = express();
const port = "3000"
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(publicDir));

app.get('*', (req, res) => {
    let data = JSON.parse(fs.readFileSync(`${dataDir}/data.json`, 'utf8'));

    // Render the projects page
    res.render('index.ejs', { datas });
});

// Start the server
app.listen(port, function (){
    console.log('App listening on port ', port);
});
