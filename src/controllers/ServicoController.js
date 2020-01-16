import express from "express"
import servicoService from "../services/ServicoService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"

let router = express.Router()
router.use(authMiddleware)

router.get('/', async (req, res) => {
    let servicos = await servicoService.buscarTodos()

    if (servicos.err) {
        res.send(new ResponseBuilder(false, servicos.err))
    }

    res.send(new ResponseBuilder(true, 'Serviços encontrados com sucesso', servicos))
})

router.get('/:id', async (req, res) => {
    let servico = await servicoService.buscarPorId(req.params.id)

    if (servico.err) {
        res.send(new ResponseBuilder(false, servico.err))
    }

    res.send(new ResponseBuilder(true, "Serviço encontrado com sucesso", servico))
})


router.post('/', async (req, res) => {
    let servico = await servicoService.salvarServico(req.body)

    if (servico.err) {
        res.send(new ResponseBuilder(false, servico.err))
    }

    res.send(new ResponseBuilder(true, "Serviço salvo com sucesso", servico))
})

router.put('/:id', async (req, res) => {
    let servico = await servicoService.atualizarServico(req.params.id, req.body)

    if (servico.err) {
        res.send(new ResponseBuilder(false, servico.err))
    }

    res.send(new ResponseBuilder(true, "Serviço atualizado com sucesso", servico))
})

router.delete('/:id', async (req, res) => {
    let servico = await servicoService.deletarServico(req.params.id)

    if (servico.err) {
        res.send(new ResponseBuilder(false, servico.err))
    }

    res.send(new ResponseBuilder(true, "Serviço deletado com sucesso", servico))
})

export default router