import Estado from '../models/Estado'
import validador from '../common/ValidadorDatas'

let service = {}

async function validar(_estado) {
    if (!_estado.nome) {
        return "Nome não informado"
    } else {
        let estadoExiste = await Estado.findOne({
            where: {
                nome: _estado.nome
            }
        })

        if (estadoExiste) {
            return "Estado já existente"
        }
    }

    if (!_estado.sigla) {
        return "Sigla não informada"
    } else {
        let estadoExiste = await Estado.findOne({
            where: {
                sigla: _estado.sigla
            }
        })

        if (estadoExiste) {
            return "Estado já existente"
        }
    }
}

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        let estados = await Estado.findAll({ limit: limit, offset: offset, order: [['id',order]]})

        if (estados.length === 0) {
            return { err: `Nenhum estado encontrado` }
        }

        let quantidade = await Estado.count()
        let proximo = false

        if (quantidade > (Number(offset) + estados.length)) {
            proximo = true
        }

        return { obj: estados, proximo: proximo, offset: offset, total: quantidade }
    }
    catch (err) {
        return { err: `Erro ao buscar estados: ${err}` }
    }
}

service.buscarPorUf = async (_uf) => {
    if (!_uf) {
        return { err: "UF não informado" }
    } else {
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

service.salvarEstado = async (_estado) => {
    let inconsistencias = await validar(_estado)

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let estadoSalvo = await Estado.create(_estado)

        return estadoSalvo
    } catch (error) {
        return { err: "Erro ao salvar estado" }
    }
}

export default service