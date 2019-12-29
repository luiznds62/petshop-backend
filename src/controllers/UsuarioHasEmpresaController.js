import express from "express"
import usuarioHasEmpresaService from "../services/UsuarioHasEmpresaService"
import ResponseBuilder from "../common/ResponseBuilder"
const router = express.Router()

router.get('/', async (req, res) => {
    var usuariosHasEmpresa = await usuarioHasEmpresaService.buscarTodos()

    if (usuariosHasEmpresa.err) {
        res.send(new ResponseBuilder(false, usuariosHasEmpresa.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuários vinculados a Empresa buscados com sucesso', usuariosHasEmpresa))
})

router.get('/usuario/:idUsuario', async (req, res) => {
    var usuariosHasEmpresa = await usuarioHasEmpresaService.buscarPorUsuario(req.params.idUsuario)

    if (usuariosHasEmpresa.err) {
        res.send(new ResponseBuilder(false, usuariosHasEmpresa.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuário vinculado a Empresa buscado com sucesso', usuariosHasEmpresa))
})

router.delete('/empresa/:idEmpresa/usuario/:idUsuario', async (req, res) => {
    var usuariosHasEmpresa = await usuarioHasEmpresaService.desvincularUsuarioDeEmpresa(req.params.idEmpresa, req.params.idUsuario)

    if (usuariosHasEmpresa.err) {
        res.send(new ResponseBuilder(false, usuariosHasEmpresa.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuário desvinculado da Empresa buscado com sucesso', usuariosHasEmpresa))
})

router.post('/empresa/:idEmpresa/usuario/:idUsuario', async (req, res) => {
    var usuariosHasEmpresa = await usuarioHasEmpresaService.vincularUsuarioDeEmpresa(req.params.idEmpresa, req.params.idUsuario)

    if (usuariosHasEmpresa.err) {
        res.send(new ResponseBuilder(false, usuariosHasEmpresa.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuário vinculado da Empresa buscado com sucesso', usuariosHasEmpresa))
})

router.post('/', async (req, res) => {
    let usuarioHasEmpresa = await usuarioHasEmpresaService.salvarUsuarioHasEmpresa(req.body)

    if (usuarioHasEmpresa.err) {
        res.send(new ResponseBuilder(false, usuarioHasEmpresa.err, []))
    }

    res.send(new ResponseBuilder(true, 'Usuário has Empresa salvo com sucesso', usuarioHasEmpresa))
})

export default router