import { Estado } from '../models/Estado'

export class EstadoService {
    async validar(_estado) {
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
            if(_estado.sigla.length > 2){
                return "Sigla inválida"
            }

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

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let estados = await Estado.findAll({ limit: limit, offset: offset, order: [['id', order]] })

            if (estados.length === 0) {
                throw new TypeError(`Nenhum estado encontrado`)
            }

            let quantidade = await Estado.count()
            let proximo = false

            if (quantidade > (Number(offset) + estados.length)) {
                proximo = true
            }

            return { obj: estados, proximo: proximo, offset: offset, total: quantidade }
        }
        catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarPorUf(_uf) {
        if (!_uf) {
            throw new TypeError("UF não informado")
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
                throw new TypeError(`Nenhum estado encontrado para a UF: ${_uf}`)
            }

            return estado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarEstado(_estado) {
        let inconsistencias = await this.validar(_estado)

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let estadoSalvo = await Estado.create(_estado)

            return estadoSalvo
        } catch (error) {
            throw new TypeError("Erro ao salvar estado")
        }
    }
}


