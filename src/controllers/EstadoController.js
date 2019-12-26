import express from "express"
import estadoService from "../services/EstadoService"
import authMiddleware from '../middlewares/AuthMiddleware'

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    res.send(await estadoService.buscarTodos(req, res))
})

export default router