import express from "express";
import usuarioController from "../services/UsuarioService"
const router = express.Router()

router.get('/', (req, res) => {
    usuarioController.getAll(req, res);
});

router.put('/', (req, res) => {
    usuarioController.updateUsuario(req, res);
})

router.post('/', (req, res) => {
    usuarioController.saveUsuario(req, res);
});

router.delete('/', (req, res) => {
    usuarioController.deleteUsuario(req, res);
});

export default router;