import { Agendamento } from '../models/Agendamento'
import { AgendamentoHasAnimal } from '../models/AgendamentoHasAnimal'
import { Animal } from '../models/Animal'

export class AgendamentoHasAnimalService {
    async validar(_agendamentoHasAnimal, _acao) {
        if (!_agendamentoHasAnimal.agendamentoId) {
            return "Agendamento não informado"
        } else {
            let agendamentoExiste = await Agendamento.findOne({
                where: {
                    id: _agendamentoHasAnimal.agendamentoId
                }
            })

            if (!agendamentoExiste) {
                return "Agendamento não existente"
            }
        }

        if (!_agendamentoHasAnimal.animalId) {
            return "Animal não informado"
        } else {
            let animalExiste = await Animal.findOne({
                where: {
                    id: _agendamentoHasAnimal.animalId
                }
            })

            if (!animalExiste) {
                return "Animal não existente"
            }

            let agendamento = await Agendamento.findOne({
                where: {
                    id: _agendamentoHasAnimal.agendamentoId
                }
            })

            if (agendamento.clienteId != animalExiste.clienteId) {
                return "Animal não pertencente ao responsável do agendamento"
            }
        }

        let agendamentoAnimalRepetido = await AgendamentoHasAnimal.findOne({
            where: {
                agendamentoId: _agendamentoHasAnimal.agendamentoId,
                animalId: _agendamentoHasAnimal.animalId
            }
        })

        if (agendamentoAnimalRepetido) {
            return "Animal já vinculado ao agendamento"
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            if (limit > 100) {
                limit = 100
            }

            let agendamentosHasAnimals = await AgendamentoHasAnimal.findAll(
                { include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] }
            )

            if (agendamentosHasAnimals.length === 0) {
                throw new TypeError(`Nenhum animal de animal de agendamento encontrado`)
            }

            let quantidade = await AgendamentoHasAnimal.count()
            let proximo = false

            if (quantidade > (Number(offset) + agendamentosHasAnimals.length)) {
                proximo = true
            }

            return { obj: agendamentosHasAnimals, proximo: proximo, offset: offset, total: quantidade }
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
            let agendamentoHasAnimal = await AgendamentoHasAnimal.findOne({
                include: [{ all: true }], where: {
                    id: _id
                }
            })

            if (!agendamentoHasAnimal) {
                throw new TypeError(`Animal de agendamento não encontrado`)
            }

            return agendamentoHasAnimal
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarPorAgendamento(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        }

        try {
            let agendamentoHasAnimal = await AgendamentoHasAnimal.findAll({
                include: [{ all: true }], where: {
                    agendamentoId: _id
                }
            })

            if (!agendamentoHasAnimal) {
                throw new TypeError(`Animal de agendamento não encontrado`)
            }

            return { obj: agendamentoHasAnimal, proximo: false, offset: 0, total: agendamentoHasAnimal.length }
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarAgendamentoHasAnimal(_agendamentoHasAnimal, offset = 0, limit = 25, order = "ASC") {
        let inconsistencias = await this.validar(_agendamentoHasAnimal, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let agendamentoHasAnimalNovo = await AgendamentoHasAnimal.create(_agendamentoHasAnimal)

            return agendamentoHasAnimalNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarAgendamentoHasAnimal(_id, _agendamentoHasAnimal) {
        let inconsistencias = await this.validar(_agendamentoHasAnimal, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let agendamentoHasAnimalAtualizado = await AgendamentoHasAnimal.update({
                agendamentoId: _agendamentoHasAnimal.agendamentoId,
                animalId: _agendamentoHasAnimal.animalId
            }, {
                where: {
                    id: _id
                }
            })

            return agendamentoHasAnimalAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarAgendamentoHasAnimal(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let agendamentoHasAnimalDeletar = await AgendamentoHasAnimal.findOne({
                where: {
                    id: _id
                }
            })

            if (!agendamentoHasAnimalDeletar) {
                throw new TypeError(`Animal de agendamento não encontrado`)
            }
        }

        try {
            let agendamentoHasAnimalAtualizado = await AgendamentoHasAnimal.destroy({
                where: {
                    id: _id
                }
            })

            return agendamentoHasAnimalAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}

