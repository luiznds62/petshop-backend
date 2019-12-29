import Bairro from '../models/Bairro'

let service = {}

service.buscarTodos = async () => {
    try {
        let bairros = await Bairro.findAll()

        if (bairros.length === 0) {
            return { err: `Nenhuma Bairro encontrada` }
        }

        return bairros
    }
    catch (err) {
        return { err: `Erro ao buscar Bairros: ${err}` }
    }
}

service.salvarBairro = async (_bairro) => {
    if (!_bairro.nome) {
        return { err: "Nome do Bairro não informado" }
    }

    if (!_bairro.idCidade) {
        return { err: "Cidade do Bairro não informada" }
    }

    let bairro = await Bairro.findOne({
        where: {
            nome: _bairro.nome,
            idCidade: _bairro.idCidade
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