const db = require("../models");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');

const Comercial = db.comerciales;

// Retrieve all users from the database.
exports.login = (req, res) => {
  
  const usuario=req.body;

  const username = usuario.usuario;
  //const userpwd=bcrypt.hashSync(usuario.pwd, 10);
  const userpwd=usuario.pwd
  
  Comercial.findOne({ usuario: username })
  //Comercial.findOne({ usuario: username , pwd: userpwd})
  .then(data => {
    console.log(data);
    if (data!=null){
      console.log("dentro");
      console.log(req.body.pwd, data.pwd);
       var result = bcrypt.compareSync(req.body.pwd, data.pwd);

        if (result) {
         
          jwt.sign({user:usuario},'EdixSecretKey',(err,token)=>{
          //jwt.sign({user:usuario},'EdixSecretKey',{ expiresIn: '20m' },(err,token)=>{
            res.json({
              data,
              token
            })
          })
        } else {
          res.status(200).send({
            message:
              err.message || "Usuario o Contraseña incorrectos."
          });
        }
       
    } else {
      res.status(200).send({
        message:
          err.message || "Usuario o Contraseña incorrectos."
      });
    }
    
  })
  .catch(err => {
    
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving user."
    });
    
  });
  
};

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
      // Create user
      const comercial = new Comercial({
        nombre: req.body.nombre,
        usuario: req.body.usuario,
        pwd: bcrypt.hashSync(req.body.pwd, 10),
        email: req.body.email,
        role: req.body.role
        //email: req.body.email ? req.body.email : false
      });

      // Save user in the database
      const usuario=req.body;
      const username = usuario.usuario;


      Comercial.findOne({ usuario: username })
      .then(data => {
        if (!data){
        
          comercial
          .save(comercial)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:  "Some error occurred while creating the user."
            });
          });
        
        } else {
          res.status(200).send({
            message:  "This user already exists."
          });
        }
       
      })
      .catch(err => {
        res.status(500).send({
          message:  "Some error occurred while retrieving users."
        });
      });
      
};

// Retrieve all users from the database.
exports.findAll =  (req, res) => {  

  const nombre = req.body.nombre;
  var condition = nombre ? { nombre: { $regex: new RegExp(nombre), $options: "i" } } : {};
  
  Comercial.find(condition)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving users."
    });
  });
  
};

// Find a single user with an id
exports.findOne = (req, res) => {
  //verifyToken(req, res);

  const id = req.params.id;

  Comercial.findById(id)
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found user with id " + id });
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving user with id=" + id });
  });

};

// Update a user by the id in the request
exports.update = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  var newpassword=req.body.pwd;
  
  //We validate if they have changed the pwd , if so we code them again.
  Comercial.findById(id)
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found user with id " + id });
    else 
      {
        let passwordAnterior=data.pwd;
        console.log(passwordAnterior);
        if (passwordAnterior!=newpassword) {
          newpassword=bcrypt.hashSync(newpassword, 10);
          console.log("Distintas: "+ newpassword);
        } else {
          newpassword=passwordAnterior;
          console.log("Iguales: "+ newpassword);
        }

        //We search and update.
        req.body.pwd=newpassword;
        console.log("Body: "+ req.body.pwd);
        Comercial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update user with id=${id}. Maybe user was not found!`
            });
          } else res.send({ message: "User was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating user with id=" + id
          });
        });
  
      }
    
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving user with id=" + id });
  });




};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
 
  const id = req.params.id;

  Comercial.findByIdAndRemove(id, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete user with id=${id}. Maybe user was not found!`
      });
    } else {
      res.send({
        message: "User was deleted successfully!"
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Coemercial with id=" + id
    });
  });


};

// Delete all users from the database.
exports.deleteAll = (req, res) => {
  Comercial.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Users were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all users."
    });
  });

};


