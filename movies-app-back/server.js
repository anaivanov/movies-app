const express = require('express')
require('dotenv').config()


const app = express()
app.use('/', express.static('../movies-app-front/dist'))
app.listen(8081)

const Sequelize = require('sequelize')

const sequelize = new Sequelize('profile', 'root', '', {
    dialect: "sqlite",
    host: "localhost",
    storage: 'database.sqlite'
})

sequelize.authenticate().then(() => {
    console.log("Connected to database")
}).catch(() => {
    console.log("Unable to connect to database")
})

const Films = sequelize.define('films', {
    tmdbId: Sequelize.INTEGER,
})

app.get('/createdb', (request, response) => {
    sequelize.sync({ force: true }).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})


// app.get('/tmdb', (request, response) => {
//     console.log(request.headers);
//     var newurl = 'http://google.com/';
//     request(newurl).pipe(res);


// })

var request = require('request');
app.get('/tmdb/*', function (req, res) {
    //modify the url in any way you want
    
    var newurl = 'https://api.themoviedb.org/' + req.param(0);
    // request(newurl).pipe(res);
    console.log(newurl);
    // delete req.query.api_key;
    req.query.api_key = process.env.API_KEY
    console.log(req.query);
    req.pipe(request({ qs: req.query, uri: newurl })).pipe(res);

});

