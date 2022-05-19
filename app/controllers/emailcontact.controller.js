const emailer  = require('../helpers/email');
const db = require("../models");
const dbConfig = require("../config/db.config.js");

const EmailContact = db.emailcontact;
const Comercial = db.comerciales;
const Oficina=db.oficinas;



//Create emailcontact.
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nombre) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

      // Create new contact.
      const emailContact = new EmailContact({
        nombre: req.body.nombre,
        message: req.body.message,
        email: req.body.email,
        telefono: req.body.telefono,
        empresa: req.body.empresa,
        provincia: req.body.provincia,
        modalidad: req.body.modalidad,
        puestos: req.body.puestos,
        comercial: req.body.comercial,
        oficina: req.body.oficina
      });

    
      emailContact
      .save(emailContact)
      .then(data => {
        //We send the different emails.
        
        if (!req.body.oficina) {
          //We send generic commercial email.
          emailContact.comercial=dbConfig.comercialDefault;
          //emailContact.comercial="624eba235900533ba8a72fcc";
        } 
        
            //we send email to the customer.
            let emailCl =emailContact.email;
            let asuntoCliente ="Información " + emailContact.modalidad;
            let messageCliente="Gracias por el interés mostrado."
            const emailCliente = emailer.sendEmail(emailCl,asuntoCliente,messageCliente,req, res);
            
            //We send email to the sales representative.
              //We obtain commercial.
            
              console.log("Comercial ID: "+ emailContact.comercial);
              Comercial.findById(emailContact.comercial)
              .then(data => {
                if (!data)
                  res.status(404).send({ message: "Not found user with id " + emailContact.comercial });
                else 
                  {
                    emailCO =data.email;
                    console.log(data.nombre)
                    console.log(emailCO)
                    let asuntoComercial ="Solicitud de Información " + emailContact.modalidad;
                    const emailComercial = emailer.sendEmail(emailCO,asuntoComercial,emailContact.message,req, res);
                  }
              });
          
          
      
        
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:  "Some error occurred while creating the contact."
        });
      });
};

// Delete all contacts from the database.
exports.deleteAll = (req, res) => {


  EmailContact.deleteMany({})
  .then(data => {
    res.send({
      message: `${data.deletedCount} EmailContacts were deleted successfully!`
    });
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while removing all EmailContacts."
    });
  });

};

