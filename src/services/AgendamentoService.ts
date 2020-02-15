import { Agendamento } from '../models/Agendamento'
import { Cliente } from '../models/Cliente'
import { Servico } from '../models/Servico'

export class AgendamentoService {
    async validar(_agendamento, _acao) {
        if (!_agendamento.clienteId) {
            return "Cliente não informado"
        } else {
            let clienteExiste = await Cliente.findOne({
                where: {
                    id: _agendamento.clienteId
                }
            })

            if (!clienteExiste) {
                return "Cliente não existente"
            }
        }

        if (!_agendamento.servicoId) {
            return "Serviço não informado"
        } else {
            let servicoExiste = await Servico.findOne({
                where: {
                    id: _agendamento.servicoId
                }
            })

            if (!servicoExiste) {
                return "Serviço não existente"
            }
        }

        if (!_agendamento.dia) {
            return "Dia não informado"
        } else {
            if (!['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'].includes(_agendamento.dia)) {
                return "Dia inválido"
            }
        }

        if (!_agendamento.horarioInicio) {
            return "Horário de início não informado"
        }

        if (!_agendamento.horarioFim) {
            return "Horário do fim não informado"
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            if (limit > 100) {
                limit = 100
            }

            let agendamentos = await Agendamento.findAll(
                { include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] }
            )

            if (agendamentos.length === 0) {
                throw new TypeError(`Nenhum agendamento encontrado`)
            }

            let quantidadeAgendamentos = await Agendamento.count()
            let proximo = false

            if (quantidadeAgendamentos > (Number(offset) + agendamentos.length)) {
                proximo = true
            }

            return { obj: agendamentos, proximo: proximo, offset: offset, total: quantidadeAgendamentos }
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
            let agendamento = await Agendamento.findOne({
                include: [{ all: true }], where: {
                    id: _id
                }
            })

            if (!agendamento) {
                throw new TypeError(`Agendamento não encontrado`)
            }

            return agendamento
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarAgendamento(_agendamento, offset = 0, limit = 25, order = "ASC") {
        let inconsistencias = await this.validar(_agendamento, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let agendamentoNovo = await Agendamento.create(_agendamento)

            return agendamentoNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarAgendamento(_id, _agendamento) {
        let inconsistencias = await this.validar(_agendamento, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let animalAtualizado = await Agendamento.update({
                clienteId: _agendamento.nome,
                servicoId: _agendamento.dataNascimento,
                dia: _agendamento.dia,
                horarioInicio: _agendamento.horarioInicio,
                horarioFim: _agendamento.horarioFim,
                observacao: _agendamento.observacao
            }, {
                where: {
                    id: _id
                }
            })

            return animalAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarAgendamento(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let agendamentoDeletar = await Agendamento.findOne({
                where: {
                    id: _id
                }
            })

            if (!agendamentoDeletar) {
                throw new TypeError(`Agendamento não encontrado`)
            }
        }

        try {
            let agendamentoAtualizado = await Agendamento.destroy({
                where: {
                    id: _id
                }
            })

            return agendamentoAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}
