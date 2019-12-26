import Estado from '../models/Estado'
import ResponseBuilder from '../common/ResponseBuilder'

let service = {}

service.buscarTodos = async (req, res) => {
    try {
        let estados = await Estado.findAll()

        if(estados.length === 0){
            return new ResponseBuilder(false, `Nenhum estado encontrado`)
        }

        return new ResponseBuilder(true, "Enviando estados", estados)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao buscar estados: ${err}`)
    }
}

export default service