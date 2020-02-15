import * as express from "express"
import { AgendamentoService } from "../services/AgendamentoService"
import { ResponseBuilder } from "../common/ResponseBuilder"
import authMiddleware from '../middlewares/AuthMiddleware'

let agendamentoService = new AgendamentoService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let agendamentos = await agendamentoService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(
            true,
            "Agendamentos buscados com sucesso",
            agendamentos.obj,
            agendamentos.proximo,
            agendamentos.offset,
            req.query.limit,
            agendamentos.total))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:id', async (req, res) => {
    try {
        let agendamento = await agendamentoService.buscarPorId(req.params.id)
        res.send(new ResponseBuilder(true, "Agendamento buscado com sucesso", agendamento))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/', async (req, res) => {
    try {
        let agendamento = await agendamentoService.salvarAgendamento(req.body)
        res.send(new ResponseBuilder(true, "Agendamento salvo com sucesso", agendamento))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.put('/:id', async (req, res) => {
    try {
        let agendamento = await agendamentoService.atualizarAgendamento(req.params.id, req.body)
        res.send(new ResponseBuilder(true, "Agendamento atualizado com sucesso", agendamento))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let agendamento = await agendamentoService.deletarAgendamento(req.params.id)
        res.send(new ResponseBuilder(true, "Agendamento deletado com sucesso", agendamento))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router