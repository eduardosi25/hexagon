'use strict'
if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

var app = require('./app');
var mongoose = require('mongoose');



//conexion a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true})
        .then(() =>{
          console.log("++la conexion esta lista");

// crea servidor llamando express
        app.listen(process.env.PORT || 3000, () => {
          console.log("servidor corriendo");
        });
      })
        .catch(err =>console.log(err));

      