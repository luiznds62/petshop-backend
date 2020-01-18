import express from "express"
import enderecoService from "../services/EnderecoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let enderecos = await enderecoService.buscarTodos(req.query.offset, req.query.limit, req.query.order)

    if (enderecos.err) {
        res.send(new ResponseBuilder(false, enderecos.err))
    }

    res.send(new ResponseBuilder(
        true,
        'Endereços encontrados com sucesso',
        enderecos.obj,
        enderecos.proximo,
        enderecos.offset,
        req.query.limit,
        enderecos.total
    ))
})

router.get('/:id', async (req, res) => {
    let endereco = await enderecoService.buscarPorId(req.params.id)

    if (endereco.err) {
        res.send(new ResponseBuilder(false, endereco.err))
    }

    res.send(new ResponseBuilder(true, 'Endereço encontrado com sucesso', endereco))
})

router.post('/', async (req, res) => {
    let endereco = await enderecoService.salvarEndereco(req.body)

    if (endereco.err) {
        res.send(new ResponseBuilder(false, endereco.err))
    }

    res.send(new ResponseBuilder(true, 'Endereco salvo com sucesso', endereco))
})

router.delete('/:id', async (req, res) => {
    let endereco = await enderecoService.deletarEndereco(req.params.id)

    if (endereco.err) {
        res.send(new ResponseBuilder(false, endereco.err))
    }

    res.send(new ResponseBuilder(true, "Endereço deletado com sucesso", endereco))
})

export default router