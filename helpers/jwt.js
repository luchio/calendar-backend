const jwt = require('jsonwebtoken');

const generarJWT = (uid,name) =>{


    return new Promise((resolve,reject)=>{
        const payload= {uid,name};

        //sign para firmar un token, necesita el payload= informacion dentro del token,
        //una palabra o frase secreta, y un objeto de opciones
        //si todo sale bien se ejecuta el callback del ultimo argumento, que recibe el error si existe y el token
        //si todo salio bien
        jwt.sign(payload, process.env.SECRET_JWT_SEED,{
            expiresIn: '2h'
        },(err,token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            }
            resolve(token);
        })
    })

}

module.exports = {
    generarJWT
}