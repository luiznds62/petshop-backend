import Bairro from '../models/Bairro'
import Cidade from '../models/Cidade'

let service = {}

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        let bairros = await Bairro.findAll(
            { include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] }
        )

        if (bairros.length === 0) {
            return { err: `Nenhuma Bairro encontrada` }
        }


        let quantidadeBairros = await Bairro.count()
        let proximo = false

        if (quantidadeBairros > (Number(offset) + bairros.length)) {
            proximo = true
        }

        return { obj: bairros, proximo: proximo, offset: offset, total: quantidadeBairros }
    }
    catch (err) {
        return { err: `Erro ao buscar Bairros: ${err}` }
    }
}

service.buscarPorCidadeId = async (_cidadeId, offset = 0, limit = 25, order = "ASC") => {
    if (!_cidadeId) {
        return "ID da Cidade não informada"
    } else {
        let cidade = await Cidade.findOne({
            where: {
                id: _cidadeId
            }
        })

        if (!cidade) {
            return { err: `Cidade não encontrada` }
        }
    }

    try {
        let bairros = await Bairro.findAll({
            include: [{ all: true }],
            offset: offset,
            limit: limit,
            order: [['id', order]], 
        }, {
            where: {
                cidadeId: _cidadeId
            }
        })

        if (!bairros) {
            return { err: `Nenhum bairro encontrado para o cidadeId: ${_cidadeId}` }
        }

        let quantidadeBairros = await Bairro.count()
        let proximo = false

        if (quantidadeBairros > (Number(offset) + bairros.length)) {
            proximo = true
        }

        return { obj: bairros, proximo: proximo, offset: offset, total: quantidadeBairros }
    } catch (err) {
        return { err: `Erro ao buscar cidade por ID: ${err}` }
    }
}

service.salvarBairro = async (_bairro) => {
    if (!_bairro.nome) {
        return { err: "Nome do Bairro não informado" }
    }

    if (!_bairro.cidadeId) {
        return { err: "Cidade do Bairro não informada" }
    }

    let bairro = await Bairro.findOne({
        where: {
            nome: _bairro.nome,
            cidadeId: _bairro.cidadeId
        }
    })

    if (bairro != null) {
        return { err: "Bairro já existente para cidade" }
    }

    try {
        let bairroNovo = await Bairro.create(_bairro)

        return bairroNovo
    } catch (err) {
        return { err: `Ocorreu um erro ao criar o bairro: ${err}` }
    }
}

export default service