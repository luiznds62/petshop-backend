import * as express from "express"
import { EstadoService } from "../services/EstadoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import { ResponseBuilder } from "../common/ResponseBuilder"

let estadoService = new EstadoService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let estados = await estadoService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(
            true,
            'Estados encontrados com sucesso',
            estados.obj,
            estados.proximo,
            estados.offset,
            req.query.limit,
            estados.total
        ))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:uf', async (req, res) => {
    try {
        let estado = await estadoService.buscarPorUf(req.params.uf)
        res.send(new ResponseBuilder(true, 'Estado encontrado com sucesso', estado))

    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/', async (req, res) => {
    try {
        let estado = await estadoService.salvarEstado(req.body)
        res.send(new ResponseBuilder(true, "Estado salvo com sucesso", estado))

    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router