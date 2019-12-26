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

    if (await buscarPorEmail(_usuario.email) != null) {
        return "Email já utilizado"
    }

    if (await buscarPorLogin(_usuario.login) != null) {
        return "Login já utilizado"
    }
}

service.buscarTodos = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll()
        return new ResponseBuilder(true, "Enviando usuários", usuarios)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao buscar usuários: ${err}`)
    }
}

service.salvarUsuario = async (req, res) => {
    var insconsistencias = await validar(req.body)

    if (insconsistencias) {
        return new ResponseBuilder(false, insconsistencias)
    }

    try {
        let usuarioNovo = await Usuario.create(req.body)
        return new ResponseBuilder(true, "Criado usuário", usuarioNovo)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao criar usuário: ${err}`, [])
    }
}

service.autenticar = async (req, res) => {
    try {
        var auth = req.body

        if (!auth.login) {
            return new ResponseBuilder(false, `Login não informado`, [])
        }

        if (!auth.senha) {
            return new ResponseBuilder(false, `Senha não informada`, [])
        }

        let usuarioBanco = await buscarPorLogin(auth.login)

        if (!usuarioBanco) {
            return new ResponseBuilder(false, `Usuário não encontrado`, [])
        }

        if (usuarioBanco.senha != auth.senha) {
            return new ResponseBuilder(false, `Senha inválida`, [])
        }

        return new ResponseBuilder(true, `Autenticado com sucesso`, { 
            usuarioBanco, token: gerarToken({ id: usuarioBanco.id }) 
        })
    } catch (err) {
        return new ResponseBuilder(false, `Erro ao autenticar: ${err}`, [])
    }
}

export default service