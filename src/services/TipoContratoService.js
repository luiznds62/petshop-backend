import TipoContrato from '../models/TipoContrato'

let service = {}

async function validar(_tipoContrato, _acao) {
    if (!_tipoContrato.nome) {
        return "Nome não informado"
    }
}

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        let tipoContratos = await TipoContrato.findAll({ limit: limit, offset: offset, order: [['id',order]]})

        if (tipoContratos.length === 0) {
            return { err: `Nenhum tipo de contrato encontrado` }
        }

        let quantidade = await TipoContrato.count()
        let proximo = false

        if (quantidade > (Number(offset) + tipoContratos.length)) {
            proximo = true
        }

        return { obj: tipoContratos, proximo: proximo, offset: offset, total: quantidade }
    }
    catch (err) {
        return { err: `Erro ao buscar tipo de contratos: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let tipoContrato = await TipoContrato.findOne({
            where: {
                id: _id
            }
        })

        if (!tipoContrato) {
            return { err: `Tipo de contrato não encontrado` }
        }

        return tipoContrato
    } catch (err) {
        return { err: `Erro ao buscar tipo de contrato: ${err}` }
    }
}

service.salvarTipoContrato = async (_tipoContrato) => {
    let inconsistencias = await validar(_tipoContrato, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let tipoContratoNovo = await TipoContrato.create(_tipoContrato)

        return tipoContratoNovo
    } catch (err) {
        return { err: `Erro ao salvar tipo de contrato: ${err}` }
    }
}

service.atualizarTipoContrato = async (_id, _tipoContrato) => {
    let inconsistencias = await validar(_tipoContrato, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let tipoContratoAtualizado = await TipoContrato.update({
            nome: _tipoContrato.nome,
            descricao: _tipoContrato.descricao
        }, {
            where: {
                id: _id
            }
        })

        return tipoContratoAtualizado
    } catch (err) {
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarTipoContrato = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let tipoContratoDeletar = await TipoContrato.findOne({
            where: {
                id: _id
            }
        })

        if (!tipoContratoDeletar) {
            return { err: `Tipo de contrato não encontrado` }
        }
    }

    try {
        let tipoContratoDeletado = await TipoContrato.destroy({
            where: {
                id: _id
            }
        })

        return tipoContratoDeletado
    } catch (err) {
        return { err: `Erro ao deletar tipo de contrato: ${err}` }
    }
}

export default service