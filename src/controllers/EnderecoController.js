import express from "express"
import enderecoService from "../services/EnderecoService"
import authMiddleware from '../middlewares/AuthMiddleware'

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    res.send(await enderecoService.buscarTodos(req, res))
})

router.post('/', async (req,res) => {
    res.send(await enderecoService.salvarEndereco(req,res))
})

export default router