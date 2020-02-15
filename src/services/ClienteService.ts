import { Cliente } from '../models/Cliente'
import { Pessoa } from '../models/Pessoa'
import { Endereco } from '../models/Endereco'


export class ClienteService {

    async validar(_cliente, _acao) {
        if (!_cliente.pessoaId) {
            return "Dados pessoais não informados"
        } else {
            let pessoa = await Pessoa.findOne({
                where: {
                    id: _cliente.pessoaId
                }
            })

            if (!pessoa) {
                return "Dados pessoais não encontrados"
            } else if (_acao === 'criacao') {

                let clienteJaExistente = await Cliente.findOne({
                    where: {
                        pessoaId: _cliente.pessoaId
                    }
                })

                if (clienteJaExistente) {
                    return "Cliente já cadastrado"
                }
            }
        }

        if (!_cliente.enderecoId) {
            return "Endereço não informado"
        } else {
            let endereco = await Endereco.findOne({
                where: {
                    id: _cliente.enderecoId
                }
            })

            if (!endereco) {
                return "Endereço não encontrado"
            }
        }

        if (!_cliente.telefonePrincipal) {
            return "Telefone não informado"
        } else {
            let mascara = /[^0-9.]/
            if (mascara.test(_cliente.telefonePrincipal)) {
                return "Telefone inválido"
            }
        }

        if (!_cliente.telefoneAlternativo) {
            return "Telefone alternativo não informado"
        } else {
            let mascara = /[^0-9.]/
            if (mascara.test(_cliente.telefoneAlternativo)) {
                return "Telefone alternativo inválido"
            }
        }

        if (_cliente.telefonePrincipal === _cliente.telefoneAlternativo) {
            return "Os telefones não podem ser iguais"
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let clientes = await Cliente.findAll({ include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] })

            if (clientes.length === 0) {
                throw new TypeError(`Nenhum cliente encontrado`)
            }

            let quantidade = await Cliente.count()
            let proximo = false

            if (quantidade > (Number(offset) + clientes.length)) {
                proximo = true
            }

            return { obj: clientes, proximo: proximo, offset: offset, total: quantidade }
        }
        catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarPorId(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        }

        try {
            let cliente = await Cliente.findOne({
                include: [{ all: true }], where: {
                    id: _id
                }
            })

            if (!cliente) {
                throw new TypeError(`Cliente com ID: ${_id} não encontrado`)
            }

            return cliente
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarCliente(_cliente) {
        let inconsistencias = await this.validar(_cliente, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let clienteNovo = await Cliente.create(_cliente)

            return clienteNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarCliente(_id, _cliente) {
        let inconsistencias = await this.validar(_cliente, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let clienteAtualizado = await Cliente.update({
                enderecoId: _cliente.enderecoId,
                telefonePrincipal: _cliente.telefonePrincipal,
                telefoneAlternativo: _cliente.telefoneAlternativo
            }, {
                where: {
                    id: _id
                }
            })

            return clienteAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarCliente(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let clienteDeletar = await Cliente.findOne({
                where: {
                    id: _id
                }
            })

            if (!clienteDeletar) {
                throw new TypeError(`Cliente com ID: ${_id} não encontrado`)
            }
        }

        try {
            let clienteDeletado = await Cliente.destroy({
                where: {
                    id: _id
                }
            })

            return clienteDeletado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}
