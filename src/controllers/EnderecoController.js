import express from "express"
import enderecoService from "../services/EnderecoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let enderecos = await enderecoService.buscarTodos()

    if (enderecos.err) {
        res.send(new ResponseBuilder(false, enderecos.err))
    }

    res.send(new ResponseBuilder(true, 'Endereços encontrados com sucesso', enderecos))
})

router.post('/', async (req, res) => {
    let endereco = await enderecoService.salvarEndereco(req.body)

    if (endereco.err) {
        res.send(new ResponseBuilder(false, endereco.err))
    }

    res.send(new ResponseBuilder(true, 'Endereco salvo com sucesso', endereco))
})

export default router