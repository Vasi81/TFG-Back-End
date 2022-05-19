module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        title: String,
        description: String,
        metros: {type: Number, default: 0},
        is_destacada: {type: Boolean,default: false},
        road_name: String,
        zip_code:  String,
        province:  String,
        city:  String,
        modality:  String,
        latitude: String,
        longitude: String,
        floor: Number,
        parking_public: {type: Boolean,default: false},
        parking_private: {type: Boolean,default: false},
        underground: String,
        train:  String,
        bus: String,
        comercial: String,
        extPath: String

      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const Oficinas = mongoose.model("oficinas", schema);
    return Oficinas;
  };
  