import express from "express"
import bairroService from "../services/BairroService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let bairros = await bairroService.buscarTodos()

    if (bairros.err) {
        res.send(new ResponseBuilder(false, bairros.err))
    }

    res.send(new ResponseBuilder(true, 'Bairros encontrados com sucesso', bairros))
})

router.get('/cidade/:id', async (req, res) => {
    let bairros = await bairroService.buscarPorIDCidade(req.params.id)

    if (bairros.err) {
        res.send(new ResponseBuilder(false, bairros.err))
    }

    res.send(new ResponseBuilder(true, `Bairros encontrados para a Cidade com sucesso`, bairros))
})

router.post('/', async (req, res) => {
    let bairro = await bairroService.salvarBairro(req.body)

    if (bairro.err) {
        res.send(new ResponseBuilder(false, bairro.err))
    }

    res.send(new ResponseBuilder(true, "Bairro salvo com sucesso", bairro))
})

export default router