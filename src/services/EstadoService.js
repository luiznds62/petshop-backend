import Estado from '../models/Estado'

let service = {}

service.buscarTodos = async () => {
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

service.buscarPorUf = async (_uf) => {
    if (!_uf) {
        return { err: "UF não informado" }
    }else{
        _uf = _uf.toUpperCase()
    }

    try {
        let estado = await Estado.findOne({
            where: {
                sigla: _uf
            }
        })

        if (!estado) {
            return { err: `Nenhum estado encontrado para a UF: ${_uf}` }
        }

        return estado
    } catch (err) {
        return { err: `Erro ao buscar Estado por UF: ${err}` }
    }
}

export default service