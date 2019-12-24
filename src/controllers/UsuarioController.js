import express from "express"
import usuarioService from "../services/UsuarioService"
const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await usuarioService.getAll(req, res))
})

router.put('/', async (req, res) => {
    res.send(await usuarioService.updateUsuario(req, res))
})

router.post('/', async (req, res) => {
    res.send(await usuarioService.saveUsuario(req, res))
})

router.delete('/', async (req, res) => {
    res.send(await usuarioService.deleteUsuario(req, res))
})

export default router