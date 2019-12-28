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

router.post('/', async (req, res) => {
    let usuario = await usuarioService.salvarUsuario(req.body)

    if (usuario.err) {
        res.send(new ResponseBuilder(false, usuario.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuário salvo com sucesso', usuario))
})

router.post('/autenticar', async (req, res) => {
    let autenticacao = await usuarioService.autenticar(req.body)

    if (autenticacao.err) {
        res.send(new ResponseBuilder(false, autenticacao.err, []))
    }
    
    res.send(new ResponseBuilder(true, 'Autenticado com sucesso', autenticacao))
})

export default router