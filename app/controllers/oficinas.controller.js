const db = require("../models");
const jwt=require("jsonwebtoken");
const bcrypt = require('bcryptjs');
const sharp = require('sharp');
const Profile = require('../models/profile.model');

var fs = require('fs');  
var path = require('path');
const { integer } = require("sharp/lib/is");

const Oficinas = db.oficinas;


// Create and Save a new office
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

      // Create office
      const oficinas = new Oficinas({
        title: req.body.title,
        description: req.body.description,
        is_destacada: Boolean(req.body.is_destacada),
        road_name: req.body.road_name,
        zip_code:  req.body.zip_code,
        province:  req.body.province,
        city:  req.body.city,
        modality:  req.body.modality,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        floor: req.body.floor,
        parking_public: Boolean(req.body.parking_public),
        parking_private: Boolean(req.body.parking_private),
        underground: req.body.underground,
        train:  req.body.train,
        bus: req.body.bus,
        comercial: req.body.comercial
        //extPath: req.file.mimetype.split('/')[1]
      });

      // Save office in the database
      const oficina=req.body;
      const title = oficina.title;
     
    
      Oficinas.findOne({ oficina: title })
      .then(data => {
        if (!data){
          oficinas
          .save(oficinas)
          .then(data => {
            res.send(data);
          })
          .catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the office."
            });
          });

        } else {
          res.status(200).send({
            message:
              err.message || "There is already this."
          });
        }
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving office."
        });
      });
};

// Retrieve all offices from the database.
exports.findAll =  (req, res) => {  

  const title = req.body.title;  
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
  Oficinas.find(condition)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving offices."
    });
  });
  
};

// Find a single office with an id
exports.findOne = (req, res) => {
  //verifyToken(req, res);

  const id = req.params.id;

  Oficinas.findById(id)
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found office with id " + id });
    else res.send(data);
  })
  .catch(err => {
    res
      .status(500)
      .send({ message: "Error retrieving office with id=" + id });
  });

};

// Update a office by the id in the request
exports.update = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;
  Oficinas.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: `Cannot update office with id=${id}. Maybe office was not found!`
      });
    } else 
      {
        //Borramos y creamos la nueva imagen.
        //fs.findByIdAndRemove(file.destination+'/'+id + '.'+ req.file.mimetype.split('/')[1]);
        //fs.renameSync(req.file.path,req.file.destination+'/'+id + '.'+ req.file.mimetype.split('/')[1]);
        //
        res.send({ message: "office was updated successfully." });
      }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating office with id=" + id
    });
  });


};

// Delete a office with the specified id in the request
exports.delete = (req, res) => {
 
  const id = req.params.id;
  console.log(id);
  Oficinas.findByIdAndRemove ( id, { useFindAndModify: false })
  .then(data => {
    console.log(data);
    if (!data) {
      res.status(404).send({
        message: `Cannot delete office with id=${id}. Maybe office was not found!`
      });
    } else {

      res.send({
        message: "office was deleted successfully!"
      });

    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete office with id=" + id
    });
  });


};

// Delete all offices from the database.
exports.deleteAll = (req, res) => {


    Oficinas.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} offices were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all offices."
      });
    });
  
  };

// Find all office offices by modality
exports.findAllDestacadas = (req, res) => {
  const modality = req.params.modality;
  Oficinas.find({ is_destacada: true , modality: modality })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving offices."
    });
  });

};

// Find all  offices by modality
exports.findAllModality = (req, res) => {
  const modality = req.params.modality;
  Oficinas.find({  modality: modality })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving offices."
    });
  });

};


// Retrieve all offices By Options from the database.
exports.findAllByoptions =  (req, res) => {  

  const title = req.body.title;
  const description = req.body.description;
  const metros =  req.body.metros;
  const is_destacada = Boolean(req.body.is_destacada);  
  const road_name = req.body.road_name;  
  const zip_code = req.body.zip_code;  
  const province = req.body.province;  
  const city = req.body.city;  
  const modality = req.body.modality;  
  const floor = req.body.floor;  
  const parking_public = Boolean(req.body.parking_public);  
  const parking_private = Boolean(req.body.parking_private);  
  const underground = req.body.underground;  
  const train = req.body.train;  
  const bus = req.body.bus;  
  console.log(title);
  console.log(is_destacada);
  var condition1 = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  var condition2 = description ? { description: { $regex: new RegExp(description), $options: "i" } } : {};
  var condition3 = is_destacada ? { is_destacada: is_destacada } : {};
  var condition4 = road_name ? { road_name: { $regex: new RegExp(road_name), $options: "i" } } : {};
  var condition5 = zip_code ? { zip_code: { $regex: new RegExp(zip_code), $options: "i" } } : {};
  var condition6 = province ? { province: { $regex: new RegExp(province), $options: "i" } } : {};
  var condition7 = city ? { city: { $regex: new RegExp(city), $options: "i" } } : {};
  var condition8 = modality ? { modality: { $regex: new RegExp(modality), $options: "i" } } : {};
  var condition9 = floor ? { floor: { $regex: new RegExp(floor), $options: "i" } } : {};
  var condition10 = parking_public ? { parking_public: parking_public } : {};
  var condition11 = parking_private ? { parking_private: parking_private } : {};
  var condition12 = underground ? { underground: { $regex: new RegExp(underground), $options: "i" } } : {};
  var condition13 = train ? { train: { $regex: new RegExp(train), $options: "i" } } : {};
  var condition14 = bus ? { bus: { $regex: new RegExp(bus), $options: "i" } } : {};
  var condition15 = metros ? { metros: { $gte :  0, $lte : metros} } : {};


  console.log(metros);
  console.log(condition15);
 
  Oficinas.find({$and:[condition1,condition2,condition3,condition4,condition5,condition6,condition7,condition8,condition9,condition10,condition11,condition12,condition13,condition14,condition15]})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving offices."
    });
  });
  
};

