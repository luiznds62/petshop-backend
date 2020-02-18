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
const EmpresaService_1 = require("../services/EmpresaService");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const ResponseBuilder_1 = require("../common/ResponseBuilder");
const multer = require("multer");
const path = require("path");
const multerConfig = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, "src/uploads/images/empresa");
        },
        filename: function (req, file, next) {
            const ext = file.mimetype.split("/")[1];
            next(null, file.fieldname + "-" + Date.now() + "." + ext);
        }
    }),
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }
        const image = file.mimetype.startsWith("image/");
        if (image) {
            next(null, true);
        }
        else {
            next({ message: "Extensão não suportada" }, false);
        }
    }
};
let empresaService = new EmpresaService_1.EmpresaService();
let router = express.Router();
router.use(AuthMiddleware_1.default);
router.get("/:id/logo", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let nomeLogo = yield empresaService.buscarCaminhoLogo(req.params.id);
    if (nomeLogo.err) {
        res.sendFile(path.join(__dirname, `../src/uploads/images/empresa/notfound.jpg`));
    }
    else {
        res.sendFile(path.join(__dirname, `../src/uploads/images/empresa/${nomeLogo}`));
    }
}));
router.post("/upload/logo", multer(multerConfig).single("logo"), (req, res) => {
    try {
        if (req.file) {
            req.body.logo = req.file.filename;
        }
        empresaService.salvarCaminhoLogo(req.body.empresaId, req.file.filename);
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