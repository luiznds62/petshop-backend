import UsuarioHasEmpresa from '../models/UsuarioHasEmpresa'
import Usuario from '../models/Usuario'
import Empresa from '../models/Empresa'

let service = {}

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        let usuarioHasEmpresas = await UsuarioHasEmpresa.findAll({ include: [{ all: true }], offset: offset, limit: limit, order: [['id', order]] })

        if (usuarioHasEmpresas.length === 0) {
            return { err: `Nenhuma usuário vinculado a empresa encontrado` }
        }

        let qtd = await UsuarioHasEmpresa.count()
        let proximo = false

        if (qtd > (Number(offset) + usuarioHasEmpresas.length)) {
            proximo = true
        }

        return { obj: usuarioHasEmpresas, proximo: proximo, offset: offset, total: qtd }
    }
    catch (err) {
        return { err: `Erro ao buscar Usuário vinculado a Empresa: ${err}` }
    }
}

service.salvarUsuarioHasEmpresa = async (_usuarioHasEmpresa) => {
    if (!_usuarioHasEmpresa.usuarioId) {
        return { err: "Usuário não informado" }
    } else {
        let usuario = await Usuario.findOne({
            where: {
                id: _usuarioHasEmpresa.usuarioId
            }
        })

        if (usuario === null) {
            return { err: "Usuário não encontrado" }
        }
    }

    if (!_usuarioHasEmpresa.empresaId) {
        return { err: "Empresa não informada" }
    } else {
        let empresa = await Empresa.findOne({
            where: {
                id: _usuarioHasEmpresa.empresaId
            }
        })

        if (empresa === null) {
            return { err: "Empresa não encontrada" }
        }
    }

    if (!_usuarioHasEmpresa.perfil) {
        return { err: "Perfil de usuário não informado" }
    }

    try {
        let usuarioHasEmpresaNovo = await UsuarioHasEmpresa.create(_usuarioHasEmpresa)

        return usuarioHasEmpresaNovo
    } catch (err) {
        return { err: `Ocorreu um erro ao criar vinculo do usuário com a empresa: ${err}` }
    }
}

service.vincularUsuarioDeEmpresa = async (_empresaId, _usuarioId) => {
    if (!_usuarioId) {
        return { err: "ID do usuário não informado" }
    } else {
        let usuario = await Usuario.findOne({
            where: {
                id: _usuarioId
            }
        })

        if (!usuario) {
            return { err: `Usuário com ID: ${_usuarioId} não encontrado` }
        }
    }

    if (!_empresaId) {
        return { err: "Id da empresa não informado" }
    } else {
        let empresa = await Empresa.findOne({
            where: {
                id: _empresaId
            }
        })

        if (!empresa) {
            return { err: `Empresa com ID: ${_empresaId} não encontrada` }
        }
    }

    try {
        let usuarioHasEmpresaAtualizar = await UsuarioHasEmpresa.update({
            habilitado: true
        }, {
            where: {
                usuarioId: _usuarioId,
                empresaId: _empresaId
            }
        })

        return usuarioHasEmpresaAtualizar
    } catch (err) {
        return { err: `Ocorreu um erro ao habilitar usuário da empresa: ${err}` }
    }
}

service.desvincularUsuarioDeEmpresa = async (_empresaId, _usuarioId) => {
    if (!_usuarioId) {
        return { err: "ID do usuário não informado" }
    } else {
        let usuario = await Usuario.findOne({
            where: {
                id: _usuarioId
            }
        })

        if (!usuario) {
            return { err: `Usuário com ID: ${_usuarioId} não encontrado` }
        }
    }

    if (!_empresaId) {
        return { err: "Id da empresa não informado" }
    } else {
        let empresa = await Empresa.findOne({
            where: {
                id: _empresaId
            }
        })

        if (!empresa) {
            return { err: `Empresa com ID: ${_empresaId} não encontrada` }
        }
    }

    try {
        let usuarioHasEmpresaAtualizar = await UsuarioHasEmpresa.update({
            habilitado: false
        }, {
            where: {
                usuarioId: _usuarioId,
                empresaId: _empresaId
            }
        })

        return usuarioHasEmpresaAtualizar
    } catch (err) {
        return { err: `Ocorreu um erro ao desabilitar usuário da empresa: ${err}` }
    }
}

service.buscarPorUsuario = async (_usuarioId) => {
    if (!_usuarioId) {
        return { err: "ID do Usuário não informado" }
    }

    try {
        let usuarioHasEmpresa = await UsuarioHasEmpresa.findOne({
            where: {
                usuarioId: _usuarioId
            }
        })

        if (!usuarioHasEmpresa) {
            return { err: `Vinculo de Usuário com Empresa não encontrado para o usuarioId: ${_usuarioId}` }
        }

        return usuarioHasEmpresa
    } catch (err) {
        return { err: `Ocorreu um erro ao buscar: ${err}` }
    }
}

export default service