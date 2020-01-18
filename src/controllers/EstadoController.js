import express from "express"
import estadoService from "../services/EstadoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let estados = await estadoService.buscarTodos(req.query.offset, req.query.limit, req.query.order)

    if (estados.err) {
        res.send(new ResponseBuilder(false, estados.err))
    }
    
    res.send(new ResponseBuilder(
        true,
        'Estados encontrados com sucesso',
        estados.obj,
        estados.proximo,
        estados.offset,
        req.query.limit,
        estados.total
    ))
})

router.get('/:uf', async (req, res) => {
    let estado = await estadoService.buscarPorUf(req.params.uf)

    if (estado.err) {
        res.send(new ResponseBuilder(false, estado.err))
    }
    
    res.send(new ResponseBuilder(true, 'Estado encontrado com sucesso', estado))
})

router.post('/', async (req, res) => {
    let estado = await estadoService.salvarEstado(req.body)

    if (estado.err) {
        res.send(new ResponseBuilder(false, estado.err))
    }

    res.send(new ResponseBuilder(true, "Estado salvo com sucesso", estado))
})

export default router