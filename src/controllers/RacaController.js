import express from "express"
import racaService from "../services/RacaService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let racas = await racaService.buscarTodos()

    if (racas.err) {
        res.send(new ResponseBuilder(false, racas.err))
    }

    res.send(new ResponseBuilder(true, "Raças buscadas com sucesso", racas))
})

router.get('/:id', async (req, res) => {
    let raca = await racaService.buscarPorId(req.params.id)

    if (raca.err) {
        res.send(new ResponseBuilder(false, raca.err))
    }

    res.send(new ResponseBuilder(true, "Raça buscada com sucesso", raca))
})

router.post('/', async (req, res) => {
    let raca = await racaService.salvarRaca(req.body)

    if (raca.err) {
        res.send(new ResponseBuilder(false, raca.err))
    }

    res.send(new ResponseBuilder(true, "Raça salva com sucesso", raca))
})

router.put('/:id', async (req, res) => {
    let raca = await racaService.atualizarRaca(req.params.id,req.body)

    if (raca.err) {
        res.send(new ResponseBuilder(false, raca.err))
    }

    res.send(new ResponseBuilder(true, "Raça atualizada com sucesso", raca))
})

router.delete('/:id', async (req, res) => {
    let raca = await racaService.deletarRaca(req.params.id)

    if (raca.err) {
        res.send(new ResponseBuilder(false, raca.err))
    }

    res.send(new ResponseBuilder(true, "Raça deletada com sucesso", raca))
})

export default router