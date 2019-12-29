import Empresa from '../models/Empresa'
import ResponseBuilder from '../common/ResponseBuilder'

let service = {}

function validarCNPJ(cnpj) {

    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function validaCPF(cpf) {
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
        return false;
    for (i = 0; i < cpf.length - 1; i++)
        if (cpf.charAt(i) != cpf.charAt(i + 1)) {
            digitos_iguais = 0;
            break;
        }
    if (!digitos_iguais) {
        numeros = cpf.substring(0, 9);
        digitos = cpf.substring(9);
        soma = 0;
        for (i = 10; i > 1; i--)
            soma += numeros.charAt(10 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;
        numeros = cpf.substring(0, 10);
        soma = 0;
        for (i = 11; i > 1; i--)
            soma += numeros.charAt(11 - i) * i;
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        return true;
    }
    else
        return false;
}

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
            if (!validaCPF(_empresa.cpfCnpj)) {
                return "Cpf inválido"
            }
        }
        if (_empresa.cpfCnpj.length == 14) {
            if (_empresa.razaoSocial) {
                return "Razão Social não informada"
            }

            if (!validarCNPJ(_empresa.cpfCnpj)) {
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