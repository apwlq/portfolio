const express = require('express');
const app = express();
const PORT = 3000;

const path = require('path');
const fs = require('fs');
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(publicDir));

let data = JSON.parse(fs.readFileSync(`${dataDir}/data.json`, 'utf8'));

const pageList = ['aboutme','project','award','team','technology'];
app.get("*", (req, res, next) => {
  const url = decodeURI(req.originalUrl).replace('/','').split('-');
  console.log(req.headers["x-forwarded-host"], url);

  data.title = '';
  data.des = '';
  if(url[0]) {
    switch(url[0]) {
      case 'aboutme': {
        data.title = data.page.aboutme.title;
        data.des = data.page.aboutme.des;
        if(url[1] == 'name') {
          data.title += ' • ' + data.item.aboutme.name.title;
          data.des = data.item.aboutme.name.des;
        }
        if(url[1] == 'profile') {
          data.title += ' • ' + data.item.aboutme.profile.title;
          data.des = data.item.aboutme.profile.des;
        }

        break;
      };
      case 'project': {
        data.title = data.page.project.title;
        data.des = data.page.project.des;
        if(url[1]) {
          if(Object.keys(data.project).indexOf(url[1]) != -1) {
            data.title += ' • ' + data.project[url[1]].title;
            data.des = data.project[url[1]].des;
            data.img = `/img/project/${url[1]}.png`;
          }
        }

        break;
      };
      case 'award': {
        data.title = data.page.award.title;
        data.des = data.page.award.des;

        break;
      };
      case 'team': {
        data.title = data.page.team.title;
        data.des = data.page.team.des;
        if(url[1]) {
          if(Object.keys(data.item.team).indexOf(url[1]) != -1) {
            data.title += ' • ' + data.item.team[url[1]].title;
            data.des = data.item.team[url[1]].des;
          }
        }

        break;
      };
      case 'feature': {
        data.title = data.page.feature.title;
        data.des = data.page.feature.des;

        break;
      };
    }
  } else {
    data.title = '박성민 • 학생 개발자';
    data.des = '많은 것을 시도하고 다양한것을 해보며 재미있게 살고있는 노비스민이라는 닉네임으로 활동중인 박성민입니다';
    data.img = '/img/logo/background/android-chrome-512x512.png';
  }

  if(data.title) {
    data.title = '노비스민 :: ' + data.title;
    res.render("index", {
      data: data
    });
  } else {
    res.status(404).end();
  }
});

app.listen(PORT, function () {
  console.log('App listening on port',PORT);
});
