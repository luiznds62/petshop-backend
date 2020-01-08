import especie from '../models/especie'
import Especie from '../models/Especie'

let service = {}

async function validar(_especie, _acao) {
    if(!_especie.nome){
        return "Nome não informado"
    }else{
        let especieJaExistente = await Especie.findOne({
            where: {
                nome: _especie.nome
            }
        })

        if(especieJaExistente){
            return "especie já cadastrada"
        }
    }
}

service.buscarTodos = async () => {
    try {
        let especies = await Especie.findAll()

        if (especies.length === 0) {
            return { err: `Nenhuma especie encontrado` }
        }

        return especies
    }
    catch (err) {
        return { err: `Erro ao buscar especies: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let especie = await Especie.findOne({
            where: {
                id: _id
            }
        })

        if (!especie) {
            return { err: `Especie com ID: ${_id} não encontrado` }
        }

        return especie
    } catch (err) {
        return { err: `Erro ao buscar especie: ${err}` }
    }
}

service.salvarEspecie = async (_especie) => {
    let inconsistencias = await validar(_especie, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let especieNova = await Especie.create(_especie)

        return especieNova
    } catch (err) {
        return { err: `Erro ao salvar especie: ${err}` }
    }
}

service.atualizarEspecie = async (_id, _especie) => {
    let inconsistencias = await validar(_especie, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let especieAtualizada = await especie.update({
            nome: _especie.nome,
            descricao: _especie.descricao
        }, {
            where: {
                id: _id
            }
        })

        return especieAtualizada
    } catch (err) {
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarEspecie = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let especieDeletar = await Especie.findOne({
            where: {
                id: _id
            }
        })

        if (!especieDeletar) {
            return { err: `Especie com ID: ${_id} não encontrado` }
        }
    }

    try {
        let especieDeletado = await Especie.destroy({
            where: {
                id: _id
            }
        })

        return especieDeletado
    } catch (err) {
        return { err: `Erro ao deletar especie: ${err}` }
    }
}

export default service