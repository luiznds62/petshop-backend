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
const Estado_1 = require("../models/Estado");
class EstadoService {
    validar(_estado) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_estado.nome) {
                return "Nome não informado";
            }
            else {
                let estadoExiste = yield Estado_1.Estado.findOne({
                    where: {
                        nome: _estado.nome
                    }
                });
                if (estadoExiste) {
                    return "Estado já existente";
                }
            }
            if (!_estado.sigla) {
                return "Sigla não informada";
            }
            else {
                if (_estado.sigla.length > 2) {
                    return "Sigla inválida";
                }
                let estadoExiste = yield Estado_1.Estado.findOne({
                    where: {
                        sigla: _estado.sigla
                    }
                });
                if (estadoExiste) {
                    return "Estado já existente";
                }
            }
        });
    }
    buscarTodos(offset = 0, limit = 25, order = "ASC") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let estados = yield Estado_1.Estado.findAll({ limit: limit, offset: offset, order: [['id', order]] });
                if (estados.length === 0) {
                    throw new TypeError(`Nenhum estado encontrado`);
                }
                let quantidade = yield Estado_1.Estado.count();
                let proximo = false;
                if (quantidade > (Number(offset) + estados.length)) {
                    proximo = true;
                }
                return { obj: estados, proximo: proximo, offset: offset, total: quantidade };
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    buscarPorUf(_uf) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_uf) {
                throw new TypeError("UF não informado");
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
                if (!estado) {
                    throw new TypeError(`Nenhum estado encontrado para a UF: ${_uf}`);
                }
                return estado;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    salvarEstado(_estado) {
        return __awaiter(this, void 0, void 0, function* () {
            let inconsistencias = yield this.validar(_estado);
            if (inconsistencias) {
                throw new TypeError(inconsistencias);
            }
            try {
                let estadoSalvo = yield Estado_1.Estado.create(_estado);
                return estadoSalvo;
            }
            catch (error) {
                throw new TypeError("Erro ao salvar estado");
            }
        });
    }
}
exports.EstadoService = EstadoService;
