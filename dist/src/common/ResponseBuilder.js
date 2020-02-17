"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseBuilder {
    constructor(sucesso = false, mensagem = "", objeto = [], proximo = false, offset = 0, limit = 25, total = 0) {
        return { sucesso: sucesso, mensagem: mensagem, objeto: objeto, proximo: proximo, offset: offset, limit: limit, total: total };
    }
}
exports.ResponseBuilder = ResponseBuilder;
//# sourceMappingURL=ResponseBuilder.js.map