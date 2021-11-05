//Event routes

const { Router } = require("express");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();
const {
  crearEvento,
  getEventos,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { check } = require("express-validator");
const { validarCampos } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')

//Obtener eventos
router.get("/", validarJWT, getEventos);

// Crear un evento nuevo
router.post("/", 
[
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
    check('end', 'Fecha de finalización es obligatoria').custom( isDate ),
    validarCampos
]
, validarJWT, crearEvento);

//Actualizar eventos

router.put("/:id", validarJWT, actualizarEvento);

//Borrar evento
router.delete("/:id", validarJWT, eliminarEvento);

module.exports = router;
