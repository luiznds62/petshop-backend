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
const express = require("express");
const EstadoService_1 = require("../services/EstadoService");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
let estadoService = new EstadoService_1.EstadoService();
let router = express.Router();
router.use(AuthMiddleware_1.default);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let estados = yield estadoService.buscarTodos(req.query.offset, req.query.limit, req.query.order);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Estados encontrados com sucesso", estados.obj, estados.proximo, estados.offset, req.query.limit, estados.total));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.get("/:uf", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let estado = yield estadoService.buscarPorUf(req.params.uf);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Estado encontrado com sucesso", estado));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let estado = yield estadoService.salvarEstado(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Estado salvo com sucesso", estado));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
module.exports = router;
//# sourceMappingURL=EstadoController.js.map