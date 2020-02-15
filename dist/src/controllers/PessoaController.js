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
const express = require("express");
const PessoaService_1 = require("../services/PessoaService");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
let pessoaService = new PessoaService_1.PessoaService();
let router = express.Router();
router.use(AuthMiddleware_1.default);
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pessoas = yield pessoaService.buscarTodos(req.query.offset, req.query.limit, req.query.order);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, 'Pessoas encontrados com sucesso', pessoas.obj, pessoas.proximo, pessoas.offset, req.query.limit, pessoas.total));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pessoa = yield pessoaService.buscarPorId(req.params.id);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Pessoa buscada com sucesso", pessoa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pessoa = yield pessoaService.salvarPessoa(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Pessoa salva com sucesso", pessoa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pessoa = yield pessoaService.atualizarPessoa(req.params.id, req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Pessoa atualizada com sucesso", pessoa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let pessoa = yield pessoaService.deletarPessoa(req.params.id);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Pessoa deletada com sucesso", pessoa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
exports.default = router;
