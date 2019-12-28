import express from "express"
import empresaService from "../services/empresaService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let empresas = await empresaService.buscarTodos()

    if (empresas.err) {
        res.send(new ResponseBuilder(false, empresas.err))
    }

    res.send(new ResponseBuilder(true, 'Empresas encontradas com sucesso', empresas))
})

router.put('/', async (req, res) => {
    res.send(await empresaService.atualizarEmpresa(req, res))
})

router.post('/', async (req, res) => {
    let empresa = await empresaService.salvarEmpresa(req.body)

    if (empresa.err) {
        res.send(new ResponseBuilder(false, empresa.err))
    }

    res.send(new ResponseBuilder(true, 'Empresa salva com sucesso', empresa))
})

router.delete('/', async (req, res) => {
    res.send(await empresaService.deletarEmpresa(req, res))
})

export default router