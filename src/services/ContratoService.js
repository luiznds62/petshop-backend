import Contrato from "../models/Contrato"
import Cliente from "../models/Cliente"
import TipoContrato from "../models/TipoContrato"
import Servico from "../models/Servico"
import validadorDatas from '../common/ValidadorDatas'

let service = {}

async function validar(_contrato, _acao) {
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

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        let contratos = await Contrato.findAll({ include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] })

        if (contratos.length === 0) {
            return { err: `Nenhuma contrato encontrado` }
        }

        let quantidade = await Contrato.count()
        let proximo = false

        if (quantidade > (Number(offset) + contratos.length)) {
            proximo = true
        }

        return { obj: contratos, proximo: proximo, offset: offset, total: quantidade }
    }
    catch (err) {
        return { err: `Erro ao buscar contratos: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let contrato = await Contrato.findOne({
            where: {
                id: _id
            }
        })

        if (!contrato) {
            return { err: `Contrato não encontrado` }
        }

        return contrato
    } catch (err) {
        return { err: `Erro ao buscar contrato: ${err}` }
    }
}

service.buscarPorCliente = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let contrato = await Contrato.findOne({
            where: {
                clienteId: _id
            }
        })

        if (!contrato) {
            return { err: `Contrato não encontrado` }
        }

        return contrato
    } catch (err) {
        return { err: `Erro ao buscar contrato: ${err}` }
    }
}

service.salvarContrato = async (_contrato) => {
    let inconsistencias = await validar(_contrato, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let contratoNovo = await Contrato.create(_contrato)

        return contratoNovo
    } catch (err) {
        return { err: `Erro ao salvar contrato: ${err}` }
    }
}

service.atualizarContrato = async (_id, _contrato) => {
    let inconsistencias = await validar(_contrato, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
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
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarContrato = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let contratoDeletar = await Contrato.findOne({
            where: {
                id: _id
            }
        })

        if (!contratoDeletar) {
            return { err: `Contrato não encontrado` }
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
        return { err: `Erro ao deletar contrato: ${err}` }
    }
}

export default service