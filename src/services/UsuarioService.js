import Usuario from '../models/Usuario'
import ResponseBuilder from '../common/ResponseBuilder'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.json'

let service = {}

function gerarToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

async function buscarPorEmail(_email) {
    return Usuario.findOne({
        where: {
            email: _email
        }
    })
}

async function buscarPorLogin(_login) {
    return Usuario.findOne({
        where: {
            login: _login
        }
    })
}

async function validar(_usuario) {
    if (!_usuario.login) {
        return "Login não informado"
    }
    if (!_usuario.senha) {
        return "Senha não informada"
    }
    if (_usuario.senha.length < 8) {
        return "A senha precisa conter no mínimo 8 caractéres"
    }
    if (!_usuario.email) {
        return "Email não informado"
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_usuario.email))) {
        return "Email inválido"
    }

    if (await buscarPorLogin(_usuario.login) != null) {
        return "Login já utilizado"
    }

    if (await buscarPorEmail(_usuario.email) != null) {
        return "Email já utilizado"
    }
}

service.buscarTodos = async () => {
    try {
        let usuarios = await Usuario.findAll()

        if (!usuarios) {
            return { err: 'Nenhum usuário encontrado' }
        }

        return usuarios
    }
    catch (err) {
        return { err: `Erro ao buscar usuários: ${err}` }
    }
}

service.salvarUsuario = async (_usuario) => {
    var insconsistencias = await validar(_usuario)

    if (insconsistencias) {
        return { err: insconsistencias }
    }

    try {
        let usuarioNovo = await Usuario.create(_usuario)
        return usuarioNovo
    }
    catch (err) {
        return { err: `Erro ao criar usuário: ${err}` }
    }
}

service.autenticar = async (_autentica) => {
    try {
        var auth = _autentica

        if (!auth.login) {
            return { err: `Login não informado` }
        }

        if (!auth.senha) {
            return { err: `Senha não informada` }
        }

        let usuario = await buscarPorLogin(auth.login)

        if (!usuario) {
            return { err: `Usuário não encontrado` }
        }

        if (usuario.senha != auth.senha) {
            return { err: `Senha inválida` }
        }

        return { usuario, token: gerarToken({ id: usuario.id }) }
    } catch (err) {
        return { err: `Erro ao autenticar: ${err}` }
    }
}

export default service