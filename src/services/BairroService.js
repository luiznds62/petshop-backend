import Bairro from '../models/Bairro'
import ResponseBuilder from '../common/ResponseBuilder'

let service = {}

service.buscarTodos = async (req, res) => {
    try {
        let bairros = await Bairro.findAll()

        if (bairros.length === 0) {
            return new ResponseBuilder(false, `Nenhuma Bairro encontrada`)
        }

        return new ResponseBuilder(true, "Enviando Bairros", bairros)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao buscar Bairros: ${err}`)
    }
}

export default service