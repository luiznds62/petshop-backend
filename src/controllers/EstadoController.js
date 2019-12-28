import express from "express"
import estadoService from "../services/EstadoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let estados = await estadoService.buscarTodos()

    if (estados.err) {
        res.send(new ResponseBuilder(false, estados.err))
    }
    
    res.send(new ResponseBuilder(true, 'Estados encontrados com sucesso', estados))
})

export default router