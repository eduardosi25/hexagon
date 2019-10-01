'use strict'
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'hexagonData';

exports.ensureAuth = function(req, res, next){
  if (!req.headers.authorization){
    return res.status(403).send({ message: "la petición no tiene cabecera de autentificación"});
  }
  var token = req.headers.authorization.replace(/['"]+/g, '')

  try{
      var payload = jwt.decode(token, secret);
      if (payload.exp <= moment().unix()){
        return res.status(401).send({ message: "el token ha expirado"});
      }
  }catch(ex){
        return res.status(404).send({ message: "el token no es válido"});
  }

req.user = payload
next();
}
