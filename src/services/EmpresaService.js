import Empresa from '../models/Empresa'
import validadorCpfCnpj from '../common/ValidadorCpfCnpj'
let service = {}

async function validar(_empresa, _operacao) {
    if(_operacao === 'atualizar'){
        let empresaAtualizar = await Empresa.findOne({
            where: {
                id: _empresa.id
            }
        })

        if(empresaAtualizar === null){
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
            if (_empresa.razaoSocial) {
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

    if (_empresa.idEndereco) {
        try {
            let endereco = await Endereco.findOne({
                where: {
                    id: _empresa.idEndereco
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

service.buscarTodos = async () => {
    try {
        let empresas = await Empresa.findAll()

        if (empresas.length === 0) {
            return { err: `Nenhuma empresa encontrada` }
        }

        return empresas
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
        let empresa = await Empresa.findOne({
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
            idEndereco: _empresaAtualizar.idEndereco
        },{
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