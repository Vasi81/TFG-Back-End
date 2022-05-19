const Profile = require('../models/profile.model');
const db = require("../models");
var fs = require('fs'); 
const sharp = require('sharp');

const Oficinas = db.oficinas;
//const Profile = db.profiles;

// Retrieve all Files from the database.
exports.getProfiles =  (req, res) => {  

  const oficinaId = req.body.oficinaId;  
  var condition = oficinaId ? { oficinaId: { $regex: new RegExp(oficinaId), $options: "i" } } : {};
  
  Profile.find(condition)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving Profiles."
    });
  });
  
};

// Create new File
exports.postProfile = async (req, res) => {

  const oficinaId  = req.body.oficinaId; 
  const  name = req.body.name;
  const  imagePrincipal = req.body.imagePrincipal;
  const imagePath =  req.file.filename; 
  const extPath = req.file.mimetype.split('/')[1];

  const profile = new Profile({
    oficinaId,
    name,
    imagePrincipal,
    imagePath,
    extPath,
  });

  const createdProfile = await profile.save()
  .then(data => {
    res.send(data);
    //Incluimos la image.
    const id = data.oficinaId;
    const imagePath = data.imagePath;
    console.log(req.file)
    console.log(id);
    console.log (data);
    console.log (id + '.'+ req.file.mimetype.split('/')[1]);
  
  
    if (data.imagePrincipal=='si'){
      //We updated the extension of the main image in offices.
      actualizarOficina(id,req.file.mimetype.split('/')[1]);
      //Rename the file.
      console.log(req.file.path);
      //fs.renameSync(req.file.path,req.file.destination+'/'+id + '.'+ req.file.mimetype.split('/')[1]);
      //Resize image for thumbnail
      //sharp(req.file.destination+'/'+id + '.'+ req.file.mimetype.split('/')[1])
      sharp(req.file.path)
      .resize(360, 360)
      .toFile('app/images/thumbnail/'+id + '.'+ req.file.mimetype.split('/')[1], function(err) {
          console.log(err)
      });

      
    } else {
      //Resize image for cards
      sharp(req.file.path)
      .resize(500, 261)
      .toFile('app/images/card/'+id + '_'+ imagePath, function(err) {
        console.log(err)
      });

      //image with normal size
      sharp(req.file.path)
      .resize(360, 360)
      .toFile('app/images/normal/'+id + '_'+ imagePath, function(err) {
          console.log(err)
      });

      
    }
  });
  

};

// Delete a file with the specified id in the request
exports.delete = (req, res) => {
 
  const id = req.params.id;

  Profile.findByIdAndRemove(id, { useFindAndModify: false })
  .then(data => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Profile with id=${id}. Maybe Profile was not found!`
      });
    } else {
    
      res.send({
        message: "Profile was deleted successfully!"
  
      });
      
      fs.unlink('./app/images/'+ data.imagePath, (err) => {
        if (err) {
        console.error(err)
        return
        }
        //file removed
      })

      if (data.imagePrincipal=='si'){
        fs.unlink('./app/images/thumbnail/'+data.oficinaId + '.'+  data.extPath, (err) => {
          if (err) {
          console.error(err)
          return
          }
          //file removed
        })

      } else {

        fs.unlink('./app/images/card/'+data.oficinaId + '_'+  data.imagePath, (err) => {
          if (err) {
          console.error(err)
          return
          }
          //file removed
        })
  
        fs.unlink('./app/images/normal/'+data.oficinaId + '_'+  data.imagePath, (err) => {
          if (err) {
          console.error(err)
          return
          }
          //file removed
        })
        
      }

    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Profile with id=" + id
    });
  });


};

// Update a office by the oficinaid in the request
const actualizarOficina = (oficinaId, extension) => {
  const id = oficinaId;

  Oficinas.findByIdAndUpdate(id, { extPath: extension}, { useFindAndModify: false })
  .then(data => {
    console.log(data);
  
  })
  .catch(err => {
    console.log("Error updating office with id=" + id);
  });
};

// Delete all files from the database.
exports.deleteAll = (req, res) => {


  Profile.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} Profiles were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all profiles."
    });
  });

};

// Delete all files from the database.
exports.deleteAllByOficinaid = (req, res) => {
  const oficinaId = req.params.oficinaId;
  Profile.deleteMany({ oficinaId:oficinaId })
  .then(data => {
    res.send({
      message: `${data.deletedCount} Profiles were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all profiles."
    });
  });

};

// Find files by oficinaId
exports.getProfilesOficinaId = (req, res) => {
  const oficinaId = req.params.oficinaId;
  Profile.find({  oficinaId: oficinaId })
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while retrieving office."
    });
  });

};
