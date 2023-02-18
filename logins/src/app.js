// Carga de librerias 
const express = require('express');
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const { Session } = require('express-session');

//const loginRoutes = require('./routes/login')

// creacion de la aplicación y asignación del puerto 
const app = express();
app.set('port',4000);

app.set('views', __dirname+'/views')
app.engine('hbs', engine({
    extname: '.hbs',
}));

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({
    extended: true
}));
//configura el middleware para analizar las solicitudes entrantes con cargas JSON.
app.use(bodyParser.json());
//En este caso específico, el middleware que se configura es loginRoutes 
//y se monta en la ruta raíz ('/'). 
//Esto significa que cualquier solicitud a la aplicación pasará primero por el 
//middleware loginRoutes antes de pasar a cualquier middleware posterior.
//app.use('/',loginRoutes);


//este es método Express.js configura una ruta para la aplicación. 
//Toma dos parámetros: el primer parámetro es la ruta de la ruta y 
//el segundo parámetro es una función de devolución de llamada 
//que s
//que se ejecuta cuando se realiza una solicitud a esa ruta.
app.get('/', (req,res) => {
    res.render('home');
})


app.listen (app.get('port'), () =>{
    console.log('listening on port ', app.get('port'));
});

