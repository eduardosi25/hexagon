'user strict'
var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');
var jwt = require('../services/jwt');
var mongoosePaginate = require('mongoose-pagination');
var fs = require('fs');
var path = require('path');
var Follow = require('../models/follow');
var Publication = require('../models/publication');

//cargar rutas
      function home(req, res) {
        res.status(200).send({
          message: "hola mundo desde home"
        });
      }

      function pruebas(req, res) {

        res.status(200).send({
          message: "accion de pruebas desde servidor node js"
        });
      }

//Registro

      function saveUser(req, res) {
        var params = req.body;
        var user = new User();
        if (params.name && params.surname && params.nick && params.email && params.password) {

          user.name = params.name;
          user.surname = params.surname;
          user.nick = params.nick;
          user.email = params.email;
          user.role = 'ROLE_USER';
          user.image = null;

      //Controlar usuarios duplicados

         User.find({ $or: [
                              {email: user.email.toLowerCase()},
                              {nick:  user.nick.toLowerCase()}
                          ]}).exec((err,users)=>{
                            if (err) return res.status(500).send({ message: "error en la petición de usuarios" });

                            if (users && users.length >=1){
                              return res.status(200).send({ message: "El usuario que intentas registrar ya existe" });
                            }else{

      // cifrar contraseña y guarda los datos

                              bcrypt.hash(params.password, null, null, (error, hash) => {
                                user.password = hash;

                                user.save((err, userStored) => {

                                  if (err) return res.status(500).send({
                                    message: "error al guardar el usuario"
                                  });

                                  if (userStored) {
                                    res.status(200).send({ user:userStored });

                                  } else {
                                    res.status(404).send({ message: "No se ha registrado el usuario" });
                                  }

                                });
                              });

                            }
                          });



        } else {
          res.status(200).send({
            message: "envia todos los campos necesarios"

          });
        }

      }

//login
      function loginUser( req,res ){
        var params = req.body;
        var email = params.email;
        var password = params.password;
      //consulta a db
        User.findOne({ email:email}, (err, user) =>{
          if (err) return res.status(500).send({message: "Error en la petición"});
          if (user) {

      // compara el pass mandado con la pass almacenada a la base
            bcrypt.compare(password, user.password, (err, check)=>{
              if (check){

      if (params.gettoken){
      // genera y devuelve el token
            return res.status(200).send({
                token:jwt.createToken(user)
            });
      }else{
      // no devolver el password
               user.password= undefined;
      // devolver datos de usuario
               return res.status(200).send({user});
      }

        }else{
        return res.status(404).send({message: "El usuario no se ha podido identificar"});
              }
            });
          }else{

      // el usuario no esta en db
            return res.status(404).send({message: "El usuario no se ha podido identificar!!"});
          }
        });
      }


//listar datos del usuario y si lo seguimos
      function getUser(req, res){
        var userId = req.params.id;
               User.findById(userId, (err,user) => {
          if (err) return res.status(500).send({message: "Error en la peticion" });
          if (!user) return res.status(404).send({message: "El usuario no existe" });

        followThisUser(req.user.sub, userId).then((value) =>{
            return res.status(200).send({user, value});
        });
      });
      }


//Metodo sincrono para sacar si el usuario determinado me sigue o lo sigo
      async function followThisUser(identity_user_id, user_id){
          try {
              var following = await Follow.findOne({ user: identity_user_id, followed: user_id}).exec()
                  .then((following) => {
                    //  console.log(following);
                      return following;
                  })
                  .catch((err)=>{
                      return handleerror(err);
                  });
              var followed = await Follow.findOne({ user: user_id, followed: identity_user_id}).exec()
                  .then((followed) => {
                    //  console.log(followed);
                      return followed;
                  })
                  .catch((err)=>{
                      return handleerror(err);
                  });
              return {
                  following: following,
                  followed: followed
              }
          } catch(e){
              console.log(e);
          }
      }




// Devolver listado de usuarios paginados
      function getUsers(req, res){
        var identity_user_id = req.user.sub;
            var page = 1;
        if (req.params.page){
       page = req.params.page;
        }
        var itemsPerPage = 5;
        User.find().sort("_id").paginate(page, itemsPerPage, (err, users, total)=>{
          if (err) return res.status(500).send({message: "Error en la peticion" });
          if (!users) return res.status(404).send({message: "No hay usuarios disponibles" });

//se manda llamar followUserIds y trae una promesa con los usuarios que sigo y me siguen
      followUserIds(identity_user_id).then((value)=>{
        return res.status(200).send({
          users,
          users_following: value.following,
          users_followme: value.followed,
          total,
          pages: Math.ceil(total/itemsPerPage)
        });
      });
   });
  }

//
async function followUserIds(user_id){

    var following = await Follow.find({"user": user_id}).select({'_id': 0, '__uv': 0, 'user': 0}).exec().then((follows)=>{
    var follows_clean=[];

    follows.forEach((follow)=>{
    follows_clean.push(follow.followed);
    });

    return follows_clean;

    }).catch((err)=>{
    return handleerror(err);
    });


    var followed = await Follow.find({"followed": user_id}).select({'_id': 0, '__uv': 0, 'followed': 0}).exec().then((follows)=>{
    var follows_clean=[];

    follows.forEach((follow)=>{
    follows_clean.push(follow.user);
    });

    return follows_clean;

    }).catch((err)=>{

    return handleerror(err);

    });

    //console.log(followed);
    return {
    following: following,
    followed: followed
    }
}


//edicion de datos del usuario
function updateUser(req, res){
  var userId = req.params.id;
  var update = req.body;
  //console.log(req.user);

  //borrar propiedad password para no mostrar
  delete update.password;

    if (userId != req.user.sub){
        return res.status(500).send({message: "no tienes permiso para actualizar los datos del usuario"});
    }
    User.find ({ $or: [
                         {email: update.email.toLowerCase()},
                         {nick:  update.nick.toLowerCase()}
                     ]}).exec((err,user) =>{
                       console.log(user);
                       var user_isset = false;
                       user.forEach((user)=>{
                         if(user && user._id != userId) user_isset = true;
                       });

                        if(user_isset) return res.status(404).send({message: "Los datos ya estan en uso" });

                       User.findByIdAndUpdate(userId, update, {new:true}, (err, userUpdated) =>{
                         if (err) return res.status(500).send({message: "Error en la petición"});

                         if (!userUpdated) return res.status(404).send({message: "No se ha podido actualizar el usuario" });

                         return res.status(200).send({ user: userUpdated });
                       });
                     });
}

//subir imagen de usuario
function uploadImage(req,res){
  console.log("sube imagen")
    var userId = req.params.id;

      if (userId != req.user.sub){
          return res.status(500).send({message: "no tienes permiso para actualizar los datos del usuario"});
        }
      if (req.files){
        var file_path = req.files.image.path;
        //quita el path / diagonales
        console.log(file_path)
        var file_split = file_path.split('\\');
        console.log("path_split")
        console.log(file_split);
        var file_name = file_split[2];
        //corta solo la extension
        console.log(file_name)
         var ext_split = file_name.split('\.');
      
        console.log("ext_split")
        console.log(ext_split)
        var file_ext = ext_split[1];
        console.log(file_ext);

        if (userId != req.user.sub){
            return removeFilesOfUploads(res, file_path, "No tienes permiso para actualizar el usuario");
          }

        if (file_ext == 'jpg' || file_ext == 'png' || file_ext == 'jpeg' || file_ext == 'gif'){

            // Actualizar documento de usuario logueado
              User.findByIdAndUpdate(userId,{image:file_name}, {new:true}, (err, userUpdated) =>{
                if (err) return res.status(500).send({message: "Error en la peticion" });

                if (!userUpdated) return res.status(404).send({message: "No se ha podido actualizar el usuario" });

                return res.status(200).send({ user: userUpdated });
              });


        }else{
            return removeFilesOfUploads(res, file_path, "Extensión no valida");
        }
      }else{
        return res.status(200).send({ message: "No se han subido imagenes" });
      }
}



function removeFilesOfUploads(res, file_path, message){
  fs.unlink(file_path, (err) =>{
      return res.status(200).send({ message:message });
  });
}


function getImageFile(req, res){
  var image_file = req.params.imageFile;
  console.log(req.params.imageFile);
  var path_file = './uploads/users/'+image_file;

  fs.exists(path_file,(exists) => {
      if (exists){
        res.sendFile(path.resolve(path_file));
      }else{
      return res.status(200).send({ message: "No existe la imagen.." });
      }
  });
}

const getCounters = (req, res) => {
    let userId = req.user.sub;
    if(req.params.id){
        userId = req.params.id;
    }
    getCountFollow(userId).then((value) => {
        return res.status(200).send(value);
    })
}

const getCountFollow = async (user_id) => {
    try{
        // Lo hice de dos formas. "following" con callback de countDocuments y "followed" con una promesa
        let following = await Follow.countDocuments({"user": user_id},(err, result) => { return result });
        let followed = await Follow.countDocuments({"followed": user_id}).then(count => count);
        let publications = await Publication.count({"user":user_id}).exec().then(count => {
          return count;
          }).catch((err) => {
            if(err) return handleError(err);
          });

        return { following, followed, publications }

    } catch(e){
        console.log(e);
    }
}


//exportar para usar en routes
  module.exports = {
    home,
    pruebas,
    saveUser,
    loginUser,
    getUser,
    getUsers,
    getCounters,
    updateUser,
    uploadImage,
    getImageFile,

  }
