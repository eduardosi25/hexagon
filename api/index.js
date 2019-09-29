'use strict'

var app = require('./app');
var mongoose = require('mongoose');
var port = 3800;

//conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/hexagon', { useNewUrlParser: true})
        .then(() =>{
          console.log("++la conexion esta lista");

// crea servidor llamando express
        app.listen(port, () => {
          console.log("servidor corriendo");
        });
      })
        .catch(err =>console.log(err));
