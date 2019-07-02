const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuariosController');


//aqui llamamos las funciones y las asignamos a una ruta
router.get('/mostrarPacientes' , controller.mostrarPacientes);
router.post('/addPaciente',controller.addPaciente);

router.get('/mostrarEd',controller.mostrarEd)
router.post('/addEd',controller.addEd)

router.get('/mostrarEmpleado',controller.mostrarEmpleado)
router.post('/addEmpleado',controller.addEmpleado)

router.get('/mostrarAtenciones',controller.mostrarAtenciones)
router.post('/addAtencion',controller.addAtencion)

router.post('/consulta',controller.consulta)

router.get('/araya',controller.araya)
module.exports= router;