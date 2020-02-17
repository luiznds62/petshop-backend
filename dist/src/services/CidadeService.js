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
const Cidade_1 = require("../models/Cidade");
const Estado_1 = require("../models/Estado");
class CidadeService {
    validar(_cidade) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_cidade.nome) {
                return "Nome não informado";
            }
            if (!_cidade.estadoId) {
                return "Estado não informado";
            }
            else {
                let estadoExiste = yield Estado_1.Estado.findOne({
                    where: {
                        id: _cidade.estadoId
                    }
                });
                if (!estadoExiste) {
                    return "Estado não existente";
                }
            }
        });
    }
    buscarTodos(offset = 0, limit = 25, order = "ASC") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let cidades = yield Cidade_1.Cidade.findAll({ include: [{ all: true }], limit: limit, offset: offset, order: [['id', order]] });
                if (cidades.length === 0) {
                    throw new TypeError(`Nenhuma cidade encontrada`);
                }
                let quantidade = yield Cidade_1.Cidade.count();
                let proximo = false;
                if (quantidade > (Number(offset) + cidades.length)) {
                    proximo = true;
                }
                return { obj: cidades, proximo: proximo, offset: offset, total: quantidade };
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    buscarPorId(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_id) {
                throw new TypeError("ID não informado");
            }
            try {
                let cidade = yield Cidade_1.Cidade.findOne({
                    include: [{ all: true }], where: {
                        id: _id
                    }
                });
                if (!cidade) {
                    throw new TypeError('Nenhuma cidade encontrada');
                }
                return cidade;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    buscarPorUFNome(_uf, _nome) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_nome) {
                throw new TypeError("Nome não informado");
            }
            if (!_uf) {
                throw new TypeError("UF não informada");
            }
            else {
                _uf = _uf.toUpperCase();
            }
            try {
                let estado = yield Estado_1.Estado.findOne({
                    where: {
                        sigla: _uf
                    }
                });
                if (estado) {
                    let cidade = yield Cidade_1.Cidade.findOne({
                        include: [{ all: true }], where: {
                            nome: _nome,
                            estadoId: estado.id
                        }
                    });
                    if (!cidade) {
                        throw new TypeError("Nenhuma cidade encontrada");
                    }
                    return cidade;
                }
                else {
                    throw new TypeError(`Estado não encontrado para UF: ${_uf}`);
                }
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    salvarCidade(_cidade) {
        return __awaiter(this, void 0, void 0, function* () {
            let inconsistencias = yield this.validar(_cidade);
            if (inconsistencias) {
                throw new TypeError(inconsistencias);
            }
            try {
                let cidadeNova = yield Cidade_1.Cidade.create(_cidade);
                return cidadeNova;
            }
            catch (error) {
                throw new TypeError("Erro ao salvar cidade");
            }
        });
    }
}
exports.CidadeService = CidadeService;
//# sourceMappingURL=CidadeService.js.map