import express from "express"
import cidadeService from "../services/CidadeService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let cidades = await cidadeService.buscarTodos()

    if (cidades.err) {
        res.send(new ResponseBuilder(false, cidades.err))
    }

    res.send(new ResponseBuilder(true,'Cidades encontradas com sucesso',cidades))
})

export default router