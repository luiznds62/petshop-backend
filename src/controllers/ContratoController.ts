import * as express from "express"
import { ContratoService } from "../services/ContratoService"
import { ResponseBuilder } from "../common/ResponseBuilder"
import authMiddleware from '../middlewares/AuthMiddleware'

let contratoService = new ContratoService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let contratos = await contratoService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(
            true,
            'Contratos encontrados com sucesso',
            contratos.obj,
            contratos.proximo,
            contratos.offset,
            req.query.limit,
            contratos.total
        ))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:id', async (req, res) => {
    try {
        let contrato = await contratoService.buscarPorId(req.params.id)
        res.send(new ResponseBuilder(true, "Contrato encontrado com sucesso", contrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/cliente/:id', async (req, res) => {
    try {
        let contrato = await contratoService.buscarPorCliente(req.params.id, req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(true, "Contrato encontrado com sucesso", contrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/', async (req, res) => {
    try {
        let contrato = await contratoService.salvarContrato(req.body)
        res.send(new ResponseBuilder(true, "Contrato salvo com sucesso", contrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.put('/:id', async (req, res) => {
    try {
        let contrato = await contratoService.atualizarContrato(req.params.id, req.body)
        res.send(new ResponseBuilder(true, "Contrato atualizado com sucesso", contrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let contrato = await contratoService.deletarContrato(req.params.id)
        res.send(new ResponseBuilder(true, "Contrato deletado com sucesso", contrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router