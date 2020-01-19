import Agendamento from '../models/Agendamento'
import Cliente from '../models/Cliente'
import Servico from '../models/Servico'

let service = {}

async function validar(_agendamento, _acao) {
    if(!_agendamento.clienteId){
        return "Cliente não informado"
    }else{
        let clienteExiste = await Cliente.findOne({
            where: {
                id: _agendamento.clienteId
            }
        })

        if(!clienteExiste){
            return "Cliente não existente"
        }
    }

    if(!_agendamento.servicoId){
        return "Serviço não informado"
    }else{
        let servicoExiste = await Servico.findOne({
            where: {
                id: _agendamento.servicoId
            }
        })

        if(!servicoExiste){
            return "Serviço não existente"
        }
    }

    if(!_agendamento.dia){
        return "Dia não informado"
    }else{
        if(!['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'].includes(_agendamento.dia)){
            return "Dia inválido"
        }
    }

    if(!_agendamento.horarioInicio){
        return "Horário de início não informado"
    }

    if(!_agendamento.horarioFim){
        return "Horário do fim não informado"
    }
}

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        if (limit > 100) {
            limit = 100
        }

        let agendamentos = await Agendamento.findAll(
            { include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] }
        )

        if (agendamentos.length === 0) {
            return { err: `Nenhum agendamento encontrado` }
        }

        let quantidadeAgendamentos = await Agendamento.count()
        let proximo = false

        if (quantidadeAgendamentos > (Number(offset) + agendamentos.length)) {
            proximo = true
        }

        return { obj: agendamentos, proximo: proximo, offset: offset, total: quantidadeAgendamentos }
    }
    catch (err) {
        return { err: `Erro ao buscar agendamentos: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let agendamento = await Agendamento.findOne({ include: [{ all: true }] }, {
            where: {
                id: _id
            }
        })

        if (!agendamento) {
            return { err: `Agendamento não encontrado` }
        }

        return agendamento
    } catch (err) {
        return { err: `Erro ao buscar agendamento: ${err}` }
    }
}

service.salvarAgendamento = async (_agendamento, offset = 0, limit = 25, order = "ASC") => {
    let inconsistencias = await validar(_agendamento, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let agendamentoNovo = await Agendamento.create(_agendamento)

        return agendamentoNovo
    } catch (err) {
        return { err: `Erro ao salvar agendamento: ${err}` }
    }
}

service.atualizarAgendamento = async (_id, _agendamento) => {
    let inconsistencias = await validar(_agendamento, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
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
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarAgendamento = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let agendamentoDeletar = await Agendamento.findOne({
            where: {
                id: _id
            }
        })

        if (!agendamentoDeletar) {
            return { err: `Agendamento não encontrado` }
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
        return { err: `Erro ao deletar agendamento: ${err}` }
    }
}

export default service