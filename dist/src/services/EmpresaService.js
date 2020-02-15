"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Empresa_1 = require("../models/Empresa");
const ValidadorCpfCnpj_1 = require("../common/ValidadorCpfCnpj");
const Endereco_1 = require("../models/Endereco");
let validadorCpfCnpj = new ValidadorCpfCnpj_1.ValidadorCpfCnpj();
class EmpresaService {
    validar(_empresa, _operacao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (_operacao === 'atualizar') {
                let empresaAtualizar = yield Empresa_1.Empresa.findOne({
                    where: {
                        id: _empresa.id
                    }
                });
                if (empresaAtualizar === null) {
                    return "Empresa não encontrada";
                }
            }
            if (!_empresa.cpfCnpj) {
                return "Cpf/Cnpj não foi informado";
            }
            else {
                if (_empresa.cpfCnpj.length == 11) {
                    if (!validadorCpfCnpj.validarCPF(_empresa.cpfCnpj)) {
                        return "Cpf inválido";
                    }
                }
                if (_empresa.cpfCnpj.length == 14) {
                    if (!_empresa.razaoSocial) {
                        return "Razão Social não informada";
                    }
                    if (!validadorCpfCnpj.validarCNPJ(_empresa.cpfCnpj)) {
                        return "Cnpj inválido";
                    }
                }
                if (_empresa.cpfCnpj.length != 11 && _empresa.cpfCnpj.length != 14) {
                    return "Cpf/Cnpj inválido";
                }
                let empresaVerificar = yield Empresa_1.Empresa.findOne({
                    where: {
                        cpfCnpj: _empresa.cpfCnpj
                    }
                });
                if (empresaVerificar != null) {
                    return "Cpf/Cnpj já utilizado";
                }
            }
            if (!_empresa.nomeFantasia) {
                return "Nome Fantasia não informado";
            }
            if (_empresa.enderecoId) {
                try {
                    let endereco = yield Endereco_1.Endereco.findOne({
                        where: {
                            id: _empresa.enderecoId
                        }
                    });
                    if (endereco === null) {
                        return "Endereco não encontrado";
                    }
                }
                catch (err) {
                    return `Erro ao buscar endereco: ${err.message}`;
                }
            }
        });
    }
    buscarCaminhoLogo(_empresaId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_empresaId) {
                throw new TypeError("Id não informado");
            }
            let empresa = yield Empresa_1.Empresa.findOne({
                where: {
                    id: _empresaId
                }
            });
            if (!empresa) {
                throw new TypeError("Empresa não encontrada");
            }
            else {
                if (empresa.logo === "") {
                    throw new TypeError("Logo não encontrada");
                }
            }
            return empresa.logo;
        });
    }
    salvarCaminhoLogo(_empresaId, _path) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_empresaId) {
                throw new TypeError("Empresa não informada");
            }
            else {
                let empresaExiste = yield Empresa_1.Empresa.findOne({
                    where: {
                        id: _empresaId
                    }
                });
                if (!empresaExiste) {
                    throw new TypeError("Empresa não encontrada");
                }
            }
            if (!_path) {
                throw new TypeError("Caminho da imagem não encontrado");
            }
            let empresaAtualizada = yield Empresa_1.Empresa.update({
                logo: _path
            }, {
                where: {
                    id: _empresaId
                }
            });
            return empresaAtualizada;
        });
    }
    buscarTodos(offset = 0, limit = 25, order = "ASC") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let empresas = yield Empresa_1.Empresa.findAll({ include: [{ all: true }], offset: offset, limit: limit, order: [['id', order]] });
                if (empresas.length === 0) {
                    throw new TypeError(`Nenhuma empresa encontrada`);
                }
                let qtd = yield Empresa_1.Empresa.count();
                let proximo = false;
                if (qtd > (Number(offset) + empresas.length)) {
                    proximo = true;
                }
                return { obj: empresas, proximo: proximo, offset: offset, total: qtd };
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    salvarEmpresa(_empresa) {
        return __awaiter(this, void 0, void 0, function* () {
            let inconsistencias = yield this.validar(_empresa, 'salvar');
            if (inconsistencias) {
                throw new TypeError(inconsistencias);
            }
            try {
                return yield Empresa_1.Empresa.create(_empresa);
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    buscarPorId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_id) {
                return "Id não informado";
            }
            try {
                let empresa = yield Empresa_1.Empresa.findOne({
                    include: [{ all: true }],
                    where: {
                        id: _id
                    }
                });
                if (empresa === null) {
                    throw new TypeError("Nenhuma empresa encontrada");
                }
                return empresa;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    atualizarEmpresa(_empresaAtualizar) {
        return __awaiter(this, void 0, void 0, function* () {
            let inconsistencias = yield this.validar(_empresaAtualizar, 'atualizar');
            if (inconsistencias) {
                throw new TypeError(inconsistencias);
            }
            try {
                let empresaAtualizar = yield Empresa_1.Empresa.update({
                    razaoSocial: _empresaAtualizar.razaoSocial,
                    nomeFantasia: _empresaAtualizar.nomeFantasia,
                    cpfCnpj: _empresaAtualizar.cpfCnpj,
                    enderecoId: _empresaAtualizar.enderecoId
                }, {
                    where: {
                        id: _empresaAtualizar.id
                    }
                });
                return empresaAtualizar;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    deletarEmpresa(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_id) {
                throw new TypeError("Id não informada");
            }
            try {
                return yield Empresa_1.Empresa.destroy({
                    where: {
                        id: _id
                    }
                });
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
}
exports.EmpresaService = EmpresaService;
