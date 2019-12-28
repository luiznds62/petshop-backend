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

async function validar(_empresa) {
    if (!_empresa.cpfCnpj) {
        return "Cpf/Cnpj não foi informado"
    } else {
        if (_empresa.cpfCnpj.length == 11) {
            if (validaCPF(_empresa.cpfCnpj)) {
                return "Cpf inválido"
            }
        }
        if (_empresa.cpfCnpj.length == 14) {
            if (_empresa.razaoSocial) {
                return "Razão Social não informada"
            }

            if (validarCNPJ(_empresa.cpfCnpj)) {
                return "Cnpj inválido"
            }
        }

        if (_empresa.cpfCnpj.length != 11 && _empresa.cpfCnpj.length != 14) {
            return "Cpf/Cnpj inválido"
        }
    }

    if (_empresa.nomeFantasia) {
        return "Nome Fantasia não informado"
    }
}

service.buscarTodos = async (req, res) => {
    try {
        let empresas = await Empresa.findAll()

        if (empresas.length === 0) {
            return new ResponseBuilder(false, `Nenhuma empresa encontrada`)
        }

        return new ResponseBuilder(true, "Enviando empresas", empresas)
    }
    catch (err) {
        return new ResponseBuilder(false, `Erro ao buscar empresas: ${err}`)
    }
}

service.salvarEmpresa = async (req, res) => {

}

export default service