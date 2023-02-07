
//const mongoose = require('mongoose');
const {Schema,model} = require('mongoose');

const EventoSchema = Schema({

    title:{
        type: String,
        required: true
    },
    notes:{
        type: String,
    },
    start:{
        type: Date,
        required: true,
    },
    end:{
        type: Date,
        required: true,
    },
    //estamos haciendo referencia al modelo usuario.
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }



});

//para poder cambiar los atributos del json. no en la bd, no queremos que se llame _id sino id
EventoSchema.method('toJSON',function() {
   const {__v,_id,...object} =  this.toObject();
   object.id = _id;
   return object;
})


//por convencion si llamamos al modelo Usuario va a crear un documento den mongo llamado usuarios

module.exports = model('Evento', EventoSchema); 

