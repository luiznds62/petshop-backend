import { Contrato } from "../models/Contrato"
import { Cliente } from "../models/Cliente"
import { TipoContrato } from "../models/TipoContrato"
import { Servico } from "../models/Servico"
import { ValidadorData } from '../common/ValidadorDatas'

let validadorDatas = new ValidadorData()
export class ContratoService {
    async validar(_contrato, _acao) {
        if (_acao === 'criacao') {
            if (!_contrato.clienteId) {
                return "Cliente não informado"
            } else {
                let clienteExiste = await Cliente.findOne({
                    where: {
                        id: _contrato.clienteId
                    }
                })

                if (!clienteExiste) {
                    return "Cliente não existente"
                }
            }
        }

        if (!_contrato.tipoContratoId) {
            return "Tipo de contrato não informado"
        } else {
            let tipoContratoExiste = await TipoContrato.findOne({
                where: {
                    id: _contrato.tipoContratoId
                }
            })

            if (!tipoContratoExiste) {
                return "Tipo de contrato não existente"
            }
        }

        if (!_contrato.servicoId) {
            return "Serviço não informado"
        } else {
            let servicoExiste = await Servico.findOne({
                where: {
                    id: _contrato.servicoId
                }
            })

            if (!servicoExiste) {
                return "Serviço não existente"
            }
        }

        if (!_contrato.dataInicial) {
            return "Data inicial não informada"
        } else {
            if (!validadorDatas.validarData(_contrato.dataInicial)) {
                return "Data inicial inválida"
            }
        }

        if (!_contrato.dataFinal) {
            return "Data final não informada"
        } else {
            if (!validadorDatas.validarData(_contrato.dataFinal)) {
                return "Data final inválida"
            }
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let contratos = await Contrato.findAll({ include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] })

            if (contratos.length === 0) {
                throw new TypeError(`Nenhuma contrato encontrado`)
            }

            let quantidade = await Contrato.count()
            let proximo = false

            if (quantidade > (Number(offset) + contratos.length)) {
                proximo = true
            }

            return { obj: contratos, proximo: proximo, offset: offset, total: quantidade }
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
            let contrato = await Contrato.findOne({
                where: {
                    id: _id
                }
            })

            if (!contrato) {
                throw new TypeError(`Contrato não encontrado`)
            }

            return contrato
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarPorCliente(_id, offset = 0, limit = 25, order = "ASC") {
        if (!_id) {
            throw new TypeError("ID não informado")
        }

        try {
            let contrato = await Contrato.findOne({
                include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]],
                where: {
                    clienteId: _id
                }
            })

            if (!contrato) {
                throw new TypeError(`Contrato não encontrado`)
            }

            return contrato
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarContrato(_contrato) {
        let inconsistencias = await this.validar(_contrato, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let contratoNovo = await Contrato.create(_contrato)

            return contratoNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarContrato(_id, _contrato) {
        let inconsistencias = await this.validar(_contrato, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let contratoAtualizado = await Contrato.update({
                tipoContratoId: _contrato.tipoContratoId,
                servicoId: _contrato.servicoId,
                observacao: _contrato.observacao,
                dataInicial: _contrato.dataInicial,
                dataFinal: _contrato.dataFinal
            }, {
                where: {
                    id: _id
                }
            })

            return contratoAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarContrato(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let contratoDeletar = await Contrato.findOne({
                where: {
                    id: _id
                }
            })

            if (!contratoDeletar) {
                throw new TypeError(`Contrato não encontrado`)
            }
        }

        try {
            let contratoDeletado = await Contrato.destroy({
                where: {
                    id: _id
                }
            })

            return contratoDeletado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}
