import * as express from "express"
import { PessoaService } from "../services/PessoaService"
import { ResponseBuilder } from "../common/ResponseBuilder"
import authMiddleware from '../middlewares/AuthMiddleware'

let pessoaService = new PessoaService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let pessoas = await pessoaService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(
            true,
            'Pessoas encontrados com sucesso',
            pessoas.obj,
            pessoas.proximo,
            pessoas.offset,
            req.query.limit,
            pessoas.total
        ))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:id', async (req, res) => {
    try {
        let pessoa = await pessoaService.buscarPorId(req.params.id)
        res.send(new ResponseBuilder(true, "Pessoa buscada com sucesso", pessoa))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/', async (req, res) => {
    try {
        let pessoa = await pessoaService.salvarPessoa(req.body)
        res.send(new ResponseBuilder(true, "Pessoa salva com sucesso", pessoa))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.put('/:id', async (req, res) => {
    try {
        let pessoa = await pessoaService.atualizarPessoa(req.params.id, req.body)
        res.send(new ResponseBuilder(true, "Pessoa atualizada com sucesso", pessoa))

    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let pessoa = await pessoaService.deletarPessoa(req.params.id)
        res.send(new ResponseBuilder(true, "Pessoa deletada com sucesso", pessoa))

    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router