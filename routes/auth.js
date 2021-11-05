/* Rutas del path 
 host + /api/auth/
*/

const { Router, response } = require('express'); 
const router = Router();
const { check } = require('express-validator')

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt')


router.post(
    '/new',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es mínimo 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    crearUsuario );


router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es mínimo 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    loginUsuario );


router.get('/renew',validarJWT, revalidarToken);
module.exports = router;