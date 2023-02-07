
/*
Rutas de usuarios /Auth
host + /api/auth
*/

const {Router} = require('express');
const {check} = require('express-validator');
const router = Router();

const {crearUsuario,loginUsuario,revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
//esta callback se llama con 2 paramentros, la request y la response


//si yo quiero ver la informacion de este router, debemos concaternar lo que hay en el app.use es decir
// /api/auth/ mas lo que viene detro del router.get es decir /
// router.get('/',(req,res)=>{    
//     console.log('Se requiere /');
//     res.json({
//         ok:true
//     })
// });

//no es bueno tener las funciones como callbacks ahi mismo, porque existira mucha logica y se encuciara el codigo
//es por eso que nos creamos los controladores para definir estas funciones y exportarlas.

//la peticion debe ser post.
router.post('/',
[
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe de ser de mas de 6 caracteres').isLength({min:6}),
    validarCampos 
],
loginUsuario);

router.post('/new',
[//midlewares, lo ponemos en array porque son varios middlewares
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','El password debe de ser de mas de 6 caracteres').isLength({min:6}), 
    validarCampos
],
crearUsuario);
//si solo es un middleware no necesita un arreglo[]
router.get('/renew',validarJWT,revalidarToken);


module.exports = router;

