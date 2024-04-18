var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tareaSchema = new Schema({
    name_tarea : String,
    descripcion_tarea : String,
    Estado : String,
    fecha_inicial : Date,
    fecha_limite : Date,
    documento : String
});

module.exports = mongoose.model('Tarea', tareaSchema);