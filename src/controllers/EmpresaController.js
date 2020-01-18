import express from "express"
import empresaService from "../services/empresaService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let empresas = await empresaService.buscarTodos(req.query.offset, req.query.limit, req.query.order)

    if (empresas.err) {
        res.send(new ResponseBuilder(false, empresas.err))
    }

    res.send(new ResponseBuilder(
        true,
        'Empresas encontradas com sucesso',
        empresas.obj,
        empresas.proximo,
        empresas.offset,
        req.query.limit,
        empresas.total
    ))
})

router.get('/:id', async (req, res) => {
    let empresa = await empresaService.buscarPorId(req.params.id)

    if (empresa.err) {
        res.send(new ResponseBuilder(false, empresa.err))
    }
    console.log('teste')

    res.send(new ResponseBuilder(true, 'Empresa encontrada com sucesso', empresa))
})

router.put('/', async (req, res) => {
    let empresaAtualizada = await empresaService.atualizarEmpresa(req.body)

    if (empresaAtualizada.err) {
        res.send(new ResponseBuilder(false, empresaAtualizada.err))
    }

    res.send(new ResponseBuilder(true, 'Empresa atualizada com sucesso', empresaAtualizada))
})

router.post('/', async (req, res) => {
    let empresa = await empresaService.salvarEmpresa(req.body)

    if (empresa.err) {
        res.send(new ResponseBuilder(false, empresa.err))
    }

    res.send(new ResponseBuilder(true, 'Empresa salva com sucesso', empresa))
})

router.delete('/:id', async (req, res) => {
    let empresaDeletada = await empresaService.deletarEmpresa(req.params.id)

    if (empresaDeletada.err) {
        res.send(new ResponseBuilder(false, empresaDeletada.err))
    }

    res.send(new ResponseBuilder(true, 'Empresa deletada com sucesso', empresaDeletada))
})

export default router