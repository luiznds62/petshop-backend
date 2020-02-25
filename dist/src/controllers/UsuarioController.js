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
const UsuarioService_1 = require("../services/UsuarioService");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
const RateLimiter_1 = require("../common/RateLimiter");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const router = express.Router();
let usuarioService = new UsuarioService_1.UsuarioService();
router.get("/:login", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuario = yield usuarioService.buscarPorLogin(req.params.login);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Usuário buscado com sucesso", usuario));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/", RateLimiter_1.default(45 * 60 * 1000, 15, new ResponseBuilder_1.ResponseBuilder(false, "Tentativas consequentes excedidas, tente novamente em 45 minutos")), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usuario = yield usuarioService.salvarUsuario(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Usuário salvo com sucesso", usuario));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/trocarsenha", AuthMiddleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usuario = yield usuarioService.trocarSenha(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Senha alterada com sucesso", usuario));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/esquecisenha", RateLimiter_1.default(60 * 60 * 1000, 15, new ResponseBuilder_1.ResponseBuilder(false, "Tentativas consequentes excedidas,tente novamente em 1 hora")), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let gerouToken = yield usuarioService.gerarTokenSenha(req.body.email);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Token gerado e enviado ao email", gerouToken));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/resetarsenha", RateLimiter_1.default(60 * 60 * 1000, 15, new ResponseBuilder_1.ResponseBuilder(false, "Tentativas consequentes excedidas,tente novamente em 1 hora")), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let senhaResetada = yield usuarioService.resetarSenha(req.body.email, req.body.senha, req.body.token);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Senha resetada com sucesso", senhaResetada));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/autenticar", RateLimiter_1.default(60 * 1000, 10, new ResponseBuilder_1.ResponseBuilder(false, "Quantidade de tentativas por minuto excedidas")), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let autenticacao = yield usuarioService.autenticar(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Autenticado com sucesso", autenticacao));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
module.exports = router;
//# sourceMappingURL=UsuarioController.js.map