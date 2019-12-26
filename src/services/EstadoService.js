import Estado from '../models/Estado'
import ResponseBuilder from '../common/ResponseBuilder'

let service = {}

service.buscarTodos = async (req, res) => {
    try {
        let estados = await Estado.findAll()
        return new ResponseBuilder(true, "Enviando estados", estados)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao buscar estados: ${err}`)
    }
}

export default service