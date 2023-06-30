const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const port = "3000"
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(publicDir));

let info = JSON.parse(fs.readFileSync(`${dataDir}/info.json`, 'utf8'));
let data = JSON.parse(fs.readFileSync(`${dataDir}/data.json`, 'utf8'));
let footer = JSON.parse(fs.readFileSync(`${dataDir}/footer.json`, 'utf8'));

app.get('*', (req, res) => {
    // Render the projects page
    datas = data;
    info = info;
    footer = footer;
    res.render('index.ejs', { datas, info, footer });
});

// Start the server
app.listen(port, function (){
    console.log('App listening on port ', port);
});
