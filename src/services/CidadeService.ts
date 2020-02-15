import { Cidade } from '../models/Cidade'
import { Estado } from '../models/Estado'

export class CidadeService {
    async validar(_cidade) {
        if (!_cidade.nome) {
            return "Nome não informado"
        }

        if (!_cidade.estadoId) {
            return "Estado não informado"
        } else {
            let estadoExiste = await Estado.findOne({
                where: {
                    id: _cidade.estadoId
                }
            })

            if (!estadoExiste) {
                return "Estado não existente"
            }
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let cidades = await Cidade.findAll({ include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] })

            if (cidades.length === 0) {
                throw new TypeError(`Nenhuma cidade encontrada`)
            }

            let quantidade = await Cidade.count()
            let proximo = false

            if (quantidade > (Number(offset) + cidades.length)) {
                proximo = true
            }

            return { obj: cidades, proximo: proximo, offset: offset, total: quantidade }
        }
        catch (err) {
            throw new TypeError(`Erro ao buscar cidades: ${err}`)
        }
    }

    async buscarPorId(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        }

        try {
            let cidade = await Cidade.findOne({
                include: [{ all: true }], where: {
                    id: _id
                }
            })

            if (!cidade) {
                throw new TypeError('Nenhuma cidade encontrada')
            }

            return cidade
        } catch (err) {
            throw new TypeError(`Erro ao buscar cidade: ${err}`)
        }
    }

    async buscarPorUFNome(_uf, _nome) {
        if (!_nome) {
            throw new TypeError("Nome não informado")
        }

        if (!_uf) {
            throw new TypeError("UF não informada")
        } else {
            _uf = _uf.toUpperCase()
        }

        try {
            let estado = await Estado.findOne({
                where: {
                    sigla: _uf
                }
            })

            if (estado) {
                let cidade = await Cidade.findOne({
                    include: [{ all: true }], where: {
                        nome: _nome,
                        estadoId: estado.id
                    }
                })

                if (!cidade) {
                    throw new TypeError("Nenhuma cidade encontrada")
                }

                return cidade
            } else {
                throw new TypeError(`Estado não encontrado para UF: ${_uf}`)
            }
        } catch (err) {
            throw new TypeError(`Erro ao buscar Cidade: ${err}`)
        }
    }

    async salvarCidade(_cidade) {
        let inconsistencias = await this.validar(_cidade)

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let cidadeNova = await Cidade.create(_cidade)

            return cidadeNova
        } catch (error) {
            throw new TypeError("Erro ao salvar cidade")
        }
    }
}
