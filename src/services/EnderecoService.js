import Endereco from '../models/Endereco'
import ResponseBuilder from '../common/ResponseBuilder'

let service = {}

service.buscarTodos = async (req, res) => {
    try {
        let enderecos = await Endereco.findAll()

        if (enderecos.length === 0) {
            return new ResponseBuilder(false, `Nenhuma Endereco encontrada`)
        }

        return new ResponseBuilder(true, "Enviando Enderecos", enderecos)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao buscar Enderecos: ${err}`)
    }
}

export default service