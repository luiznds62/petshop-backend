import express from "express"
import pessoaService from "../services/pessoaService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let pessoas = await pessoaService.buscarTodos()

    if (pessoas.err) {
        res.send(new ResponseBuilder(false, pessoas.err))
    }

    res.send(new ResponseBuilder(true, "Pessoas buscadas com sucesso", pessoas))
})

router.get('/:id', async (req, res) => {
    let pessoa = await pessoaService.buscarPorId(req.params.id)

    if (pessoa.err) {
        res.send(new ResponseBuilder(false, pessoa.err))
    }

    res.send(new ResponseBuilder(true, "Pessoa buscada com sucesso", pessoa))
})

router.post('/', async (req, res) => {
    let pessoa = await pessoaService.salvarPessoa(req.body)

    if (pessoa.err) {
        res.send(new ResponseBuilder(false, pessoa.err))
    }

    res.send(new ResponseBuilder(true, "Pessoa salva com sucesso", pessoa))
})

router.delete('/:id', async (req, res) => {
    let pessoa = await pessoaService.deletarPessoa(req.params.id)

    if (pessoa.err) {
        res.send(new ResponseBuilder(false, pessoa.err))
    }

    res.send(new ResponseBuilder(true, "Pessoa deletada com sucesso", pessoa))
})

export default router