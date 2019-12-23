import express from "express";
import materiaController from "../services/materia.controller"
const router = express.Router()

router.get('/', (req, res) => {
    materiaController.getAll(req, res);
});

router.put('/', (req, res) => {
    materiaController.updateMateria(req, res);
})

router.post('/', (req, res) => {
    materiaController.addMateria(req, res);
});

router.delete('/', (req, res) => {
    materiaController.deleteMateria(req, res);
});

export default router;