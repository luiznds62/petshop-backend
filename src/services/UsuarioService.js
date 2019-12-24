import Usuario from '../models/Usuario'
import ResponseBuilder from '../common/ResponseBuilder'

let service = {}

function validate(usuario) {
    // TODO
}

service.getAll = async (req, res) => {
    try {
        let usuarios = await Usuario.findAll()
        return new ResponseBuilder(true, "Enviando usuários", usuarios)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao buscar usuários: ${err}`)
    }
}

service.saveUsuario = async (req, res) => {
    validate(req.body)
    try {
        let usuarioNovo = await Usuario.create(req.body)
        return new ResponseBuilder(true, "Criado usuário", usuarioNovo)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao criar usuário: ${err}`,[])
    }
}

export default service