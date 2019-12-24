import express from "express";
import usuarioController from "../services/UsuarioService"
const router = express.Router()

router.get('/', (req, res) => {
    usuarioController.getAll(req, res);
});

router.put('/', (req, res) => {
    usuarioController.updateMateria(req, res);
})

router.post('/', (req, res) => {
    usuarioController.addMateria(req, res);
});

router.delete('/', (req, res) => {
    usuarioController.deleteMateria(req, res);
});

export default router;