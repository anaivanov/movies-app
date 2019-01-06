const express = require('express')
require('dotenv').config()


const app = express()
app.use('/', express.static('../movies-app-front/dist'))
app.listen(8081)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
    tmdbId: { type: Sequelize.STRING, allowNull: false, unique: true },
})

app.get('/createdb', (request, response) => {
    sequelize.sync({ force: true }).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        console.log(err)
        response.status(200).send('could not create tables')
    })
})


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

app.use(express.json())
app.use(express.urlencoded())

app.post('/film', (request, response) => {
    Films.create(request.body).then((result) => {
        response.status(201).json(result)
    }).catch((err) => {
        response.status(500).send("resource not created")
    })
})

app.get('/films', (request, response) => {
    Films.findAll().then((results) => {
        response.status(200).json(results)
    })
})


app.delete('/film/:id', (request, response) => {
    Films.findOne({ where: {tmdbId: request.params.id}}).then((message) => {
        if(message) {
            message.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err)
                response.status(500).send('database error')
            })
        } else {
            response.status(404).send('resource not found')
        }
    }).catch((err) => {
        console.log(err)
        response.status(500).send('database error')
    })
})
