import express from "express"
import cidadeService from "../services/CidadeService"
import authMiddleware from '../middlewares/AuthMiddleware'

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    res.send(await cidadeService.buscarTodos(req, res))
})

export default router