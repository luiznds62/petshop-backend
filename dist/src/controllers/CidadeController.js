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
const CidadeService_1 = require("../services/CidadeService");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
let cidadeService = new CidadeService_1.CidadeService();
let router = express.Router();
router.use(AuthMiddleware_1.default);
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cidades = yield cidadeService.buscarTodos(req.query.offset, req.query.limit, req.query.order);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Cidades encontradas com sucesso", cidades.obj, cidades.proximo, cidades.offset, req.query.limit, cidades.total));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cidade = yield cidadeService.buscarPorId(req.params.id);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Cidade encontrada com sucesso", cidade));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.get("/:uf/:nome", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cidade = yield cidadeService.buscarPorUFNome(req.params.uf, req.params.nome);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Cidade encontrada com sucesso", cidade));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let cidade = yield cidadeService.salvarCidade(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Cidade salva com sucesso", cidade));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
module.exports = router;
//# sourceMappingURL=CidadeController.js.map