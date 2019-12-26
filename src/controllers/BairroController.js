import express from "express"
import bairroService from "../services/BairroService"
import authMiddleware from '../middlewares/AuthMiddleware'

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    res.send(await bairroService.buscarTodos(req, res))
})

export default router