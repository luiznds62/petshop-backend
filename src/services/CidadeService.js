import Cidade from '../models/Cidade'

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

export default service