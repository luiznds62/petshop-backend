import { UsuarioHasEmpresa } from '../models/UsuarioHasEmpresa'
import { Usuario } from '../models/Usuario'
import { Empresa } from '../models/Empresa'

export class UsuarioHasEmpresaService {
    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let usuarioHasEmpresas = await UsuarioHasEmpresa.findAll({ include: [{ all: true }], offset: offset, limit: limit, order: [['id', order]] })

            if (usuarioHasEmpresas.length === 0) {
                throw new TypeError(`Nenhuma usuário vinculado a empresa encontrado`)
            }

            let qtd = await UsuarioHasEmpresa.count()
            let proximo = false

            if (qtd > (Number(offset) + usuarioHasEmpresas.length)) {
                proximo = true
            }

            return { obj: usuarioHasEmpresas, proximo: proximo, offset: offset, total: qtd }
        }
        catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarUsuarioHasEmpresa(_usuarioHasEmpresa) {
        if (!_usuarioHasEmpresa.usuarioId) {
            throw new TypeError("Usuário não informado")
        } else {
            let usuario = await Usuario.findOne({
                where: {
                    id: _usuarioHasEmpresa.usuarioId
                }
            })

            if (usuario === null) {
                throw new TypeError("Usuário não encontrado")
            }
        }

        if (!_usuarioHasEmpresa.empresaId) {
            throw new TypeError("Empresa não informada")
        } else {
            let empresa = await Empresa.findOne({
                where: {
                    id: _usuarioHasEmpresa.empresaId
                }
            })

            if (empresa === null) {
                throw new TypeError("Empresa não encontrada")
            }
        }

        if (!_usuarioHasEmpresa.perfil) {
            throw new TypeError("Perfil de usuário não informado")
        }

        try {
            let usuarioHasEmpresaNovo = await UsuarioHasEmpresa.create(_usuarioHasEmpresa)

            return usuarioHasEmpresaNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async vincularUsuarioDeEmpresa(_empresaId, _usuarioId) {
        if (!_usuarioId) {
            throw new TypeError("ID do usuário não informado")
        } else {
            let usuario = await Usuario.findOne({
                where: {
                    id: _usuarioId
                }
            })

            if (!usuario) {
                throw new TypeError(`Usuário com ID: ${_usuarioId} não encontrado`)
            }
        }

        if (!_empresaId) {
            throw new TypeError("Id da empresa não informado")
        } else {
            let empresa = await Empresa.findOne({
                where: {
                    id: _empresaId
                }
            })

            if (!empresa) {
                throw new TypeError(`Empresa com ID: ${_empresaId} não encontrada`)
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
            throw new TypeError(`${err.message}`)
        }
    }


    async desvincularUsuarioDeEmpresa(_empresaId, _usuarioId) {
        if (!_usuarioId) {
            throw new TypeError("ID do usuário não informado")
        } else {
            let usuario = await Usuario.findOne({
                where: {
                    id: _usuarioId
                }
            })

            if (!usuario) {
                throw new TypeError(`Usuário com ID: ${_usuarioId} não encontrado`)
            }
        }

        if (!_empresaId) {
            throw new TypeError("Id da empresa não informado")
        } else {
            let empresa = await Empresa.findOne({
                where: {
                    id: _empresaId
                }
            })

            if (!empresa) {
                throw new TypeError(`Empresa com ID: ${_empresaId} não encontrada`)
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
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarPorUsuario(_usuarioId, offset = 0, limit = 25, order = "ASC") {
        if (!_usuarioId) {
            throw new TypeError("ID do Usuário não informado")
        }

        try {
            let usuarioHasEmpresa = await UsuarioHasEmpresa.findAll({
                include: [{ all: true }], offset: offset, limit: limit, order: [['id', order]],
                where: {
                    usuarioId: _usuarioId
                }
            })

            if (!usuarioHasEmpresa) {
                throw new TypeError(`Vinculo de Usuário com Empresa não encontrado para o usuarioId: ${_usuarioId}`)
            }

            return usuarioHasEmpresa
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}
