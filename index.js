//es muy parecido a hacer un import
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

//console log de los procesos que corren en el env
//console.log(process.env.PORT);


//crear el servidor de express

const app = express();

//base de datos

dbConnection();

//CORS
app.use(cors());

//directorio publico
//el use en node es conocido como un middleware, que es una funcion que se ejecuta cuando hacen una peticion
app.use(express.static('public'));


//lectura y parseo del body
//aca estamos diciendo que procese su contenido que venga en formato json
app.use(express.json());


//*rutas

// le estamos diciendo que todo lo que vaya a exportar en el require lo habilite en esta ruta.
app.use('/api/auth',require('./routes/auth'));

app.use('/api/events',require('./routes/events'));

/*Solo produccion, existe el problema que cuando hacemos peticiion a una ruta busca una carpeta
/auth/... pero si no hace match con ninguna ruta de arriba vamos a devolver el index.html
*/
app.get('*',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
});





//Escuchar petiticiones
//le decimos que escuche a nuestra app en el (puerto,callback)
app.listen(process.env.PORT,()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
})