import { Bairro } from '../models/Bairro'
import { Cidade } from '../models/Cidade'

export class BairroService {
    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let bairros = await Bairro.findAll(
                { include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] }
            )

            if (bairros.length === 0) {
                throw new TypeError(`Nenhum Bairro encontrado`)
            }


            let quantidadeBairros = await Bairro.count()
            let proximo = false

            if (quantidadeBairros > (Number(offset) + bairros.length)) {
                proximo = true
            }

            return { obj: bairros, proximo: proximo, offset: offset, total: quantidadeBairros }
        }
        catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarPorCidadeId(_cidadeId, offset = 0, limit = 25, order = "ASC") {
        if (!_cidadeId) {
            throw new TypeError("ID da Cidade não informado")
        } else {
            let cidade = await Cidade.findOne({
                where: {
                    id: _cidadeId
                }
            })

            if (!cidade) {
                throw new TypeError(`Cidade não encontrada`)
            }
        }

        try {
            let bairros = await Bairro.findAll({
                include: [{ all: true }],
                offset: offset,
                limit: limit,
                order: [['id', order]],
                where: {
                    cidadeId: _cidadeId
                }
            })

            if (!bairros) {
                throw new TypeError(`Nenhum bairro encontrado para o cidadeId: ${_cidadeId}`)
            }

            let quantidadeBairros = await Bairro.count()
            let proximo = false

            if (quantidadeBairros > (Number(offset) + bairros.length)) {
                proximo = true
            }

            return { obj: bairros, proximo: proximo, offset: offset, total: quantidadeBairros }
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarBairro(_bairro) {
        if (!_bairro.nome) {
            throw new TypeError("Nome do Bairro não informado")
        }

        if (!_bairro.cidadeId) {
            throw new TypeError("Cidade do Bairro não informada")
        }

        let bairro = await Bairro.findOne({
            where: {
                nome: _bairro.nome,
                cidadeId: _bairro.cidadeId
            }
        })

        if (bairro != null) {
            throw new TypeError("Bairro já existente para cidade")
        }

        try {
            let bairroNovo = await Bairro.create(_bairro)

            return bairroNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}
