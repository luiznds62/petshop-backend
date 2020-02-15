import { ValidadorData } from '../common/ValidadorDatas'
import { Especie } from '../models/Especie'
import { Raca } from '../models/Raca'
import { Cliente } from '../models/Cliente'
import { Animal } from '../models/Animal'

let validadorData = new ValidadorData()

export class AnimalService {

    async validar(_animal, _acao) {
        if (!_animal.nome) {
            return "Nome não informado"
        }

        if (!_animal.clienteId) {
            return "Cliente responsável não informado"
        } else {
            let clienteExiste = await Cliente.findOne({
                where: {
                    id: _animal.clienteId
                }
            })

            if (!clienteExiste) {
                return "Cliente não existente"
            }
        }

        if (!_animal.especieId) {
            return "Espécie não informada"
        } else {
            let especieExiste = await Especie.findOne({
                where: {
                    id: _animal.especieId
                }
            })

            if (!especieExiste) {
                return "Especie não existente"
            }
        }

        if (!_animal.racaId) {
            return "Raça não informada"
        } else {
            let racaExiste = await Raca.findOne({
                where: {
                    id: _animal.racaId
                }
            })

            if (!racaExiste) {
                return "Raça não existente"
            }
        }

        if (!_animal.genero) {
            return "Genero não informado"
        } else {
            if (_animal.genero != "M" && _animal.genero != "F") {
                return "Genero não existente"
            }
        }

        if (!_animal.porte) {
            return "Porte não informado"
        } else {
            if (!['Mini/Anão', 'Pequeno', 'Médio', 'Grande', 'Gigante'].includes(_animal.porte)) {
                return "Porte inválido"
            }
        }

        if (_animal.temperamento) {
            if (!['Calmo', 'Agressivo'].includes(_animal.temperamento)) {
                return "Temperamento inválido"
            }
        }

        if (_animal.dataNascimento) {
            if (!validadorData.validarData(_animal.dataNascimento)) {
                return "Data inválida"
            }
        }
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            if (limit > 100) {
                limit = 100
            }

            let animais = await Animal.findAll(
                { include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] }
            )

            if (animais.length === 0) {
                throw new TypeError(`Nenhum animal encontrado`)
            }

            let quantidadeAnimais = await Animal.count()
            let proximo = false

            if (quantidadeAnimais > (Number(offset) + animais.length)) {
                proximo = true
            }

            return { obj: animais, proximo: proximo, offset: offset, total: quantidadeAnimais }
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
            let animal = await Animal.findOne({
                include: [{ all: true }], where: {
                    id: _id
                }
            })

            if (!animal) {
                throw new TypeError(`Animal não encontrado`)
            }

            return animal
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarAnimal(_animal, offset = 0, limit = 25, order = "ASC") {
        let inconsistencias = await this.validar(_animal, 'criacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let animalNovo = await Animal.create(_animal)

            return animalNovo
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarAnimal(_id, _animal) {
        let inconsistencias = await this.validar(_animal, 'atualizacao')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let animalAtualizado = await Animal.update({
                nome: _animal.nome,
                dataNascimento: _animal.dataNascimento,
                cor: _animal.cor,
                clienteId: _animal.clienteId,
                especieId: _animal.especieId,
                racaId: _animal.racaId
            }, {
                where: {
                    id: _id
                }
            })

            return animalAtualizado
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarAnimal(_id) {
        if (!_id) {
            throw new TypeError("ID não informado")
        } else {
            let animalDeletar = await Animal.findOne({
                where: {
                    id: _id
                }
            })

            if (!animalDeletar) {
                throw new TypeError(`Animal não encontrado`)
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
            throw new TypeError(`${err.message}`)
        }
    }
}
