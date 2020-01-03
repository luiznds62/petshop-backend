import Pessoa from '../models/Pessoa'
import validadorCpfCnpj from '../common/ValidadorCpfCnpj'

let service = {}

async function validar(_pessoa, _acao) {
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
        } else if(_acao != 'atualizacao') {
            if (!validadorCpfCnpj.validarCPF(_pessoa.cpf)) {
                return "CPF inválido"
            }
        }
    }

    if (!_pessoa.dataNascimento) {
        return "Data de nascimento não informada"
    } else {
        let mascara = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
        if (!mascara.test(_pessoa.dataNascimento)) {
            return "Data inválida"
        }
    }

    if (!_pessoa.genero) {
        return "Genero não informado"
    }
}

service.buscarTodos = async () => {
    try {
        let pessoas = await Pessoa.findAll()

        if (pessoas.length === 0) {
            return { err: `Nenhuma pessoa encontrado` }
        }

        return pessoas
    }
    catch (err) {
        return { err: `Erro ao buscar pessoas: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let pessoa = await Pessoa.findOne({
            where: {
                id: _id
            }
        })

        if (!pessoa) {
            return { err: `Pessoa com ID: ${_id} não encontrada` }
        }

        return pessoa
    } catch (err) {
        return { err: `Erro ao buscar pessoa: ${err}` }
    }
}

service.salvarPessoa = async (_pessoa) => {
    let inconsistencias = await validar(_pessoa, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let pessoaNova = await Pessoa.create(_pessoa)

        return pessoaNova
    } catch (err) {
        return { err: `Erro ao salvar pessoa: ${err}` }
    }
}

service.atualizarPessoa = async (_id, _pessoa) => {
    let inconsistencias = await validar(_pessoa, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
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
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarPessoa = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let pessoaDeletar = await Pessoa.findOne({
            where: {
                id: _id
            }
        })

        if (!pessoaDeletar) {
            return { err: `Pessoa com ID: ${_id} não encontrada` }
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
        return { err: `Erro ao deletar pessoa: ${err}` }
    }
}

export default service