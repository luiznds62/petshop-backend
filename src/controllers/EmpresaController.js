import express from "express"
import empresaService from "../services/empresaService"
import authMiddleware from '../middlewares/AuthMiddleware'

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    res.send(await empresaService.buscarTodos(req, res))
})

router.put('/', async (req, res) => {
    res.send(await empresaService.atualizarUsuario(req, res))
})

router.post('/', async (req, res) => {
    res.send(await empresaService.salvarUsuario(req, res))
})

router.delete('/', async (req, res) => {
    res.send(await empresaService.deletarUsuario(req, res))
})

export default router