module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        nombre: String,
        message: String,
        email: String,
        telefono: String,
        empresa: String,
        provincia: String,
        modalidad: String,
        puestos: String,
        comercial: String,
        oficina: String
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const EmailContact = mongoose.model("emailcontact", schema);
    return EmailContact;
  };
  