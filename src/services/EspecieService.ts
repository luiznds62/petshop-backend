import { Especie } from '../models/Especie'

export class EspecieService {
    async validar(_especie, _acao) {
        if (!_especie.nome) {
            return "Nome não informado"
        } else {
            let especieJaExistente = await Especie.findOne({
                where: {
                    nome: _especie.nome
                }
            })

            if (especieJaExistente) {
                return "especie já cadastrada"
            }
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let especies = await Especie.findAll({ limit: limit, offset: offset, order: [['id', order]] })

            if (especies.length === 0) {
                throw new TypeError(`Nenhuma especie encontrado`)
            }

            let quantidade = await Especie.count()
            let proximo = false

            if (quantidade > (Number(offset) + especies.length)) {
                proximo = true
            }

            return { obj: especies, proximo: proximo, offset: offset, total: quantidade }
        }
        catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarPorId(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        }

        try {
            let especie = await Especie.findOne({
                where: {
                    id: _id
                }
            })

            if (!especie) {
                throw new TypeError(`Especie não encontrada`)
            }

            return especie
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarEspecie(_especie) {
        let inconsistencias = await this.validar(_especie, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let especieNova = await Especie.create(_especie)

            return especieNova
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarEspecie(_id, _especie) {
        let inconsistencias = await this.validar(_especie, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let especieAtualizada = await Especie.update({
                nome: _especie.nome,
                descricao: _especie.descricao
            }, {
                where: {
                    id: _id
                }
            })

            return especieAtualizada
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarEspecie(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let especieDeletar = await Especie.findOne({
                where: {
                    id: _id
                }
            })

            if (!especieDeletar) {
                throw new TypeError(`Especie com ID: ${_id} não encontrado`)
            }
        }

        try {
            let especieDeletado = await Especie.destroy({
                where: {
                    id: _id
                }
            })

            return especieDeletado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}
