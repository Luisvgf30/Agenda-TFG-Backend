var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personaSchema = new Schema({
    username : String,
    email : String,
    password : String,
    foto : String,
    tiempo_diario_event : Date
});

module.exports = mongoose.model('Persona', personaSchema);