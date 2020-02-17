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
const TipoContrato_1 = require("../models/TipoContrato");
class TipoContratoService {
    validar(_tipoContrato, _acao) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_tipoContrato.nome) {
                return "Nome não informado";
            }
        });
    }
    buscarTodos(offset = 0, limit = 25, order = "ASC") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let tipoContratos = yield TipoContrato_1.TipoContrato.findAll({ limit: limit, offset: offset, order: [['id', order]] });
                if (tipoContratos.length === 0) {
                    throw new TypeError(`Nenhum tipo de contrato encontrado`);
                }
                let quantidade = yield TipoContrato_1.TipoContrato.count();
                let proximo = false;
                if (quantidade > (Number(offset) + tipoContratos.length)) {
                    proximo = true;
                }
                return { obj: tipoContratos, proximo: proximo, offset: offset, total: quantidade };
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
                let tipoContrato = yield TipoContrato_1.TipoContrato.findOne({
                    where: {
                        id: _id
                    }
                });
                if (!tipoContrato) {
                    throw new TypeError(`Tipo de contrato não encontrado`);
                }
                return tipoContrato;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    salvarTipoContrato(_tipoContrato) {
        return __awaiter(this, void 0, void 0, function* () {
            let inconsistencias = yield this.validar(_tipoContrato, 'criacao');
            if (inconsistencias) {
                throw new TypeError(inconsistencias);
            }
            try {
                let tipoContratoNovo = yield TipoContrato_1.TipoContrato.create(_tipoContrato);
                return tipoContratoNovo;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    atualizarTipoContrato(_id, _tipoContrato) {
        return __awaiter(this, void 0, void 0, function* () {
            let inconsistencias = yield this.validar(_tipoContrato, 'atualizacao');
            if (inconsistencias) {
                throw new TypeError(inconsistencias);
            }
            try {
                let tipoContratoAtualizado = yield TipoContrato_1.TipoContrato.update({
                    nome: _tipoContrato.nome,
                    descricao: _tipoContrato.descricao
                }, {
                    where: {
                        id: _id
                    }
                });
                return tipoContratoAtualizado;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    deletarTipoContrato(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_id) {
                throw new TypeError("ID não informado");
            }
            else {
                let tipoContratoDeletar = yield TipoContrato_1.TipoContrato.findOne({
                    where: {
                        id: _id
                    }
                });
                if (!tipoContratoDeletar) {
                    throw new TypeError(`Tipo de contrato não encontrado`);
                }
            }
            try {
                let tipoContratoDeletado = yield TipoContrato_1.TipoContrato.destroy({
                    where: {
                        id: _id
                    }
                });
                return tipoContratoDeletado;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
}
exports.TipoContratoService = TipoContratoService;
//# sourceMappingURL=TipoContratoService.js.map