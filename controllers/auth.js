//const express = require('express');
const {response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

//el req es lo que la persona solicita y el response lo que respondemos

const crearUsuario = async (req,res=response)=>{    

    //console.log(req); aca viene mucha informacion, pero si mandamos algo en el body podemos acceder
    const {email,password} = req.body;

    try {
        //encuentra un documento
        let usuario= await Usuario.findOne({email: email});

        if(usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario existe con ese correo'
            });
        }

        //console.log(usuario);
        usuario = new Usuario(req.body);
        //console.log(usuario);

        //encriptar
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password,salt) 

        await usuario.save();

        //generar JWT
        const token = await generarJWT(usuario._id,usuario.name);

        res.status(201).json({
            ok:true,
            uid: usuario._id,
            name:usuario.name,
            token
            // email,
            // password
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        });
    }
    

    //nosotros debemos poner el error, en este caso es un badRequest.
    // if(name.length < 5){
    //     return res.status(400).json({
    //         ok: false,
    //         msg: 'El nombre debe tener mas de 5 letras'
    //     });
    // }

    //manejo de errores

    //const errors = validationResult(req);
    //console.log(errors);

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         ok:false,
    //         errors:errors.mapped() //para convertir a objeto, serializarlo
    //     })
    // }

    
}

const loginUsuario = async (req,res=response)=>{    
    
    const {email,password} = req.body;

    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(400).json({
    //         ok:false,
    //         errors:errors.mapped() //para convertir a objeto, serializarlo
    //     })
    // }


    try {

        const usuario= await Usuario.findOne({email: email});

        if(!usuario) {
            return res.status(400).json({
                ok:false,
                msg: 'El usuario con ese correo no existe'
            });
        }
        
        //confirmar los passwords
        //el compareSync va a compara los passwords, devolvera un bool
        const validPass = bcrypt.compareSync(password,usuario.password);
        if(!validPass){
            return res.status(400).json({
                ok:false,
                msg: 'Password Incorrecto'
            });
        }

        //generar el JWT
        const token = await generarJWT(usuario._id,usuario.name);

        res.json({
            ok:true,
            uid: usuario._id,
            name: usuario.name,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Por favor hable con el administrador'
        });
    }

};

const revalidarToken = async(req,res=response)=>{    

    const {uid,name} = req;

    const token = await generarJWT(uid,name);
   
    res.json({
        ok:true,
        uid,
        name,
        token
    })
};

module.exports = 
    {
    crearUsuario,
    loginUsuario,
    revalidarToken
    } 