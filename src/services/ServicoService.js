import Servico from '../models/Servico'

let service = {}

async function validar(_servico, _acao) {
    if (!_servico.nome) {
        return "Nome não informado"
    }

    if (!_servico.valor) {
        return "Valor não informado"
    } else {
        let mascara = /^[0-9.,]+$/
        if (!mascara.test(_servico.valor)) {
            return "Valor inválido"
        }
    }

    if (_servico.tempoMedioAtendimento) {
        let mascara = /^[0-9.,]+$/
        if (!mascara.test(_servico.tempoMedioAtendimento)) {
            return "Tempo médio de atendimento inválido"
        }
    }
}

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        let servicos = await Servico.findAll({ limit: limit, offset: offset, order: [['id',order]]})

        if (servicos.length === 0) {
            return { err: `Nenhum serviço encontrado` }
        }

        let quantidade = await Servico.count()
        let proximo = false

        if (quantidade > (Number(offset) + servicos.length)) {
            proximo = true
        }

        return { obj: servicos, proximo: proximo, offset: offset, total: quantidade }
    }
    catch (err) {
        return { err: `Erro ao buscar serviços: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let servico = await Servico.findOne({
            where: {
                id: _id
            }
        })

        if (!servico) {
            return { err: `Serviço não encontrado` }
        }

        return servico
    } catch (err) {
        return { err: `Erro ao buscar serviço: ${err}` }
    }
}

service.salvarServico = async (_servico) => {
    let inconsistencias = await validar(_servico, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let servicoNovo = await Servico.create(_servico)

        return servicoNovo
    } catch (err) {
        return { err: `Erro ao salvar serviço: ${err}` }
    }
}

service.atualizarServico = async (_id, _servico) => {
    let inconsistencias = await validar(_servico, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let servicoAtualizado = await Servico.update({
            nome: _servico.nome,
            valor: _servico.valor,
            tempoMedioAtendimento: _servico.tempoMedioAtendimento
        }, {
            where: {
                id: _id
            }
        })

        return servicoAtualizado
    } catch (err) {
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarServico = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let servicoDeletar = await Servico.findOne({
            where: {
                id: _id
            }
        })

        if (!servicoDeletar) {
            return { err: `Serviço não encontrado` }
        }
    }

    try {
        let servicoDeletado = await Servico.destroy({
            where: {
                id: _id
            }
        })

        return servicoDeletado
    } catch (err) {
        return { err: `Erro ao deletar serviço: ${err}` }
    }
}

export default service