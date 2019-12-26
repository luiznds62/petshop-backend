import Cidade from '../models/Cidade'
import ResponseBuilder from '../common/ResponseBuilder'

let service = {}

service.buscarTodos = async (req, res) => {
    try {
        let cidades = await Cidade.findAll()

        if (cidades.length === 0) {
            return new ResponseBuilder(false, `Nenhuma cidade encontrada`)
        }

        return new ResponseBuilder(true, "Enviando cidades", cidades)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao buscar cidades: ${err}`)
    }
}

export default service