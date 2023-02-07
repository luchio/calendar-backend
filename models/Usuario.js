
//const mongoose = require('mongoose');
const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({

    name:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }


});

//por convencion si llamamos al modelo Usuario va a crear un documento den mongo llamado usuarios

module.exports = model('Usuario', UsuarioSchema); 

