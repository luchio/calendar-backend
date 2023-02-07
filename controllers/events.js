const {response} = require('express');
const Evento = require('../models/Evento');
const getEvents = async(req,res=response) => {

    //find para traer la coleccion de datos de los eventos
    //si queremos rellenar los datos del usuario podemos usar populate(ref), el user hace referencia a Usuario
    //el primer parametro es la referencia del atributo hacia otro doc, y el segundo los campos que queremos mostrar.
    const eventos = await Evento.find().populate('user','name');

    res.json({
        ok:true,
        eventos
    })
}

const createEvents = async (req,res=response) => {
    //verificar que tenga el evento
    //console.log(req.body);
    const evento = new Evento(req.body);
    

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();
        res.json({
            ok:true,
            evento:eventoGuardado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }

}

const updateEvents = async (req,res=response) => {

    //console.log(req.params);
    const eventoId = req.params.id;

    try {

        //podemos buscar en la bd por id
        const evento = await Evento.findById(eventoId);
        //console.log(evento);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            })
        }

        //no podemos editar el evento de otra persona
        if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de editar este evento'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid
        }

        //si queremos ver los cambios actualizados debemos activar el tercer parametro new en true.
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});

        res.json({
            ok:true,
            evento:eventoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}

const deleteEvents = async (req,res=response) => {



    const eventoId = req.params.id;

    try {

        //podemos buscar en la bd por id
        const evento = await Evento.findById(eventoId);
        //console.log(evento);

        if(!evento){
            return res.status(404).json({
                ok:false,
                msg: 'Evento no existe por ese id'
            })
        }

         //no podemos eliminar el evento de otra persona
         if(evento.user.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg:'No tiene privilegio de eliminar este evento'
            })
        }
       

        //si queremos ver los cambios actualizados debemos activar el tercer parametro new en true.
        await Evento.findByIdAndDelete(eventoId,{new:true});

        res.json({
            ok:true,
            msg:'Eliminado correctamente'
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Hable con el administrador'
        });
    }
}

module.exports = {
    getEvents,
    createEvents,
    updateEvents,
    deleteEvents
}