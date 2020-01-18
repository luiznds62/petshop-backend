import Endereco from '../models/Endereco'
import ResponseBuilder from '../common/ResponseBuilder'
import Cidade from '../models/Cidade'
import Bairro from '../models/Bairro'

let service = {}

async function validar(_endereco) {
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
            return `Erro ao buscar cidade: ${err}`
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
            return `Erro ao buscar bairro: ${err}`
        }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let endereco = await Endereco.findOne({ include: [{ all: true }] }, {
            where: {
                id: _id
            }
        })

        if (!endereco) {
            return { err: `Endereço não encontrado` }
        }

        return endereco
    } catch (err) {
        return { err: `Erro ao buscar endereço: ${err}` }
    }
}

service.buscarTodos = async (req, res) => {
    try {
        let enderecos = await Endereco.findAll({ include: [{ all: true }] })

        if (enderecos.length === 0) {
            return { err: `Nenhum Endereco encontrada` }
        }

        return enderecos
    }
    catch (err) {
        return { err: `Erro ao buscar Enderecos: ${err}` }
    }
}

service.salvarEndereco = async (_endereco) => {
    let inconsistencias = await validar(_endereco)

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let enderecoNovo = await Endereco.create(_endereco)

        return enderecoNovo
    } catch (err) {
        return { err: err }
    }
}

service.deletarEndereco = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let enderecoDeletar = await Endereco.findOne({
            where: {
                id: _id
            }
        })

        if (!enderecoDeletar) {
            return { err: `Endereço não encontrado` }
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
        return { err: `Erro ao deletar endereço: ${err}` }
    }
}

export default service