'use strict'

var mongoosePaginate = require('mongoose-pagination');
var User = require('../models/user');
var Follow = require('../models/follow');


function saveFollow(req, res){
  var params = req.body;
  var follow = new Follow();
  follow.user = req.user.sub;
  follow.followed = params.followed;

  follow.save((err, followStored)=>{
    if(err) return res.status(500).send({message: "error al guardar el seguimiento"});
    if (!followStored) return res.status(404).send({message: "el seguimiento no se ha guardado"});
    return res.status(200).send({follow: followStored});
  });

}

function deleteFollow(req, res){
  var userId = req.user.sub;
  var followId = req.params.id;

  Follow.find({'user':userId, 'followed':followId}).remove(err =>{
    if(err) return res.status(500).send({message: "error al dejar de seguir"});
    return res.status(200).send({message: "el follow se ha eliminado"});
  });


}

function getFollowingUser(req, res){
  var userId = req.user.sub;
  if(req.params.id && req.params.page){
    userId = req.params.id;
  }
  var page = 1;

  if (req.params.page){
    page = req.params.page;
  }else{
    page = req.params.id;
  }

  var itemsPerPage= 4;


  Follow.find({user:userId}).populate({path:'followed'}).paginate(page, itemsPerPage, (err, follows, total) => {

    if(err) return res.status(500).send({message: "Error en el servidor"});
    if (follows == 0) return res.status(404).send({ message: "no sigues a nadie aún"});

    return res.status(200).send({
          total : total,
          pages : Math.ceil(total/itemsPerPage),
          follows
        });

  });
}

function getFollowedUser(req, res){
    var userId = req.user.sub;
  if(req.params.id && req.params.page){
    userId = req.params.id;
  }
  var page = 1;

  if (req.params.page){
    page = req.params.page;
  }else{
    page = req.params.id;
  }

  var itemsPerPage= 4;


  Follow.find({followed:userId}).populate('user').paginate(page, itemsPerPage, (err, follows, total) => {

    if(err) return res.status(500).send({message: "Error en el servidor"});
    if (follows == 0) return res.status(404).send({ message: "no te sigue ningun usuario"});

    return res.status(200).send({
          total : total,
          pages : Math.ceil(total/itemsPerPage),
          follows
        });

  });
}

//Devolver listado usuarios que sigo
function getMyFollows(req, res){
  var UserId = req.user.sub;
  var followed = req.params.followed
  var find = Follow.find({user: UserId});
  if(req.params.followed){
    var find = Follow.find({followed: UserId});
  }
  find.populate('user followed').exec((err, follows) =>{
    if (err) return res.status(500).send({message: "Error en la peticion" });
    if (!follows) return res.status(404).send({message: "No sigues a ningun usuario" });
    return res.status(200).send({follows});
  });
}
//Devolver usuarios que me siguen
function getFollowsBacks(req, res){
  var UserId = req.user.sub;
  Follow.find({user: UserId}).populate('user followed').exec((err, follows) =>{
    if (err) return res.status(500).send({message: "Error en la peticion" });
    if (!follows) return res.status(404).send({message: "No sigues a ningun usuario" });
    return res.status(200).send({follows});
  });
}

//exportar para usar en routes
  module.exports = {
    saveFollow,
    deleteFollow,
    getFollowingUser,
    getFollowedUser,
    getMyFollows
  }
