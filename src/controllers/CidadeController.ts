import * as express from "express"
import { CidadeService } from "../services/CidadeService"
import authMiddleware from '../middlewares/AuthMiddleware'
import { ResponseBuilder } from "../common/ResponseBuilder"

let cidadeService = new CidadeService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let cidades = await cidadeService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(
            true,
            'Cidades encontradas com sucesso',
            cidades.obj,
            cidades.proximo,
            cidades.offset,
            req.query.limit,
            cidades.total
        ))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:id', async (req, res) => {
    try {
        let cidade = await cidadeService.buscarPorId(req.params.id)
        res.send(new ResponseBuilder(true, 'Cidade encontrada com sucesso', cidade))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:uf/:nome', async (req, res) => {
    try {
        let cidade = await cidadeService.buscarPorUFNome(req.params.uf, req.params.nome)
        res.send(new ResponseBuilder(true, 'Cidade encontrada com sucesso', cidade))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/', async (req, res) => {
    try {
        let cidade = await cidadeService.salvarCidade(req.body)
        res.send(new ResponseBuilder(true, "Cidade salva com sucesso", cidade))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router