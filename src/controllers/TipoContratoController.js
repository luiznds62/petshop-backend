import express from "express"
import tipoContratoService from "../services/TipoContratoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let tipoContratos = await tipoContratoService.buscarTodos()

    if (tipoContratos.err) {
        res.send(new ResponseBuilder(false, tipoContratos.err))
    }

    res.send(new ResponseBuilder(true, 'Tipos de contrato encontrados com sucesso', tipoContratos))
})

router.get('/:id', async (req, res) => {
    let tipoContrato = await tipoContratoService.buscarPorId(req.params.id)

    if (tipoContrato.err) {
        res.send(new ResponseBuilder(false, tipoContrato.err))
    }

    res.send(new ResponseBuilder(true, "Tipo de contrato encontrado com sucesso", tipoContrato))
})


router.post('/', async (req, res) => {
    let tipoContrato = await tipoContratoService.salvarTipoContrato(req.body)

    if (tipoContrato.err) {
        res.send(new ResponseBuilder(false, tipoContrato.err))
    }

    res.send(new ResponseBuilder(true, "Tipo de contrato salvo com sucesso", tipoContrato))
})

router.put('/:id', async (req, res) => {
    let tipoContrato = await tipoContratoService.atualizarTipoContrato(req.params.id, req.body)

    if (tipoContrato.err) {
        res.send(new ResponseBuilder(false, tipoContrato.err))
    }

    res.send(new ResponseBuilder(true, "Tipo de contrato atualizado com sucesso", tipoContrato))
})

router.delete('/:id', async (req, res) => {
    let tipoContrato = await tipoContratoService.deletarTipoContrato(req.params.id)

    if (tipoContrato.err) {
        res.send(new ResponseBuilder(false, tipoContrato.err))
    }

    res.send(new ResponseBuilder(true, "Tipo de contrato deletado com sucesso", tipoContrato))
})

export default router