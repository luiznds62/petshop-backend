import Pessoa from '../models/Pessoa'

let service = {}

async function validar(_pessoa){
    if(!_pessoa.nome){
        return "Nome não informado"
    }

    if(!_pessoa.cpf){
        return "CPF não informado"
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
    let inconsistencias = await validar(_pessoa)

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

export default service