import { Endereco } from '../models/Endereco'
import { Cidade } from '../models/Cidade'
import { Bairro } from '../models/Bairro'

export class EnderecoService {
    async validar(_endereco) {
        if (!_endereco.rua) {
            return "Rua não informada"
        }

        if (!_endereco.numero) {
            return "Número não informado"
        } else {
            if (isNaN(parseFloat(_endereco.numero)) && !isFinite(_endereco.numero)) {
                return "Número inválido"
            }
        }

        if (!_endereco.cidadeId) {
            return "Cidade não informada"
        } else {
            try {
                let cidade = await Cidade.findOne({
                    where: {
                        id: _endereco.cidadeId
                    }
                })

                if (cidade === null) {
                    return 'Cidade não encontrada'
                }
            } catch (err) {
                return `Erro ao buscar cidade: ${err.message}`
            }
        }

        if (!_endereco.bairroId) {
            return "Bairro não informado"
        } else {
            try {
                let bairro = await Bairro.findOne({
                    where: {
                        id: _endereco.bairroId
                    }
                })

                if (bairro === null) {
                    return 'Bairro não encontrado'
                }
            } catch (err) {
                return `Erro ao buscar bairro: ${err.message}`
            }
        }
    }

    async buscarPorId(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        }

        try {
            let endereco = await Endereco.findOne({
                include: [{ all: true }], where: {
                    id: _id
                }
            })

            if (!endereco) {
                throw new TypeError(`Endereço não encontrado`)
            }

            return endereco
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let enderecos = await Endereco.findAll(
                { include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] }
            )

            if (enderecos.length === 0) {
                throw new TypeError(`Nenhum endereço encontrado`)
            }

            let quantidadeEnderecos = await Endereco.count()
            let proximo = false

            if (quantidadeEnderecos > (Number(offset) + enderecos.length)) {
                proximo = true
            }

            return { obj: enderecos, proximo: proximo, offset: offset, total: quantidadeEnderecos }
        }
        catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarEndereco(_endereco) {
        let inconsistencias = await this.validar(_endereco)

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let enderecoNovo = await Endereco.create(_endereco)

            return enderecoNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarEndereco(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let enderecoDeletar = await Endereco.findOne({
                where: {
                    id: _id
                }
            })

            if (!enderecoDeletar) {
                throw new TypeError(`Endereço não encontrado`)
            }
        }

        try {
            let enderecoDeletado = await Endereco.destroy({
                where: {
                    id: _id
                }
            })

            return enderecoDeletado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

}


