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
const UsuarioHasEmpresa_1 = require("../models/UsuarioHasEmpresa");
const Usuario_1 = require("../models/Usuario");
const Empresa_1 = require("../models/Empresa");
class UsuarioHasEmpresaService {
    buscarTodos(offset = 0, limit = 25, order = "ASC") {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let usuarioHasEmpresas = yield UsuarioHasEmpresa_1.UsuarioHasEmpresa.findAll({ include: [{ all: true }], offset: offset, limit: limit, order: [['id', order]] });
                if (usuarioHasEmpresas.length === 0) {
                    throw new TypeError(`Nenhuma usuário vinculado a empresa encontrado`);
                }
                let qtd = yield UsuarioHasEmpresa_1.UsuarioHasEmpresa.count();
                let proximo = false;
                if (qtd > (Number(offset) + usuarioHasEmpresas.length)) {
                    proximo = true;
                }
                return { obj: usuarioHasEmpresas, proximo: proximo, offset: offset, total: qtd };
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    salvarUsuarioHasEmpresa(_usuarioHasEmpresa) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_usuarioHasEmpresa.usuarioId) {
                throw new TypeError("Usuário não informado");
            }
            else {
                let usuario = yield Usuario_1.Usuario.findOne({
                    where: {
                        id: _usuarioHasEmpresa.usuarioId
                    }
                });
                if (usuario === null) {
                    throw new TypeError("Usuário não encontrado");
                }
            }
            if (!_usuarioHasEmpresa.empresaId) {
                throw new TypeError("Empresa não informada");
            }
            else {
                let empresa = yield Empresa_1.Empresa.findOne({
                    where: {
                        id: _usuarioHasEmpresa.empresaId
                    }
                });
                if (empresa === null) {
                    throw new TypeError("Empresa não encontrada");
                }
            }
            if (!_usuarioHasEmpresa.perfil) {
                throw new TypeError("Perfil de usuário não informado");
            }
            try {
                let usuarioHasEmpresaNovo = yield UsuarioHasEmpresa_1.UsuarioHasEmpresa.create(_usuarioHasEmpresa);
                return usuarioHasEmpresaNovo;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    vincularUsuarioDeEmpresa(_empresaId, _usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_usuarioId) {
                throw new TypeError("ID do usuário não informado");
            }
            else {
                let usuario = yield Usuario_1.Usuario.findOne({
                    where: {
                        id: _usuarioId
                    }
                });
                if (!usuario) {
                    throw new TypeError(`Usuário com ID: ${_usuarioId} não encontrado`);
                }
            }
            if (!_empresaId) {
                throw new TypeError("Id da empresa não informado");
            }
            else {
                let empresa = yield Empresa_1.Empresa.findOne({
                    where: {
                        id: _empresaId
                    }
                });
                if (!empresa) {
                    throw new TypeError(`Empresa com ID: ${_empresaId} não encontrada`);
                }
            }
            try {
                let usuarioHasEmpresaAtualizar = yield UsuarioHasEmpresa_1.UsuarioHasEmpresa.update({
                    habilitado: true
                }, {
                    where: {
                        usuarioId: _usuarioId,
                        empresaId: _empresaId
                    }
                });
                return usuarioHasEmpresaAtualizar;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    desvincularUsuarioDeEmpresa(_empresaId, _usuarioId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_usuarioId) {
                throw new TypeError("ID do usuário não informado");
            }
            else {
                let usuario = yield Usuario_1.Usuario.findOne({
                    where: {
                        id: _usuarioId
                    }
                });
                if (!usuario) {
                    throw new TypeError(`Usuário com ID: ${_usuarioId} não encontrado`);
                }
            }
            if (!_empresaId) {
                throw new TypeError("Id da empresa não informado");
            }
            else {
                let empresa = yield Empresa_1.Empresa.findOne({
                    where: {
                        id: _empresaId
                    }
                });
                if (!empresa) {
                    throw new TypeError(`Empresa com ID: ${_empresaId} não encontrada`);
                }
            }
            try {
                let usuarioHasEmpresaAtualizar = yield UsuarioHasEmpresa_1.UsuarioHasEmpresa.update({
                    habilitado: false
                }, {
                    where: {
                        usuarioId: _usuarioId,
                        empresaId: _empresaId
                    }
                });
                return usuarioHasEmpresaAtualizar;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
    buscarPorUsuario(_usuarioId, offset = 0, limit = 25, order = "ASC") {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_usuarioId) {
                throw new TypeError("ID do Usuário não informado");
            }
            try {
                let usuarioHasEmpresa = yield UsuarioHasEmpresa_1.UsuarioHasEmpresa.findAll({
                    include: [{ all: true }], offset: offset, limit: limit, order: [['id', order]],
                    where: {
                        usuarioId: _usuarioId
                    }
                });
                if (!usuarioHasEmpresa) {
                    throw new TypeError(`Vinculo de Usuário com Empresa não encontrado para o usuarioId: ${_usuarioId}`);
                }
                return usuarioHasEmpresa;
            }
            catch (err) {
                throw new TypeError(`${err.message}`);
            }
        });
    }
}
exports.UsuarioHasEmpresaService = UsuarioHasEmpresaService;
