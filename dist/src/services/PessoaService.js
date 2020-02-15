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
const Pessoa_1 = require("../models/Pessoa");
class PessoaService {
    validar(_pessoa, _acao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_pessoa.nome) {
                return "Nome não informado";
            }
            if (!_pessoa.cpf) {
                return "CPF não informado";
            }
            else {
                let pessoaDuplicadada = yield Pessoa_1.Pessoa.findOne({
                    where: {
                        cpf: _pessoa.cpf
                    }
                });
                if (pessoaDuplicadada && _acao === 'criacao') {
                    return "CPF já cadastrado";
                }
                else if (_acao != 'atualizacao') {
                    if (!this.validadorCpfCnpj.validarCPF(_pessoa.cpf)) {
                        return "CPF inválido";
                    }
                }
            }
            if (!_pessoa.dataNascimento) {
                return "Data de nascimento não informada";
            }
            else {
                if (!this.validadorData.validarData(_pessoa.dataNascimento)) {
                    return "Data inválida";
                }
            }
            if (!_pessoa.genero) {
                return "Genero não informado";
            }
        });
    }
    buscarTodos(offset = 0, limit = 25, order = "ASC") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let pessoas = yield Pessoa_1.Pessoa.findAll({ limit: limit, offset: offset, order: [['id', order]] });
                if (pessoas.length === 0) {
                    return { err: `Nenhuma pessoa encontrado` };
                }
                let quantidade = yield Pessoa_1.Pessoa.count();
                let proximo = false;
                if (quantidade > (Number(offset) + pessoas.length)) {
                    proximo = true;
                }
                return { obj: pessoas, proximo: proximo, offset: offset, total: quantidade };
            }
            catch (err) {
                return { err: `Erro ao buscar pessoas: ${err}` };
            }
        });
    }
    buscarPorId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_id) {
                return { err: "ID não informado" };
            }
            try {
                let pessoa = yield Pessoa_1.Pessoa.findOne({
                    include: [{ all: true }], where: {
                        id: _id
                    }
                });
                if (!pessoa) {
                    return { err: `Pessoa não encontrada` };
                }
                return pessoa;
            }
            catch (err) {
                return { err: `Erro ao buscar pessoa: ${err}` };
            }
        });
    }
    salvarPessoa(_pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            let inconsistencias = yield this.validar(_pessoa, 'criacao');
            if (inconsistencias) {
                return { err: inconsistencias };
            }
            try {
                let pessoaNova = yield Pessoa_1.Pessoa.create(_pessoa);
                return pessoaNova;
            }
            catch (err) {
                return { err: `Erro ao salvar pessoa: ${err}` };
            }
        });
    }
    atualizarPessoa(_id, _pessoa) {
        return __awaiter(this, void 0, void 0, function* () {
            let inconsistencias = yield this.validar(_pessoa, 'atualizacao');
            if (inconsistencias) {
                return { err: inconsistencias };
            }
            try {
                let pessoaAtualizada = yield Pessoa_1.Pessoa.update({
                    nome: _pessoa.nome,
                    rg: _pessoa.rg,
                    dataNascimento: _pessoa.dataNascimento,
                    genero: _pessoa.genero
                }, {
                    where: {
                        id: _id
                    }
                });
                return pessoaAtualizada;
            }
            catch (err) {
                return { err: `Ocorreu um erro ao atualizar: ${err}` };
            }
        });
    }
    deletarPessoa(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_id) {
                return { err: "ID não informado" };
            }
            else {
                let pessoaDeletar = yield Pessoa_1.Pessoa.findOne({
                    where: {
                        id: _id
                    }
                });
                if (!pessoaDeletar) {
                    return { err: `Pessoa com ID: ${_id} não encontrada` };
                }
            }
            try {
                let pessoaDeletada = yield Pessoa_1.Pessoa.destroy({
                    where: {
                        id: _id
                    }
                });
                return pessoaDeletada;
            }
            catch (err) {
                return { err: `Erro ao deletar pessoa: ${err}` };
            }
        });
    }
}
exports.PessoaService = PessoaService;
