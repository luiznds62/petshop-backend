import Especie from "../models/especie"
import Raca from "../models/Raca"

let service = {}

async function validar(_raca, _acao) {
    if(!_raca.nome){
        return "Nome não informado"
    }else{
        let racaExiste = await Raca.findOne({
            where: {
                nome: _raca.nome
            }
        })

        if(racaExiste){
            return "Raça já existente"
        }
    }
}

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        let racas = await Raca.findAll({ limit: limit, offset: offset, order: [['id',order]]})

        if (racas.length === 0) {
            return { err: `Nenhuma raça encontrado` }
        }

        let quantidade = await Raca.count()
        let proximo = false

        if (quantidade > (Number(offset) + racas.length)) {
            proximo = true
        }

        return { obj: racas, proximo: proximo, offset: offset, total: quantidade }
    }
    catch (err) {
        return { err: `Erro ao buscar raças: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let raca = await Raca.findOne({
            where: {
                id: _id
            }
        })

        if (!raca) {
            return { err: `Raça com ID: ${_id} não encontrado` }
        }

        return raca
    } catch (err) {
        return { err: `Erro ao buscar raça: ${err}` }
    }
}

service.salvarRaca = async (_raca) => {
    let inconsistencias = await validar(_raca, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let racaNova = await Raca.create(_raca)

        return racaNova
    } catch (err) {
        return { err: `Erro ao salvar raça: ${err}` }
    }
}

service.atualizarRaca = async (_id, _raca) => {
    let inconsistencias = await validar(_raca, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let racaAtualizada = await Raca.update({
            nome: _raca.nome,
            descricao: _raca.descricao,
            idEspecie: _raca.idEspecie
        }, {
            where: {
                id: _id
            }
        })

        return racaAtualizada
    } catch (err) {
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarRaca = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let racaDeletar = await Raca.findOne({
            where: {
                id: _id
            }
        })

        if (!racaDeletar) {
            return { err: `Raça com ID: ${_id} não encontrado` }
        }
    }

    try {
        let racaDeletado = await Raca.destroy({
            where: {
                id: _id
            }
        })

        return racaDeletado
    } catch (err) {
        return { err: `Erro ao deletar raça: ${err}` }
    }
}

export default service