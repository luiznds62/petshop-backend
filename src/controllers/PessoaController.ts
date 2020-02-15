import * as express from "express"
import { PessoaService } from "../services/PessoaService"
import { ResponseBuilder } from "../common/ResponseBuilder"
import authMiddleware from '../middlewares/AuthMiddleware'

let pessoaService = new PessoaService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let pessoas = await pessoaService.buscarTodos(req.query.offset, req.query.limit, req.query.order)

    if (pessoas.err) {
        res.send(new ResponseBuilder(false, pessoas.err))
    }

    res.send(new ResponseBuilder(
        true,
        'Pessoas encontrados com sucesso',
        pessoas.obj,
        pessoas.proximo,
        pessoas.offset,
        req.query.limit,
        pessoas.total
    ))
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

router.put('/:id', async (req, res) => {
    let pessoa = await pessoaService.atualizarPessoa(req.params.id, req.body)

    if (pessoa.err) {
        res.send(new ResponseBuilder(false, pessoa.err))
    }

    res.send(new ResponseBuilder(true, "Pessoa atualizada com sucesso", pessoa))
})

router.delete('/:id', async (req, res) => {
    let pessoa = await pessoaService.deletarPessoa(req.params.id)

    if (pessoa.err) {
        res.send(new ResponseBuilder(false, pessoa.err))
    }

    res.send(new ResponseBuilder(true, "Pessoa deletada com sucesso", pessoa))
})

export default router