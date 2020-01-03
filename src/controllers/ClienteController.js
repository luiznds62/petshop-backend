import express from "express"
import clienteService from "../services/ClienteService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let clientes = await clienteService.buscarTodos()

    if (clientes.err) {
        res.send(new ResponseBuilder(false, clientes.err))
    }

    res.send(new ResponseBuilder(true, "Clientes encontrados com sucesso", clientes))
})

router.get('/:id', async (req, res) => {
    let cliente = await clienteService.buscarPorId(req.params.id)

    if (cliente.err) {
        res.send(new ResponseBuilder(false, cliente.err))
    }

    res.send(new ResponseBuilder(true, "Cliente encontrado com sucesso", cliente))
})

router.post('/', async (req, res) => {
    let cliente = await clienteService.salvarCliente(req.body)

    if (cliente.err) {
        res.send(new ResponseBuilder(false, cliente.err))
    }

    res.send(new ResponseBuilder(true, "Cliente salvo com sucesso", cliente))
})

router.put('/:id', async (req, res) => {
    let cliente = await clienteService.atualizarCliente(req.params.id,req.body)

    if (cliente.err) {
        res.send(new ResponseBuilder(false, cliente.err))
    }

    res.send(new ResponseBuilder(true, "Cliente atualizado com sucesso", cliente))
})

router.delete('/:id', async (req, res) => {
    let cliente = await clienteService.deletarCliente(req.params.id)

    if (cliente.err) {
        res.send(new ResponseBuilder(false, cliente.err))
    }

    res.send(new ResponseBuilder(true, "Cliente deletada com sucesso", cliente))
})

export default router