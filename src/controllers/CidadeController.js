import express from "express"
import cidadeService from "../services/CidadeService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let cidades = await cidadeService.buscarTodos()

    if (cidades.err) {
        res.send(new ResponseBuilder(false, cidades.err))
    }

    res.send(new ResponseBuilder(true, 'Cidades encontradas com sucesso', cidades))
})

router.get('/:id', async (req, res) => {
    let cidade = await cidadeService.buscarPorId(req.params.id)

    if (cidade.err) {
        res.send(new ResponseBuilder(false, cidade.err))
    }

    res.send(new ResponseBuilder(true, 'Cidade encontrada com sucesso', cidade))
})

router.get('/:uf/:nome', async (req, res) => {
    let cidade = await cidadeService.buscarPorUFNome(req.params.uf, req.params.nome)

    if (cidade.err) {
        res.send(new ResponseBuilder(false, cidade.err))
    }

    res.send(new ResponseBuilder(true, 'Cidade encontrada com sucesso', cidade))
})

router.post('/', async (req, res) => {
    let cidade = await cidadeService.salvarCidade(req.body)

    if (cidade.err) {
        res.send(new ResponseBuilder(false, cidade.err))
    }

    res.send(new ResponseBuilder(true, "Cidade salva com sucesso", cidade))
})

export default router