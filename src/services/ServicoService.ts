import { Servico } from '../models/Servico'

export class ServicoService {
    async  validar(_servico, _acao) {
        if (!_servico.nome) {
            return "Nome não informado"
        }

        if (!_servico.valor) {
            return "Valor não informado"
        } else {
            let mascara = /^[0-9.,]+$/
            if (!mascara.test(_servico.valor)) {
                return "Valor inválido"
            }
        }

        if (_servico.tempoMedioAtendimento) {
            let mascara = /^[0-9.,]+$/
            if (!mascara.test(_servico.tempoMedioAtendimento)) {
                return "Tempo médio de atendimento inválido"
            }
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let servicos = await Servico.findAll({ limit: limit, offset: offset, order: [['id', order]] })

            if (servicos.length === 0) {
                throw new TypeError(`Nenhum serviço encontrado`)
            }

            let quantidade = await Servico.count()
            let proximo = false

            if (quantidade > (Number(offset) + servicos.length)) {
                proximo = true
            }

            return { obj: servicos, proximo: proximo, offset: offset, total: quantidade }
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
            let servico = await Servico.findOne({
                where: {
                    id: _id
                }
            })

            if (!servico) {
                throw new TypeError(`Serviço não encontrado`)
            }

            return servico
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarServico(_servico) {
        let inconsistencias = await this.validar(_servico, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let servicoNovo = await Servico.create(_servico)

            return servicoNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarServico(_id, _servico) {
        let inconsistencias = await this.validar(_servico, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let servicoAtualizado = await Servico.update({
                nome: _servico.nome,
                valor: _servico.valor,
                tempoMedioAtendimento: _servico.tempoMedioAtendimento
            }, {
                where: {
                    id: _id
                }
            })

            return servicoAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarServico(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let servicoDeletar = await Servico.findOne({
                where: {
                    id: _id
                }
            })

            if (!servicoDeletar) {
                throw new TypeError(`Serviço não encontrado`)
            }
        }

        try {
            let servicoDeletado = await Servico.destroy({
                where: {
                    id: _id
                }
            })

            return servicoDeletado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}
