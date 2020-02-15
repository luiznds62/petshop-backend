import { Pessoa } from '../models/Pessoa'
import { ValidadorCpfCnpj } from '../common/ValidadorCpfCnpj'
import { ValidadorData } from '../common/ValidadorDatas'

export class PessoaService {
    validadorCpfCnpj: ValidadorCpfCnpj
    validadorData: ValidadorData

    async validar(_pessoa, _acao) {
        if (!_pessoa.nome) {
            return "Nome não informado"
        }

        if (!_pessoa.cpf) {
            return "CPF não informado"
        } else {
            let pessoaDuplicadada = await Pessoa.findOne({
                where: {
                    cpf: _pessoa.cpf
                }
            })

            if (pessoaDuplicadada && _acao === 'criacao') {
                return "CPF já cadastrado"
            } else if (_acao != 'atualizacao') {
                if (!this.validadorCpfCnpj.validarCPF(_pessoa.cpf)) {
                    return "CPF inválido"
                }
            }
        }

        if (!_pessoa.dataNascimento) {
            return "Data de nascimento não informada"
        } else {
            if (!this.validadorData.validarData(_pessoa.dataNascimento)) {
                return "Data inválida"
            }
        }

        if (!_pessoa.genero) {
            return "Genero não informado"
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let pessoas = await Pessoa.findAll({ limit: limit, offset: offset, order: [['id', order]] })

            if (pessoas.length === 0) {
                throw new TypeError(`Nenhuma pessoa encontrado`)
            }

            let quantidade = await Pessoa.count()
            let proximo = false

            if (quantidade > (Number(offset) + pessoas.length)) {
                proximo = true
            }

            return { obj: pessoas, proximo: proximo, offset: offset, total: quantidade }
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
            let pessoa = await Pessoa.findOne({
                include: [{ all: true }], where: {
                    id: _id
                }
            })

            if (!pessoa) {
                throw new TypeError(`Pessoa não encontrada`)
            }

            return pessoa
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarPessoa(_pessoa) {
        let inconsistencias = await this.validar(_pessoa, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let pessoaNova = await Pessoa.create(_pessoa)

            return pessoaNova
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarPessoa(_id, _pessoa) {
        let inconsistencias = await this.validar(_pessoa, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let pessoaAtualizada = await Pessoa.update({
                nome: _pessoa.nome,
                rg: _pessoa.rg,
                dataNascimento: _pessoa.dataNascimento,
                genero: _pessoa.genero
            }, {
                where: {
                    id: _id
                }
            })

            return pessoaAtualizada
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarPessoa(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let pessoaDeletar = await Pessoa.findOne({
                where: {
                    id: _id
                }
            })

            if (!pessoaDeletar) {
                throw new TypeError(`Pessoa com ID: ${_id} não encontrada`)
            }
        }

        try {
            let pessoaDeletada = await Pessoa.destroy({
                where: {
                    id: _id
                }
            })

            return pessoaDeletada
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}
