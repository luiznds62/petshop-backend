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
let service = {};
function validar(_tipoContrato, _acao) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!_tipoContrato.nome) {
            return "Nome não informado";
        }
    });
}
service.buscarTodos = (offset = 0, limit = 25, order = "ASC") => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tipoContratos = yield TipoContrato_1.default.findAll({ limit: limit, offset: offset, order: [['id', order]] });
        if (tipoContratos.length === 0) {
            return { err: `Nenhum tipo de contrato encontrado` };
        }
        let quantidade = yield TipoContrato_1.default.count();
        let proximo = false;
        if (quantidade > (Number(offset) + tipoContratos.length)) {
            proximo = true;
        }
        return { obj: tipoContratos, proximo: proximo, offset: offset, total: quantidade };
    }
    catch (err) {
        return { err: `Erro ao buscar tipo de contratos: ${err}` };
    }
});
service.buscarPorId = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        return { err: "ID não informado" };
    }
    try {
        let tipoContrato = yield TipoContrato_1.default.findOne({
            where: {
                id: _id
            }
        });
        if (!tipoContrato) {
            return { err: `Tipo de contrato não encontrado` };
        }
        return tipoContrato;
    }
    catch (err) {
        return { err: `Erro ao buscar tipo de contrato: ${err}` };
    }
});
service.salvarTipoContrato = (_tipoContrato) => __awaiter(void 0, void 0, void 0, function* () {
    let inconsistencias = yield validar(_tipoContrato, 'criacao');
    if (inconsistencias) {
        return { err: inconsistencias };
    }
    try {
        let tipoContratoNovo = yield TipoContrato_1.default.create(_tipoContrato);
        return tipoContratoNovo;
    }
    catch (err) {
        return { err: `Erro ao salvar tipo de contrato: ${err}` };
    }
});
service.atualizarTipoContrato = (_id, _tipoContrato) => __awaiter(void 0, void 0, void 0, function* () {
    let inconsistencias = yield validar(_tipoContrato, 'atualizacao');
    if (inconsistencias) {
        return { err: inconsistencias };
    }
    try {
        let tipoContratoAtualizado = yield TipoContrato_1.default.update({
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
        return { err: `Ocorreu um erro ao atualizar: ${err}` };
    }
});
service.deletarTipoContrato = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!_id) {
        return { err: "ID não informado" };
    }
    else {
        let tipoContratoDeletar = yield TipoContrato_1.default.findOne({
            where: {
                id: _id
            }
        });
        if (!tipoContratoDeletar) {
            return { err: `Tipo de contrato não encontrado` };
        }
    }
    try {
        let tipoContratoDeletado = yield TipoContrato_1.default.destroy({
            where: {
                id: _id
            }
        });
        return tipoContratoDeletado;
    }
    catch (err) {
        return { err: `Erro ao deletar tipo de contrato: ${err}` };
    }
});
exports.default = service;
