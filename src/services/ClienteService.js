import Cliente from '../models/Cliente'
import Pessoa from '../models/Pessoa'
import Endereco from '../models/Endereco'

let service = {}

async function validar(_cliente, _acao) {
    if (!_cliente.idPessoa) {
        return "Dados pessoais não informados"
    }else{
        let pessoa = await Pessoa.findOne({
            where: {
                id: _cliente.idPessoa
            }
        })

        if(!pessoa){
            return "Dados pessoais não encontrados"
        }
    }

    if(!_cliente.idEndereco){
        return "Endereço não informado"
    }else{
        let endereco = await Endereco.findOne({
            where: {
                id: _cliente.endereco
            }
        })

        if(!endereco){
            return "Endereço não encontrado"
        }
    }

    if(!_cliente.telefonePrincipal){
        return "Telefone não informado"
    }
}

service.buscarTodos = async () => {
    try {
        let clientes = await Cliente.findAll()

        if (clientes.length === 0) {
            return { err: `Nenhuma cliente encontrado` }
        }

        return clientes
    }
    catch (err) {
        return { err: `Erro ao buscar clientes: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let cliente = await Cliente.findOne({
            where: {
                id: _id
            }
        })

        if (!cliente) {
            return { err: `Cliente com ID: ${_id} não encontrado` }
        }

        return cliente
    } catch (err) {
        return { err: `Erro ao buscar cliente: ${err}` }
    }
}

service.salvarCliente = async (_cliente) => {
    let inconsistencias = await validar(_cliente, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let clienteNovo = await Cliente.create(_cliente)

        return clienteNovo
    } catch (err) {
        return { err: `Erro ao salvar cliente: ${err}` }
    }
}

service.atualizarCliente = async (_id, _cliente) => {
    let inconsistencias = await validar(_cliente, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let clienteAtualizado = await Cliente.update({
            idEndereco: _cliente.idEndereco,
            telefonePrincipal: _cliente.telefonePrincipal,
            telefoneAlternativo: _cliente.telefoneAlternativo
        }, {
            where: {
                id: _id
            }
        })

        return clienteAtualizado
    } catch (err) {
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarCliente = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let clienteDeletar = await Cliente.findOne({
            where: {
                id: _id
            }
        })

        if (!clienteDeletar) {
            return { err: `Cliente com ID: ${_id} não encontrado` }
        }
    }

    try {
        let clienteDeletado = await Cliente.destroy({
            where: {
                id: _id
            }
        })

        return clienteDeletado
    } catch (err) {
        return { err: `Erro ao deletar cliente: ${err}` }
    }
}

export default service