import * as express from "express"
import { RacaService } from "../services/RacaService"
import { ResponseBuilder } from "../common/ResponseBuilder"
import authMiddleware from '../middlewares/AuthMiddleware'

let racaService = new RacaService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let racas = await racaService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(
            true,
            'Raças encontradas com sucesso',
            racas.obj,
            racas.proximo,
            racas.offset,
            req.query.limit,
            racas.total
        ))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:id', async (req, res) => {
    try {
        let raca = await racaService.buscarPorId(req.params.id)
        res.send(new ResponseBuilder(true, "Raça buscada com sucesso", raca))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/', async (req, res) => {
    try {
        let raca = await racaService.salvarRaca(req.body)
        res.send(new ResponseBuilder(true, "Raça salva com sucesso", raca))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.put('/:id', async (req, res) => {
    try {
        let raca = await racaService.atualizarRaca(req.params.id, req.body)
        res.send(new ResponseBuilder(true, "Raça atualizada com sucesso", raca))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let raca = await racaService.deletarRaca(req.params.id)
        res.send(new ResponseBuilder(true, "Raça deletada com sucesso", raca))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router