import Cidade from '../models/Cidade'
import Estado from '../models/Estado'

let service = {}

service.buscarTodos = async () => {
    try {
        let cidades = await Cidade.findAll()

        if (cidades.length === 0) {
            return { err: `Nenhuma cidade encontrada` }
        }

        return cidades
    }
    catch (err) {
        return { err: `Erro ao buscar cidades: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let cidade = await Cidade.findOne({
            where: {
                id: _id
            }
        })

        if (!cidade) {
            return { err: 'Nenhuma cidade encontrada' }
        }

        return cidade
    } catch (err) {
        return { err: `Erro ao buscar cidade: ${err}` }
    }
}

service.buscarPorUFNome = async (_uf, _nome) => {
    if (!_nome) {
        return { err: "Nome não informado" }
    }
    
    if (!_uf) {
        return { err: "UF não informada" }
    } else {
        _uf = _uf.toUpperCase()
    }

    try {
        let estado = await Estado.findOne({
            where: {
                sigla: _uf
            }
        })

        if (estado) {
            let cidade = await Cidade.findOne({
                where: {
                    nome: _nome,
                    idEstado: estado.id
                }
            })

            if (!cidade) {
                return { err: "Nenhuma cidade encontrada" }
            }

            return cidade
        } else {
            return { err: `Estado não encontrado para UF: ${_uf}` }
        }
    } catch (err) {
        return { err: `Erro ao buscar Cidade: ${err}` }
    }
}

export default service