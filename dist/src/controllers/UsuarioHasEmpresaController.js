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
const UsuarioHasEmpresaService_1 = require("../services/UsuarioHasEmpresaService");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
let usuarioHasEmpresaService = new UsuarioHasEmpresaService_1.UsuarioHasEmpresaService();
const router = express.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuariosHasEmpresa = yield usuarioHasEmpresaService.buscarTodos(req.query.offset, req.query.limit, req.query.order);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, 'Usuários encontrados com sucesso', usuariosHasEmpresa.obj, usuariosHasEmpresa.proximo, usuariosHasEmpresa.offset, req.query.limit, usuariosHasEmpresa.total));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.get('/usuario/:idUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuariosHasEmpresa = yield usuarioHasEmpresaService.buscarPorUsuario(req.params.idUsuario);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, 'Usuário vinculado a Empresa buscado com sucesso', usuariosHasEmpresa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.delete('/empresa/:idEmpresa/usuario/:idUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuariosHasEmpresa = yield usuarioHasEmpresaService.desvincularUsuarioDeEmpresa(req.params.idEmpresa, req.params.idUsuario);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, 'Usuário desvinculado da Empresa buscado com sucesso', usuariosHasEmpresa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post('/empresa/:idEmpresa/usuario/:idUsuario', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        var usuariosHasEmpresa = yield usuarioHasEmpresaService.vincularUsuarioDeEmpresa(req.params.idEmpresa, req.params.idUsuario);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, 'Usuário vinculado da Empresa buscado com sucesso', usuariosHasEmpresa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let usuarioHasEmpresa = yield usuarioHasEmpresaService.salvarUsuarioHasEmpresa(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, 'Usuário has Empresa salvo com sucesso', usuarioHasEmpresa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
exports.default = router;
