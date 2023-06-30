const express = require('express');
const ejs = require('ejs');

const app = express();

// Define routes
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/projects', (req, res) => {
  // Get all projects from the database
  const projects = [
    {
      title: 'My First Project',
      description: 'This is my first project.',
      url: 'https://myfirstproject.com',
    },
    {
      title: 'My Second Project',
      description: 'This is my second project.',
      url: 'https://mysecondproject.com',
    },
  ];

  // Render the projects page
  res.render('projects.ejs', { projects });
});

// Start the server
app.listen(3000);
console.log('Server started on port 3000');
