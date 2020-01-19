import express from "express"
import agendamentoHasAnimalService from "../services/AgendamentoHasAnimalService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let agendamentoHasAnimals = await agendamentoHasAnimalService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        if (agendamentoHasAnimals.err) {
            res.send(new ResponseBuilder(false, agendamentoHasAnimals.err))
        }

        res.send(new ResponseBuilder(
            true,
            "Animais de agendamentos buscados com sucesso",
            agendamentoHasAnimals.obj,
            agendamentoHasAnimals.proximo,
            agendamentoHasAnimals.offset,
            req.query.limit,
            agendamentoHasAnimals.total))
    } catch (error) {
        res.send(new ResponseBuilder(false, 'Erro interno do servidor'))
    }
})

router.get('/:id', async (req, res) => {
    let agendamentoHasAnimal = await agendamentoHasAnimalService.buscarPorId(req.params.id, req.query.offset, req.query.limit, req.query.order)

    if (agendamentoHasAnimal.err) {
        res.send(new ResponseBuilder(false, agendamentoHasAnimal.err))
    }

    res.send(new ResponseBuilder(true, "Animais de agendamento buscado com sucesso", agendamentoHasAnimal))
})

router.get('/agendamento/:id', async (req, res) => {
    let agendamentoHasAnimal = await agendamentoHasAnimalService.buscarPorAgendamento(req.params.id, req.query.offset, req.query.limit, req.query.order)

    if (agendamentoHasAnimal.err) {
        res.send(new ResponseBuilder(false, agendamentoHasAnimal.err))
    }

    res.send(new ResponseBuilder(
        true,
        "Animais de agendamentos buscados com sucesso",
        agendamentoHasAnimal.obj,
        agendamentoHasAnimal.proximo,
        agendamentoHasAnimal.offset,
        req.query.limit,
        agendamentoHasAnimal.total))
})

router.post('/', async (req, res) => {
    let agendamentoHasAnimal = await agendamentoHasAnimalService.salvarAgendamentoHasAnimal(req.body)

    if (agendamentoHasAnimal.err) {
        res.send(new ResponseBuilder(false, agendamentoHasAnimal.err))
    }

    res.send(new ResponseBuilder(true, "Animal de agendamento salvo com sucesso", agendamentoHasAnimal))
})

router.put('/:id', async (req, res) => {
    let agendamentoHasAnimal = await agendamentoHasAnimalService.atualizarAgendamentoHasAnimal(req.params.id, req.body)

    if (agendamentoHasAnimal.err) {
        res.send(new ResponseBuilder(false, agendamentoHasAnimal.err))
    }

    res.send(new ResponseBuilder(true, "Animal de agendamento atualizado com sucesso", agendamentoHasAnimal))
})

router.delete('/:id', async (req, res) => {
    let agendamentoHasAnimal = await agendamentoHasAnimalService.deletarAgendamentoHasAnimal(req.params.id)

    if (agendamentoHasAnimal.err) {
        res.send(new ResponseBuilder(false, agendamentoHasAnimal.err))
    }

    res.send(new ResponseBuilder(true, "Animal de agendamento deletado com sucesso", agendamentoHasAnimal))
})

export default router