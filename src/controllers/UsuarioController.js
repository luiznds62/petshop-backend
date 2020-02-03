import express from "express"
import usuarioService from "../services/UsuarioService"
import ResponseBuilder from "../common/ResponseBuilder"
const router = express.Router()

router.get('/', async (req, res) => {
    var usuarios = await usuarioService.buscarTodos(req, res)

    if (usuarios.err) {
        res.send(new ResponseBuilder(false, usuarios.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuários buscados com sucesso', usuarios))
})

router.get('/:login', async (req, res) => {
    var usuario = await usuarioService.buscarPorLogin(req.params.login)

    if (usuario.err) {
        res.send(new ResponseBuilder(false, usuario.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuário buscado com sucesso', usuario))
})

router.post('/', async (req, res) => {
    let usuario = await usuarioService.salvarUsuario(req.body)

    if (usuario.err) {
        res.send(new ResponseBuilder(false, usuario.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuário salvo com sucesso', usuario))
})

router.post('/trocarsenha', async (req, res) => {
    let usuario = await usuarioService.trocarSenha(req.body)

    if (usuario.err) {
        res.send(new ResponseBuilder(false, usuario.err, []))
    }

    res.send(new ResponseBuilder(true, 'Senha alterada com sucesso', usuario))
})

router.post('/esquecisenha', async (req, res) => {
    let gerouToken = await usuarioService.gerarTokenSenha(req.body.email)

    if (gerouToken.err) {
        res.send(new ResponseBuilder(false, gerouToken.err, []))
    }

    res.send(new ResponseBuilder(true, 'Token gerado e enviado ao email', gerouToken))
})

router.post('/resetarsenha', async (req, res) => {
    let senhaResetada = await usuarioService.resetarSenha(req.body.email,req.body.senha,req.body.token)

    if (senhaResetada.err) {
        res.send(new ResponseBuilder(false, senhaResetada.err, []))
    }

    res.send(new ResponseBuilder(true, 'Senha resetada com sucesso', senhaResetada))
})

router.post('/autenticar', async (req, res) => {
    let autenticacao = await usuarioService.autenticar(req.body)

    if (autenticacao.err) {
        res.send(new ResponseBuilder(false, autenticacao.err, []))
    }
    
    res.send(new ResponseBuilder(true, 'Autenticado com sucesso', autenticacao))
})

export default router