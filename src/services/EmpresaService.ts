import { Empresa } from '../models/Empresa'
import { ValidadorCpfCnpj } from '../common/ValidadorCpfCnpj'
import { Endereco } from '../models/Endereco'

let validadorCpfCnpj = new ValidadorCpfCnpj()

export class EmpresaService {
    async validar(_empresa, _operacao) {
        if (_operacao === 'atualizar') {
            let empresaAtualizar = await Empresa.findOne({
                where: {
                    id: _empresa.id
                }
            })

            if (empresaAtualizar === null) {
                return "Empresa não encontrada"
            }
        }

        if (!_empresa.cpfCnpj) {
            return "Cpf/Cnpj não foi informado"
        } else {
            if (_empresa.cpfCnpj.length == 11) {
                if (!validadorCpfCnpj.validarCPF(_empresa.cpfCnpj)) {
                    return "Cpf inválido"
                }
            }
            if (_empresa.cpfCnpj.length == 14) {
                if (!_empresa.razaoSocial) {
                    return "Razão Social não informada"
                }

                if (!validadorCpfCnpj.validarCNPJ(_empresa.cpfCnpj)) {
                    return "Cnpj inválido"
                }
            }

            if (_empresa.cpfCnpj.length != 11 && _empresa.cpfCnpj.length != 14) {
                return "Cpf/Cnpj inválido"
            }

            let empresaVerificar = await Empresa.findOne({
                where: {
                    cpfCnpj: _empresa.cpfCnpj
                }
            })

            if (empresaVerificar != null) {
                return "Cpf/Cnpj já utilizado"
            }
        }

        if (!_empresa.nomeFantasia) {
            return "Nome Fantasia não informado"
        }

        if (_empresa.enderecoId) {
            try {
                let endereco = await Endereco.findOne({
                    where: {
                        id: _empresa.enderecoId
                    }
                })

                if (endereco === null) {
                    return "Endereco não encontrado"
                }
            } catch (err) {
                return `Erro ao buscar endereco: ${err.message}`
            }
        }
    }

    async buscarCaminhoLogo(_empresaId) {
        if (!_empresaId) {
            throw new TypeError("Id não informado")
        }

        let empresa = await Empresa.findOne({
            where: {
                id: _empresaId
            }
        })

        if (!empresa) {
            throw new TypeError("Empresa não encontrada")
        } else {
            if (empresa.logo === "") {
                throw new TypeError("Logo não encontrada")
            }
        }

        return empresa.logo
    }

    async salvarCaminhoLogo(_empresaId, _path) {
        if (!_empresaId) {
            throw new TypeError("Empresa não informada")
        } else {
            let empresaExiste = await Empresa.findOne({
                where: {
                    id: _empresaId
                }
            })

            if (!empresaExiste) {
                throw new TypeError("Empresa não encontrada")
            }
        }

        if (!_path) {
            throw new TypeError("Caminho da imagem não encontrado")
        }

        let empresaAtualizada = await Empresa.update({
            logo: _path
        }, {
            where: {
                id: _empresaId
            }
        })

        return empresaAtualizada
    }

    async buscarTodos(offset = 0, limit = 25, order = "ASC") {
        try {
            let empresas = await Empresa.findAll({ include: [{ all: true }], offset: offset, limit: limit, order: [['id', order]] })

            if (empresas.length === 0) {
                throw new TypeError(`Nenhuma empresa encontrada`)
            }

            let qtd = await Empresa.count()
            let proximo = false

            if (qtd > (Number(offset) + empresas.length)) {
                proximo = true
            }

            return { obj: empresas, proximo: proximo, offset: offset, total: qtd }
        }
        catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async salvarEmpresa(_empresa) {
        let inconsistencias = await this.validar(_empresa, 'salvar')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            return await Empresa.create(_empresa)
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async buscarPorId(_id) {
        if (!_id) {
            return "Id não informado"
        }

        try {
            let empresa = await Empresa.findOne({
                include: [{ all: true }],
                where: {
                    id: _id
                }
            })

            if (empresa === null) {
                throw new TypeError("Nenhuma empresa encontrada")
            }

            return empresa
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async atualizarEmpresa(_empresaAtualizar) {
        let inconsistencias = await this.validar(_empresaAtualizar, 'atualizar')

        if (inconsistencias) {
            throw new TypeError(inconsistencias)
        }

        try {
            let empresaAtualizar = await Empresa.update({
                razaoSocial: _empresaAtualizar.razaoSocial,
                nomeFantasia: _empresaAtualizar.nomeFantasia,
                cpfCnpj: _empresaAtualizar.cpfCnpj,
                enderecoId: _empresaAtualizar.enderecoId
            }, {
                where: {
                    id: _empresaAtualizar.id
                }
            })

            return empresaAtualizar
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }

    async deletarEmpresa(_id) {
        if (!_id) {
            throw new TypeError("Id não informada")
        }

        try {
            return await Empresa.destroy({
                where: {
                    id: _id
                }
            })
        } catch (err) {
            throw new TypeError(`${err.message}`)
        }
    }
}

