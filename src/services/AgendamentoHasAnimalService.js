import Agendamento from '../models/Agendamento'
import AgendamentoHasAnimal from '../models/AgendamentoHasAnimal'
import Animal from '../models/Animal'

let service = {}

async function validar(_agendamentoHasAnimal, _acao) {
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

        if(agendamento.clienteId != animalExiste.clienteId){
            return "Animal não pertencente ao responsável do agendamento"
        }
    }

    let agendamentoAnimalRepetido = await AgendamentoHasAnimal.findOne({
        where: {
            agendamentoId: _agendamentoHasAnimal.agendamentoId,
            animalId: _agendamentoHasAnimal.animalId
        }
    })

    if(agendamentoAnimalRepetido){
        return "Animal já vinculado ao agendamento"
    }
}

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        if (limit > 100) {
            limit = 100
        }

        let agendamentosHasAnimals = await AgendamentoHasAnimal.findAll(
            { include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] }
        )

        if (agendamentosHasAnimals.length === 0) {
            return { err: `Nenhum animal de animal de agendamento encontrado` }
        }

        let quantidade = await AgendamentoHasAnimal.count()
        let proximo = false

        if (quantidade > (Number(offset) + agendamentosHasAnimals.length)) {
            proximo = true
        }

        return { obj: agendamentosHasAnimals, proximo: proximo, offset: offset, total: quantidade }
    }
    catch (err) {
        return { err: `Erro ao buscar animais de agendamentoHasAnimal: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let agendamentoHasAnimal = await AgendamentoHasAnimal.findOne({ include: [{ all: true }] }, {
            where: {
                id: _id
            }
        })

        if (!agendamentoHasAnimal) {
            return { err: `Animal de agendamento não encontrado` }
        }

        return agendamentoHasAnimal
    } catch (err) {
        return { err: `Erro ao buscar animal de agendamento: ${err}` }
    }
}

service.buscarPorAgendamento = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let agendamentoHasAnimal = await AgendamentoHasAnimal.findAll({ include: [{ all: true }] }, {
            where: {
                agendamentoId: _id
            }
        })

        if (!agendamentoHasAnimal) {
            return { err: `Animal de agendamento não encontrado` }
        }

        return { obj: agendamentoHasAnimal, proximo: false, offset: 0, total: agendamentoHasAnimal.length }
    } catch (err) {
        return { err: `Erro ao buscar animal de agendamento: ${err}` }
    }
}

service.salvarAgendamentoHasAnimal = async (_agendamentoHasAnimal, offset = 0, limit = 25, order = "ASC") => {
    let inconsistencias = await validar(_agendamentoHasAnimal, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let agendamentoHasAnimalNovo = await AgendamentoHasAnimal.create(_agendamentoHasAnimal)

        return agendamentoHasAnimalNovo
    } catch (err) {
        return { err: `Erro ao salvar animal de agendamento: ${err}` }
    }
}

service.atualizarAgendamentoHasAnimal = async (_id, _agendamentoHasAnimal) => {
    let inconsistencias = await validar(_agendamentoHasAnimal, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
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
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarAgendamentoHasAnimal = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let agendamentoHasAnimalDeletar = await AgendamentoHasAnimal.findOne({
            where: {
                id: _id
            }
        })

        if (!agendamentoHasAnimalDeletar) {
            return { err: `Animal de agendamento não encontrado` }
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
        return { err: `Erro ao deletar animal de agendamento: ${err}` }
    }
}

export default service