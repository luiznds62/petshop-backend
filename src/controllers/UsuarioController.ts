import * as express from "express"
import { UsuarioService } from "../services/UsuarioService"
import { ResponseBuilder } from "../common/ResponseBuilder"
const router = express.Router()

let usuarioService = new UsuarioService()

router.get('/:login', async (req, res) => {
    try {
        var usuario = await usuarioService.buscarPorLogin(req.params.login)
        res.send(new ResponseBuilder(true, 'Usuário buscado com sucesso', usuario))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/', async (req, res) => {
    try {
        let usuario = await usuarioService.salvarUsuario(req.body)
        res.send(new ResponseBuilder(true, 'Usuário salvo com sucesso', usuario))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/trocarsenha', async (req, res) => {
    try {
        let usuario = await usuarioService.trocarSenha(req.body)
        res.send(new ResponseBuilder(true, 'Senha alterada com sucesso', usuario))

    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/esquecisenha', async (req, res) => {
    try {
        let gerouToken = await usuarioService.gerarTokenSenha(req.body.email)
        res.send(new ResponseBuilder(true, 'Token gerado e enviado ao email', gerouToken))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/resetarsenha', async (req, res) => {
    try {
        let senhaResetada = await usuarioService.resetarSenha(req.body.email, req.body.senha, req.body.token)
        res.send(new ResponseBuilder(true, 'Senha resetada com sucesso', senhaResetada))
    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

router.post('/autenticar', async (req, res) => {
    try {
        let autenticacao = await usuarioService.autenticar(req.body)
        res.send(new ResponseBuilder(true, 'Autenticado com sucesso', autenticacao))

    } catch (error) {
        res.send(new ResponseBuilder(false, error.message))
    }
})

export default router