import * as express from "express"
import { AgendamentoHasAnimalService } from "../services/AgendamentoHasAnimalService"
import { ResponseBuilder } from "../common/ResponseBuilder"
import authMiddleware from '../middlewares/AuthMiddleware'

let agendamentoHasAnimalService = new AgendamentoHasAnimalService()
let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let agendamentoHasAnimals = await agendamentoHasAnimalService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        res.send(new ResponseBuilder(
            true,
            "Animais de agendamentos buscados com sucesso",
            agendamentoHasAnimals.obj,
            agendamentoHasAnimals.proximo,
            agendamentoHasAnimals.offset,
            req.query.limit,
            agendamentoHasAnimals.total))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/:id', async (req, res) => {
    try {
        let agendamentoHasAnimal = await agendamentoHasAnimalService.buscarPorId(req.params.id)
        res.send(new ResponseBuilder(true, "Animais de agendamento buscado com sucesso", agendamentoHasAnimal))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.get('/agendamento/:id', async (req, res) => {
    try {
        let agendamentoHasAnimal = await agendamentoHasAnimalService.buscarPorAgendamento(req.params.id)
        res.send(new ResponseBuilder(
            true,
            "Animais de agendamentos buscados com sucesso",
            agendamentoHasAnimal.obj,
            agendamentoHasAnimal.proximo,
            agendamentoHasAnimal.offset,
            req.query.limit,
            agendamentoHasAnimal.total))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/', async (req, res) => {
    try {
        let agendamentoHasAnimal = await agendamentoHasAnimalService.salvarAgendamentoHasAnimal(req.body)
        res.send(new ResponseBuilder(true, "Animal de agendamento salvo com sucesso", agendamentoHasAnimal))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.put('/:id', async (req, res) => {
    try {
        let agendamentoHasAnimal = await agendamentoHasAnimalService.atualizarAgendamentoHasAnimal(req.params.id, req.body)
        res.send(new ResponseBuilder(true, "Animal de agendamento atualizado com sucesso", agendamentoHasAnimal))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let agendamentoHasAnimal = await agendamentoHasAnimalService.deletarAgendamentoHasAnimal(req.params.id)
        res.send(new ResponseBuilder(true, "Animal de agendamento deletado com sucesso", agendamentoHasAnimal))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router