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
const path = require("path");
const EmpresaService_1 = require("../services/EmpresaService");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
const UploadService_1 = require("../common/UploadService");
const TipoUpload_1 = require("../common/TipoUpload");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
let uploadService = new UploadService_1.UploadService();
let empresaService = new EmpresaService_1.EmpresaService();
let router = express.Router();
router.use(AuthMiddleware_1.default);
router.get("/:id/logo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let nomeLogo = yield empresaService.buscarCaminhoLogo(req.params.id);
    if (nomeLogo.err) {
        res.sendFile(path.join(__dirname, `../src/uploads/images/empresa/notfound.jpg`));
    }
    else {
        uploadService.getFile(nomeLogo, res);
    }
}));
router.post("/upload/logo", (req, res) => {
    try {
        let fileName = uploadService.saveFile(req, TipoUpload_1.TipoUpload.Empresa);
        empresaService.salvarCaminhoLogo(req.body.empresaId, fileName);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Upload realizado com sucesso"));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, "Ocorreu um erro"));
    }
});
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let empresas = yield empresaService.buscarTodos(req.query.offset, req.query.limit, req.query.order);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Empresas encontradas com sucesso", empresas.obj, empresas.proximo, empresas.offset, req.query.limit, empresas.total));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let empresa = yield empresaService.buscarPorId(req.params.id);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Empresa encontrada com sucesso", empresa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let empresaAtualizada = yield empresaService.atualizarEmpresa(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Empresa atualizada com sucesso", empresaAtualizada));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let empresa = yield empresaService.salvarEmpresa(req.body);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Empresa salva com sucesso", empresa));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let empresaDeletada = yield empresaService.deletarEmpresa(req.params.id);
        res.send(new ResponseBuilder_1.ResponseBuilder(true, "Empresa deletada com sucesso", empresaDeletada));
    }
    catch (error) {
        res.send(new ResponseBuilder_1.ResponseBuilder(false, error.message));
    }
}));
module.exports = router;
//# sourceMappingURL=EmpresaController.js.map