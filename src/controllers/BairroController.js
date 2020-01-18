import express from "express"
import bairroService from "../services/BairroService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let bairros = await bairroService.buscarTodos(req.query.offset, req.query.limit, req.query.order)

    if (bairros.err) {
        res.send(new ResponseBuilder(false, bairros.err))
    }

    res.send(new ResponseBuilder(
        true,
        'Bairros encontrados com sucesso',
        bairros.obj,
        bairros.proximo,
        bairros.offset,
        req.query.limit,
        bairros.total
    ))
})

router.get('/cidade/:id', async (req, res) => {
    let bairros = await bairroService.buscarPorCidadeId(req.params.id, req.query.offset, req.query.limit, req.query.order)

    if (bairros.err) {
        res.send(new ResponseBuilder(false, bairros.err))
    }

    res.send(new ResponseBuilder(
        true,
        'Bairros encontrados com sucesso',
        bairros.obj,
        bairros.proximo,
        bairros.offset,
        req.query.limit,
        bairros.total
    ))
})

router.post('/', async (req, res) => {
    let bairro = await bairroService.salvarBairro(req.body)

    if (bairro.err) {
        res.send(new ResponseBuilder(false, bairro.err))
    }

    res.send(new ResponseBuilder(true, "Bairro salvo com sucesso", bairro))
})

export default router