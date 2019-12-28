import Estado from '../models/Estado'

let service = {}

service.buscarTodos = async (req, res) => {
    try {
        let estados = await Estado.findAll()

        if (estados.length === 0) {
            return { err: `Nenhum estado encontrado` }
        }

        return estados
    }
    catch (err) {
        return { err: `Erro ao buscar estados: ${err}` }
    }
}

export default service