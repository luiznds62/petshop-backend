import * as express from "express"
import { TipoContratoService } from "../services/TipoContratoService"
import { ResponseBuilder } from "../common/ResponseBuilder"
import authMiddleware from '../middlewares/AuthMiddleware'

let tipoContratoService = new TipoContratoService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let tipoContratos = await tipoContratoService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(
            true,
            'Tipos de contrato encontrados com sucesso',
            tipoContratos.obj,
            tipoContratos.proximo,
            tipoContratos.offset,
            req.query.limit,
            tipoContratos.total
        ))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:id', async (req, res) => {
    try {
        let tipoContrato = await tipoContratoService.buscarPorId(req.params.id)
        res.send(new ResponseBuilder(true, "Tipo de contrato encontrado com sucesso", tipoContrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})


router.post('/', async (req, res) => {
    try {
        let tipoContrato = await tipoContratoService.salvarTipoContrato(req.body)
        res.send(new ResponseBuilder(true, "Tipo de contrato salvo com sucesso", tipoContrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.put('/:id', async (req, res) => {
    try {
        let tipoContrato = await tipoContratoService.atualizarTipoContrato(req.params.id, req.body)
        res.send(new ResponseBuilder(true, "Tipo de contrato atualizado com sucesso", tipoContrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let tipoContrato = await tipoContratoService.deletarTipoContrato(req.params.id)
        res.send(new ResponseBuilder(true, "Tipo de contrato deletado com sucesso", tipoContrato))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router