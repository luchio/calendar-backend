const {response, request} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req,res=response,next)=>{
    //vamos a manejar el token mediante los headers, 
    //*x-token headers
    const token = req.header('x-token');
    //console.log(token);

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la peticion'
        })
    }

    try {
        //* Vamos a realizar la verificacion del token, para ver si no tuvo alteraciones o expiro.
        //si todo sale bien devuelve el payload del token
        const {uid,name} = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        //console.log(payload);

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no valido'
        });
    }

    

    next();
}   

module.exports= {
    validarJWT
}