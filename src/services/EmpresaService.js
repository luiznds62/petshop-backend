import Empresa from '../models/Empresa'
import validadorCpfCnpj from '../common/ValidadorCpfCnpj'
import Endereco from '../models/Endereco'
let service = {}

async function validar(_empresa, _operacao) {
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
            return `Erro ao buscar endereco: ${err}`
        }
    }
}

service.buscarCaminhoLogo = async (_empresaId) => {
    if (!_empresaId) {
        return { err: "Id não informado" }
    }

    let empresa = await Empresa.findOne({
        where: {
            id: _empresaId
        }
    })

    if (!empresa) {
        return { err: "Empresa não encontrada" }
    }

    return empresa.logo
}

service.salvarCaminhoLogo = async (_empresaId, _path) => {
    if (!_empresaId) {
        return { err: "Empresa não informada" }
    } else {
        let empresaExiste = await Empresa.findOne({
            where: {
                id: _empresaId
            }
        })

        if (!empresaExiste) {
            return { err: "Empresa não encontrada" }
        }
    }

    if (!_path) {
        return { err: "Caminho da imagem não encontrado" }
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

service.buscarTodos = async (offset = 0, limit = 25, order = "ASC") => {
    try {
        let empresas = await Empresa.findAll({ include: [{ all: true }], offset: offset, limit: limit, order: [['id', order]] })

        if (empresas.length === 0) {
            return { err: `Nenhuma empresa encontrada` }
        }

        let qtd = await Empresa.count()
        let proximo = false

        if (qtd > (Number(offset) + empresas.length)) {
            proximo = true
        }

        return { obj: empresas, proximo: proximo, offset: offset, total: qtd }
    }
    catch (err) {
        return { err: `Erro ao buscar empresas: ${err}` }
    }
}

service.salvarEmpresa = async (_empresa) => {
    let inconsistencias = await validar(_empresa, 'salvar')

    if (inconsistencias) {
        return { err: inconsistencias }
    }

    try {
        return await Empresa.create(_empresa)
    } catch (err) {
        return { err: `Erro ao salvar a empresa: ${err}` }
    }
}

service.buscarPorId = async (_id) => {
    if (!_id) {
        return "Id não informado"
    }

    try {
        let empresa = await Empresa.findOne({ include: [{ all: true }] }, {
            where: {
                id: _id
            }
        })

        if (empresa === null) {
            return { err: "Nenhuma empresa encontrada" }
        }

        return empresa
    } catch (err) {
        return { err: `Erro ao buscar empresa: ${err}` }
    }
}

service.atualizarEmpresa = async (_empresaAtualizar) => {
    let inconsistencias = await validar(_empresaAtualizar, 'atualizar')

    if (inconsistencias) {
        return { err: inconsistencias }
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
        return { err: `Erro ao atualizar: ${err}` }
    }
}

service.deletarEmpresa = async (_id) => {
    if (!_id) {
        return "Id não informada"
    }

    try {
        return await Empresa.destroy({
            where: {
                id: _id
            }
        })
    } catch (err) {
        return { err: `Erro ao deletar a empresa: ${err}` }
    }
}

export default service