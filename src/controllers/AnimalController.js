import express from "express"
import animalService from "../services/AnimalService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let animais = await animalService.buscarTodos()

    if (animais.err) {
        res.send(new ResponseBuilder(false, animais.err))
    }

    res.send(new ResponseBuilder(true, "Animais buscadas com sucesso", animais))
})

router.get('/:id', async (req, res) => {
    let animal = await animalService.buscarPorId(req.params.id)

    if (animal.err) {
        res.send(new ResponseBuilder(false, animal.err))
    }

    res.send(new ResponseBuilder(true, "Animal buscada com sucesso", animal))
})

router.post('/', async (req, res) => {
    let animal = await animalService.salvarAnimal(req.body)

    if (animal.err) {
        res.send(new ResponseBuilder(false, animal.err))
    }

    res.send(new ResponseBuilder(true, "Animal salva com sucesso", animal))
})

router.put('/:id', async (req, res) => {
    let animal = await animalService.atualizarAnimal(req.params.id,req.body)

    if (animal.err) {
        res.send(new ResponseBuilder(false, animal.err))
    }

    res.send(new ResponseBuilder(true, "Animal atualizada com sucesso", animal))
})

router.delete('/:id', async (req, res) => {
    let animal = await animalService.deletarAnimal(req.params.id)

    if (animal.err) {
        res.send(new ResponseBuilder(false, animal.err))
    }

    res.send(new ResponseBuilder(true, "Animal deletada com sucesso", animal))
})

export default router