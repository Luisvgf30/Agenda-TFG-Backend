var express =  require('express');
var bodyParser =  require('body-parser');
var methodOverride =  require('method-override');
var mongoose =  require('mongoose');
var app = express();

//Configuracion
app.use(bodyParser.json());
app.use(methodOverride());

app.listen(3000, function () {
    console.log(`nuestro server escucha por el puerto 3000`);    
});

var router = express.Router();

router.get('/', function (req, res) {
    res.send("Hola buenas tardes")
})

app.use(router);
