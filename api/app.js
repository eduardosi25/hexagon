'use strict'
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


    //cargar rutas
    var user_routes = require("./routes/user");
    var follow_routes = require('./routes/follow');
    var publication_routes = require('./routes/publication');


    //cargar middleware
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

    //rutas
    app.use('/api', user_routes);
    app.use('/api', follow_routes);
    app.use('/api', publication_routes);

    //cargar cors



    //exportar
    module.exports = app;
