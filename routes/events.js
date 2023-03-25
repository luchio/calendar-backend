/*

    Events Routes
    host+ /api/events 
  */

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const {getEvents,createEvents,updateEvents,deleteEvents} = require('../controllers/events');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//si un middleware se ejecuta para todos las rutas podemos hacer esto:
//le decimos que cualquier peticion que se encuentre debajo de esto debe pasar por el validarJWT
router.use(validarJWT);



//todas tienen que estar validadas por JWT
//obtener eventos
router.get('/',validarCampos,getEvents);

//crear eventos
//!El check no detiene el error, solo lo llena, es por eso que se debe tener un custom middleware 
router.post('/',[
  check('title','El titulo es obligatorio').not().isEmpty(),
  check('start','Fecha de inicio es obligatoria').custom(isDate),
  check('end','Fecha de finalizacion es obligatoria').custom(isDate),  
  validarCampos
],createEvents);


//actualizar eventos
router.put('/:id',[
  check('title','El titulo es obligatorio').not().isEmpty(),
  check('start','Fecha de inicio es obligatoria').custom(isDate),
  check('end','Fecha de finalizacion es obligatoria').custom(isDate),  
  validarCampos
],updateEvents);

//borrar eventos
router.delete('/:id',validarCampos,deleteEvents);

module.exports = router;
