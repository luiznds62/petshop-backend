import express from "express"
import especieService from "../services/EspecieService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let especies = await especieService.buscarTodos()

    if (especies.err) {
        res.send(new ResponseBuilder(false, especies.err))
    }

    res.send(new ResponseBuilder(true, "Especies buscadas com sucesso", especies))
})

router.get('/:id', async (req, res) => {
    let especie = await especieService.buscarPorId(req.params.id)

    if (especie.err) {
        res.send(new ResponseBuilder(false, especie.err))
    }

    res.send(new ResponseBuilder(true, "Especie buscada com sucesso", especie))
})

router.post('/', async (req, res) => {
    let especie = await especieService.salvarEspecie(req.body)

    if (especie.err) {
        res.send(new ResponseBuilder(false, especie.err))
    }

    res.send(new ResponseBuilder(true, "Especie salva com sucesso", especie))
})

router.put('/:id', async (req, res) => {
    let especie = await especieService.atualizarEspecie(req.params.id,req.body)

    if (especie.err) {
        res.send(new ResponseBuilder(false, especie.err))
    }

    res.send(new ResponseBuilder(true, "Especie atualizada com sucesso", especie))
})

router.delete('/:id', async (req, res) => {
    let especie = await especieService.deletarEspecie(req.params.id)

    if (especie.err) {
        res.send(new ResponseBuilder(false, especie.err))
    }

    res.send(new ResponseBuilder(true, "Especie deletada com sucesso", especie))
})

export default router