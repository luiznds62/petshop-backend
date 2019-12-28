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
    }else{
        if(isNaN(parseFloat(_endereco.numero)) && !isFinite(_endereco.numero)){
            return "Número inválido"
        }
    }

    if (!_endereco.idCidade) {
        return "Cidade não informada"
    } else {
        try {
            let cidade = await Cidade.findOne({
                where: {
                    id: _endereco.idCidade
                }
            })

            if (cidade === null) {
                return 'Cidade não encontrada'
            }
        } catch (err) {
            return `Erro ao buscar cidade: ${err}`
        }
    }

    if (!_endereco.idBairro) {
        return "Bairro não informado"
    } else {
        try {
            let bairro = await Bairro.findOne({
                where: {
                    id: _endereco.idBairro
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

service.buscarTodos = async (req, res) => {
    try {
        let enderecos = await Endereco.findAll()

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

export default service