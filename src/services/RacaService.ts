import { Especie } from "../models/especie"
import { Raca } from "../models/Raca"

export class RacaService {
    async  validar(_raca, _acao) {
        if (!_raca.nome) {
            return "Nome não informado"
        } else {
            let racaExiste = await Raca.findOne({
                where: {
                    nome: _raca.nome
                }
            })

            if (racaExiste) {
                return "Raça já existente"
            }
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let racas = await Raca.findAll({ limit: limit, offset: offset, order: [['id', order]] })

            if (racas.length === 0) {
                throw new TypeError(`Nenhuma raça encontrado`)
            }

            let quantidade = await Raca.count()
            let proximo = false

            if (quantidade > (Number(offset) + racas.length)) {
                proximo = true
            }

            return { obj: racas, proximo: proximo, offset: offset, total: quantidade }
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
            let raca = await Raca.findOne({
                where: {
                    id: _id
                }
            })

            if (!raca) {
                throw new TypeError(`Raça não encontrada`)
            }

            return raca
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarRaca(_raca) {
        let inconsistencias = await this.validar(_raca, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let racaNova = await Raca.create(_raca)

            return racaNova
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarRaca(_id, _raca) {
        let inconsistencias = await this.validar(_raca, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let racaAtualizada = await Raca.update({
                nome: _raca.nome,
                descricao: _raca.descricao,
                idEspecie: _raca.idEspecie
            }, {
                where: {
                    id: _id
                }
            })

            return racaAtualizada
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarRaca(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let racaDeletar = await Raca.findOne({
                where: {
                    id: _id
                }
            })

            if (!racaDeletar) {
                throw new TypeError(`Raça com ID: ${_id} não encontrado`)
            }
        }

        try {
            let racaDeletado = await Raca.destroy({
                where: {
                    id: _id
                }
            })

            return racaDeletado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}