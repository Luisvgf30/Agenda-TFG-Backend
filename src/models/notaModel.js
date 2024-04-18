var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notaSchema = new Schema({
    descripcion_nota : String,
    fecha_nota : Date
});

module.exports = mongoose.model('Nota', notaSchema);