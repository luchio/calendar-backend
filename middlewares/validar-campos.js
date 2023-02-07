//* Los custom middlewares son funciones personalizadas, por convencion se coloca de nombre a una carpeta
//*middlewares para indicar que adentro hay custom middlewares
const {response} = require('express');
const {validationResult} = require('express-validator');

//el next se llama si todo este middleware se ejecutar correctamente
const validarCampos = (req,res = response,next) =>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors:errors.mapped() //para convertir a objeto, serializarlo
        })
    }

    next();

}

module.exports = {
    validarCampos
}