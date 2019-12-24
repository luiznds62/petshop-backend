import express from "express"
import usuarioService from "../services/UsuarioService"
const router = express.Router()

router.get('/', async (req, res) => {
    res.send(await usuarioService.buscarTodos(req, res))
})

router.put('/', async (req, res) => {
    res.send(await usuarioService.atualizarUsuario(req, res))
})

router.post('/', async (req, res) => {
    res.send(await usuarioService.salvarUsuario(req, res))
})

router.delete('/', async (req, res) => {
    res.send(await usuarioService.deletarUsuario(req, res))
})

export default router