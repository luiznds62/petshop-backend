import Usuario from '../models/Usuario'
import emailService from './EmailService'
import jwt from 'jsonwebtoken'
import authConfig from '../../config/auth.json'
import crypto from 'crypto'
import html from '../../config/email/templateResetEmail'

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

service.trocarSenha = async (_dados) => {
    if (!_dados.login) {
        return { err: "Usuário não informado" }
    }
    if (!_dados.senhaAntiga) {
        return { err: "Senha antiga não informada" }
    } else {
        let usuarioExiste = await Usuario.findOne({
            where: {
                login: _dados.login
            }
        })

        if (usuarioExiste.senha != _dados.senhaAntiga) {
            return { err: "Senha antiga inválida" }
        }
    }

    if (!_dados.senhaNova) {
        return { err: "Nova senha não informada" }
    } else {
        if (_dados.senhaNova.length < 8) {
            return { err: "A nova senha precisa conter no mínimo 8 caractéres" }
        }
    }

    try {
        let usuarioAlterado = await Usuario.update({
            senha: _dados.senhaNova
        }, {
            where: {
                login: _dados.login
            }
        })

        return usuarioAlterado
    } catch (error) {
        return { err: "Ocorreu um erro ao alterar" }
    }
}

service.resetarSenha = async (_email, _senha, _token) => {
    if (!_senha) {
        return { err: "Nova senha não informada" }
    }
    if (!_token) {
        return { err: "Token não informado" }
    }
    if (!_email) {
        return { err: "Email não informado" }
    } else {
        let usuarioExiste = await Usuario.findOne({
            where: {
                email: _email
            }
        })

        if (!usuarioExiste) {
            return { err: "Nenhum usuário encontrado para o email informado" }
        }

        let agora = new Date()

        if (agora > usuarioExiste.expiracaoToken) {
            return { err: "Token expirado" }
        }

        if (_token != usuarioExiste.tokenResetarSenha) {
            return { err: "Token inválido" }
        }

        let usuarioAlterado = await Usuario.update({
            senha: _senha
        }, {
            where: {
                email: _email
            }
        })

        return usuarioAlterado
    }
}

service.gerarTokenSenha = async (_email) => {
    if (!_email) {
        return { err: "Email não informado" }
    } else {
        let usuarioExiste = await Usuario.findOne({
            where: {
                email: _email
            }
        })

        if (!usuarioExiste) {
            return { err: "Nenhum usuário contém o email informado" }
        }

        let token = crypto.randomBytes(20).toString('hex');
        let agora = new Date();
        agora.setHours(agora.getHours() + 1);

        try {
            await Usuario.update({
                tokenResetarSenha: token,
                expiracaoToken: agora
            }, {
                where: {
                    email: _email
                }
            })
        } catch (error) {
            return { err: "Ocorreu um erro interno" }
        }

        emailService.enviarEmail('luiznds62@gmail.com',
            _email,
            "Resetar Senha Petshop",
            `Olá, tudo bem?
            Utilize este token para resetar sua senha: ${token}`, html(token))

        return []
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

service.buscarPorLogin = async (_login) => {
    try {
        let usuario = await Usuario.findOne({
            where: {
                login: _login
            }
        })

        if (!usuario) {
            return { err: 'Nenhum usuário encontrado' }
        }

        let usuarioRetorno = {
            id: usuario.id,
            email: usuario.email,
            createdAt: usuario.createdAt,
            updatedAt: usuario.updatedAt
        }

        return usuarioRetorno
    }
    catch (err) {
        return { err: `Erro ao buscar usuário: ${err}` }
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

        let usuarioBanco = await buscarPorLogin(auth.login)

        if (!usuarioBanco) {
            return { err: `Usuário não encontrado` }
        }

        if (usuarioBanco.senha != auth.senha) {
            return { err: `Senha inválida` }
        }

        let usuario = {
            id: usuarioBanco.id,
            login: usuarioBanco.login,
            email: usuarioBanco.email,
            createdAt: usuarioBanco.createdAt,
            updatedAt: usuarioBanco.updatedAt
        }

        return { usuario, token: gerarToken({ id: usuarioBanco.id }) }
    } catch (err) {
        return { err: `Erro ao autenticar: ${err}` }
    }
}

export default service