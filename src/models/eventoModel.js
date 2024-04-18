var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventoSchema = new Schema({
    name_evento : String,
    descripcion_evento : String,
    fecha_evento : Date,
    tiempo_anterior : Number
});

module.exports = mongoose.model('Evento', eventoSchema);