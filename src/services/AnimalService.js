import validadorDatas from '../common/ValidadorDatas'
import Especie from '../models/Especie'
import Raca from '../models/Raca'
import Cliente from '../models/Cliente'
import Animal from '../models/Animal'

let service = {}

async function validar(_animal, _acao) {
    if (!_animal.nome) {
        return "Nome não informado"
    }

    if(!_animal.idCliente){
        return "Cliente responsável não informado"
    }else{
        let clienteExiste = await Cliente.findOne({
            where: {
                id: _animal.idCliente
            }
        })

        if(!clienteExiste){
            return "Cliente não existente"
        }
    }

    if (!_animal.idEspecie) {
        return "Espécie não informada"
    } else {
        let especieExiste = await Especie.findOne({
            where: {
                id: _animal.idEspecie
            }
        })

        if (!especieExiste) {
            return "Especie não existente"
        }
    }

    if (!_animal.idRaca) {
        return "Raça não informada"
    } else {
        let racaExiste = await Raca.findOne({
            where: {
                id: _animal.idRaca
            }
        })

        if (!racaExiste) {
            return "Raça não existente"
        }
    }

    if (_animal.dataNascimento) {
        validadorDatas.validarData(_animal.dataNascimento)
    }
}

service.buscarTodos = async () => {
    try {
        let animais = await Animal.findAll()

        if (animais.length === 0) {
            return { err: `Nenhum animal encontrado` }
        }

        return animais
    }
    catch (err) {
        return { err: `Erro ao buscar animais: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    }

    try {
        let animal = await Animal.findOne({
            where: {
                id: _id
            }
        })

        if (!animal) {
            return { err: `Animal não encontrado` }
        }

        return animal
    } catch (err) {
        return { err: `Erro ao buscar especie: ${err}` }
    }
}

service.salvarAnimal = async (_animal) => {
    let inconsistencias = await validar(_animal, 'criacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let animalNovo = await Animal.create(_animal)

        return animalNovo
    } catch (err) {
        return { err: `Erro ao salvar animal: ${err}` }
    }
}

service.atualizarAnimal = async (_id, _animal) => {
    let inconsistencias = await validar(_animal, 'atualizacao')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        let animalAtualizado = await Animal.update({
            nome: _animal.nome,
            dataNascimento: _animal.dataNascimento,
            cor: _animal.cor,
            idCliente: _animal.idCliente,
            idEspecie: _animal.idEspecie,
            idRaca: _animal.idRaca
        }, {
            where: {
                id: _id
            }
        })

        return animalAtualizado
    } catch (err) {
        return { err: `Ocorreu um erro ao atualizar: ${err}` }
    }
}

service.deletarAnimal = async (_id) => {
    if (!_id) {
        return { err: "ID não informado" }
    } else {
        let animalDeletar = await Animal.findOne({
            where: {
                id: _id
            }
        })

        if (!animalDeletar) {
            return { err: `Animal não encontrado` }
        }
    }

    try {
        let animalDeletado = await Animal.destroy({
            where: {
                id: _id
            }
        })

        return animalDeletado
    } catch (err) {
        return { err: `Erro ao deletar animal: ${err}` }
    }
}

export default service