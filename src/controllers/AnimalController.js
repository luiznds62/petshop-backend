import express from "express"
import animalService from "../services/AnimalService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    try {
        let animais = await animalService.buscarTodos(req.query.offset, req.query.limit, req.query.order)
        if (animais.err) {
            res.send(new ResponseBuilder(false, animais.err))
        }

        res.send(new ResponseBuilder(true, "Animais buscados com sucesso", animais.obj, animais.proximo, animais.offset, req.query.limit, animais.total))
    } catch (error) {
        res.send(new ResponseBuilder(false, 'Erro interno do servidor'))
    }
})

router.get('/:id', async (req, res) => {
    let animal = await animalService.buscarPorId(req.params.id, req.query.offset, req.query.limit, req.query.order)

    if (animal.err) {
        res.send(new ResponseBuilder(false, animal.err))
    }

    res.send(new ResponseBuilder(true, "Animal buscado com sucesso", animal))
})

router.post('/', async (req, res) => {
    let animal = await animalService.salvarAnimal(req.body)

    if (animal.err) {
        res.send(new ResponseBuilder(false, animal.err))
    }

    res.send(new ResponseBuilder(true, "Animal salvo com sucesso", animal))
})

router.put('/:id', async (req, res) => {
    let animal = await animalService.atualizarAnimal(req.params.id, req.body)

    if (animal.err) {
        res.send(new ResponseBuilder(false, animal.err))
    }

    res.send(new ResponseBuilder(true, "Animal atualizado com sucesso", animal))
})

router.delete('/:id', async (req, res) => {
    let animal = await animalService.deletarAnimal(req.params.id)

    if (animal.err) {
        res.send(new ResponseBuilder(false, animal.err))
    }

    res.send(new ResponseBuilder(true, "Animal deletado com sucesso", animal))
})

export default router