import UsuarioHasEmpresa from '../models/UsuarioHasEmpresa'
import Usuario from '../models/Usuario'
import Empresa from '../models/Empresa'

let service = {}

service.buscarTodos = async (req, res) => {
    try {
        let usuarioHasEmpresas = await UsuarioHasEmpresa.findAll()

        if (usuarioHasEmpresas.length === 0) {
            return { err: `Nenhuma usuário vinculado a empresa encontrado` }
        }

        return usuarioHasEmpresas
    }
    catch (err) {
        return { err: `Erro ao buscar Usuário vinculado a Empresa: ${err}` }
    }
}

service.salvarUsuarioHasEmpresa = async (_usuarioHasEmpresa) => {
    if (!_usuarioHasEmpresa.idUsuario) {
        return { err: "Usuário não informado" }
    } else {
        let usuario = await Usuario.findOne({
            where: {
                id: _usuarioHasEmpresa.idUsuario
            }
        })

        if (usuario === null) {
            return { err: "Usuário não encontrado" }
        }
    }

    if (!_usuarioHasEmpresa.idEmpresa) {
        return { err: "Empresa não informada" }
    } else {
        let empresa = await Empresa.findOne({
            where: {
                id: _usuarioHasEmpresa.idEmpresa
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

service.buscarPorUsuario = async (_idUsuario) => {
    if (!_idUsuario) {
        return { err: "ID do Usuário não informado" }
    }

    try {
        let usuarioHasEmpresa = await UsuarioHasEmpresa.findOne({
            where: {
                idUsuario: _idUsuario
            }
        })

        if (!usuarioHasEmpresa) {
            return { err: `Vinculo de Usuário com Empresa não encontrado para o idUsuario: ${_idUsuario}` }
        }

        return usuarioHasEmpresa
    } catch (err) {
        return { err: `Ocorreu um erro ao buscar: ${err}` }
    }
}

export default service