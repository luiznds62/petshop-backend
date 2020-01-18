import express from "express"
import contratoService from "../services/ContratoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let contratos = await contratoService.buscarTodos(req.query.offset, req.query.limit, req.query.order)

    if (contratos.err) {
        res.send(new ResponseBuilder(false, contratos.err))
    }

    res.send(new ResponseBuilder(
        true,
        'Contratos encontrados com sucesso',
        contratos.obj,
        contratos.proximo,
        contratos.offset,
        req.query.limit,
        contratos.total
    ))
})

router.get('/:id', async (req, res) => {
    let contrato = await contratoService.buscarPorId(req.params.id)

    if (contrato.err) {
        res.send(new ResponseBuilder(false, contrato.err))
    }

    res.send(new ResponseBuilder(true, "Contrato encontrado com sucesso", contrato))
})

router.get('/cliente/:id', async (req, res) => {
    let contrato = await contratoService.buscarPorCliente(req.params.id)

    if (contrato.err) {
        res.send(new ResponseBuilder(false, contrato.err))
    }

    res.send(new ResponseBuilder(true, "Contrato encontrado com sucesso", contrato))
})

router.post('/', async (req, res) => {
    let contrato = await contratoService.salvarContrato(req.body)

    if (contrato.err) {
        res.send(new ResponseBuilder(false, contrato.err))
    }

    res.send(new ResponseBuilder(true, "Contrato salvo com sucesso", contrato))
})

router.put('/:id', async (req, res) => {
    let contrato = await contratoService.atualizarContrato(req.params.id,req.body)

    if (contrato.err) {
        res.send(new ResponseBuilder(false, contrato.err))
    }

    res.send(new ResponseBuilder(true, "Contrato atualizado com sucesso", contrato))
})

router.delete('/:id', async (req, res) => {
    let contrato = await contratoService.deletarContrato(req.params.id)

    if (contrato.err) {
        res.send(new ResponseBuilder(false, contrato.err))
    }

    res.send(new ResponseBuilder(true, "Contrato deletado com sucesso", contrato))
})

export default router