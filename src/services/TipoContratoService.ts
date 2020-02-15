import { TipoContrato } from '../models/TipoContrato'

export class TipoContratoService {
    async validar(_tipoContrato, _acao) {
        if (!_tipoContrato.nome) {
            return "Nome não informado"
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let tipoContratos = await TipoContrato.findAll({ limit: limit, offset: offset, order: [['id', order]] })

            if (tipoContratos.length === 0) {
                throw new TypeError(`Nenhum tipo de contrato encontrado`)
            }

            let quantidade = await TipoContrato.count()
            let proximo = false

            if (quantidade > (Number(offset) + tipoContratos.length)) {
                proximo = true
            }

            return { obj: tipoContratos, proximo: proximo, offset: offset, total: quantidade }
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
            let tipoContrato = await TipoContrato.findOne({
                where: {
                    id: _id
                }
            })

            if (!tipoContrato) {
                throw new TypeError(`Tipo de contrato não encontrado`)
            }

            return tipoContrato
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarTipoContrato(_tipoContrato) {
        let inconsistencias = await this.validar(_tipoContrato, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let tipoContratoNovo = await TipoContrato.create(_tipoContrato)

            return tipoContratoNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarTipoContrato(_id, _tipoContrato) {
        let inconsistencias = await this.validar(_tipoContrato, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let tipoContratoAtualizado = await TipoContrato.update({
                nome: _tipoContrato.nome,
                descricao: _tipoContrato.descricao
            }, {
                where: {
                    id: _id
                }
            })

            return tipoContratoAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarTipoContrato(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let tipoContratoDeletar = await TipoContrato.findOne({
                where: {
                    id: _id
                }
            })

            if (!tipoContratoDeletar) {
                throw new TypeError(`Tipo de contrato não encontrado`)
            }
        }

        try {
            let tipoContratoDeletado = await TipoContrato.destroy({
                where: {
                    id: _id
                }
            })

            return tipoContratoDeletado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}

