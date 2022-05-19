const mongoose = require('mongoose');
const { integer, number } = require('sharp/lib/is');

const profileSchema = mongoose.Schema({
  oficinaId: { type: String, required: true },  
  name: { type: String, required: true },
  imagePrincipal: { type: String, required: true },
  imagePath: { type: String, required: true },
  extPath:  { type: String, required: true },
});

module.exports = mongoose.model('Profiles', profileSchema);

  
