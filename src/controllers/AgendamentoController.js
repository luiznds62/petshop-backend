import express from "express"
import agendamentoService from "../services/AgendamentoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let agendamentos = await agendamentoService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        if (agendamentos.err) {
            res.send(new ResponseBuilder(false, agendamentos.err))
        }

        res.send(new ResponseBuilder(
            true,
            "Agendamentos buscados com sucesso",
            agendamentos.obj,
            agendamentos.proximo,
            agendamentos.offset,
            req.query.limit,
            agendamentos.total))
    } catch (error) {
        res.send(new ResponseBuilder(false, 'Erro interno do servidor'))
    }
})

router.get('/:id', async (req, res) => {
    let agendamento = await agendamentoService.buscarPorId(req.params.id, req.query.offset, req.query.limit, req.query.order)

    if (agendamento.err) {
        res.send(new ResponseBuilder(false, agendamento.err))
    }

    res.send(new ResponseBuilder(true, "Agendamento buscado com sucesso", agendamento))
})

router.post('/', async (req, res) => {
    let agendamento = await agendamentoService.salvarAgendamento(req.body)

    if (agendamento.err) {
        res.send(new ResponseBuilder(false, agendamento.err))
    }

    res.send(new ResponseBuilder(true, "Agendamento salvo com sucesso", agendamento))
})

router.put('/:id', async (req, res) => {
    let agendamento = await agendamentoService.atualizarAgendamento(req.params.id, req.body)

    if (agendamento.err) {
        res.send(new ResponseBuilder(false, agendamento.err))
    }

    res.send(new ResponseBuilder(true, "Agendamento atualizado com sucesso", agendamento))
})

router.delete('/:id', async (req, res) => {
    let agendamento = await agendamentoService.deletarAgendamento(req.params.id)

    if (agendamento.err) {
        res.send(new ResponseBuilder(false, agendamento.err))
    }

    res.send(new ResponseBuilder(true, "Agendamento deletado com sucesso", agendamento))
})

export default router