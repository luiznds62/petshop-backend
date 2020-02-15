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
const Usuario_1 = require("../models/Usuario");
const EmailService_1 = require("./EmailService");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth.json");
const crypto = require("crypto");
const templateResetEmail_1 = require("../../config/email/templateResetEmail");
let emailService = new EmailService_1.EmailService();
class UsuarioService {
    gerarToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 86400,
        });
    }
    buscarPorEmailValidate(_email) {
        return __awaiter(this, void 0, void 0, function* () {
            return Usuario_1.Usuario.findOne({
                where: {
                    email: _email
                }
            });
        });
    }
    buscarPorLoginValidate(_login) {
        return __awaiter(this, void 0, void 0, function* () {
            return Usuario_1.Usuario.findOne({
                where: {
                    login: _login
                }
            });
        });
    }
    validar(_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_usuario.login) {
                return "Login não informado";
            }
            if (!_usuario.senha) {
                return "Senha não informada";
            }
            if (_usuario.senha.length < 8) {
                return "A senha precisa conter no mínimo 8 caractéres";
            }
            if (!_usuario.email) {
                return "Email não informado";
            }
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_usuario.email))) {
                return "Email inválido";
            }
            if ((yield this.buscarPorLoginValidate(_usuario.login)) != null) {
                return "Login já utilizado";
            }
            if ((yield this.buscarPorEmailValidate(_usuario.email)) != null) {
                return "Email já utilizado";
            }
        });
    }
    trocarSenha(_dados) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_dados.login) {
                throw new TypeError("Usuário não informado");
            }
            if (!_dados.senhaAntiga) {
                throw new TypeError("Senha antiga não informada");
            }
            else {
                let usuarioExiste = yield Usuario_1.Usuario.findOne({
                    where: {
                        login: _dados.login
                    }
                });
                if (usuarioExiste.senha != _dados.senhaAntiga) {
                    throw new TypeError("Senha antiga inválida");
                }
            }
            if (!_dados.senhaNova) {
                throw new TypeError("Nova senha não informada");
            }
            else {
                if (_dados.senhaNova.length < 8) {
                    throw new TypeError("A nova senha precisa conter no mínimo 8 caractéres");
                }
            }
            try {
                let usuarioAlterado = yield Usuario_1.Usuario.update({
                    senha: _dados.senhaNova
                }, {
                    where: {
                        login: _dados.login
                    }
                });
                return usuarioAlterado;
            }
            catch (error) {
                throw new TypeError("Ocorreu um erro ao alterar");
            }
        });
    }
    resetarSenha(_email, _senha, _token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_senha) {
                throw new TypeError("Nova senha não informada");
            }
            if (!_token) {
                throw new TypeError("Token não informado");
            }
            if (!_email) {
                throw new TypeError("Email não informado");
            }
            else {
                let usuarioExiste = yield Usuario_1.Usuario.findOne({
                    where: {
                        email: _email
                    }
                });
                if (!usuarioExiste) {
                    throw new TypeError("Nenhum usuário encontrado para o email informado");
                }
                let agora = new Date();
                if (_token != usuarioExiste.tokenResetarSenha) {
                    throw new TypeError("Token inválido");
                }
                if (agora > usuarioExiste.expiracaoToken) {
                    throw new TypeError("Token expirado");
                }
                let usuarioAlterado = yield Usuario_1.Usuario.update({
                    senha: _senha
                }, {
                    where: {
                        email: _email
                    }
                });
                return usuarioAlterado;
            }
        });
    }
    gerarTokenSenha(_email) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!_email) {
                throw new TypeError("Email não informado");
            }
            else {
                let usuarioExiste = yield Usuario_1.Usuario.findOne({
                    where: {
                        email: _email
                    }
                });
                if (!usuarioExiste) {
                    throw new TypeError("Nenhum usuário contém o email informado");
                }
                let token = crypto.randomBytes(20).toString('hex');
                let agora = new Date();
                agora.setHours(agora.getHours() + 1);
                try {
                    yield Usuario_1.Usuario.update({
                        tokenResetarSenha: token,
                        expiracaoToken: agora
                    }, {
                        where: {
                            email: _email
                        }
                    });
                }
                catch (error) {
                    throw new TypeError("Ocorreu um erro interno");
                }
                emailService.enviarEmail('luiznds62@gmail.com', _email, "Resetar Senha Petshop", `Olá, tudo bem?
                Utilize este token para resetar sua senha: ${token}`, templateResetEmail_1.default(token));
                return [];
            }
        });
    }
    buscarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let usuarios = yield Usuario_1.Usuario.findAll();
                if (!usuarios) {
                    throw new TypeError('Nenhum usuário encontrado');
                }
                return usuarios;
            }
            catch (err) {
                throw new TypeError(`Erro ao buscar usuários: ${err}`);
            }
        });
    }
    buscarPorLogin(_login) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let usuario = yield Usuario_1.Usuario.findOne({
                    where: {
                        login: _login
                    }
                });
                if (!usuario) {
                    throw new TypeError('Nenhum usuário encontrado');
                }
                let usuarioRetorno = {
                    id: usuario.id,
                    email: usuario.email,
                    createdAt: usuario.createdAt,
                    updatedAt: usuario.updatedAt
                };
                return usuarioRetorno;
            }
            catch (err) {
                throw new TypeError(`Erro ao buscar usuário: ${err}`);
            }
        });
    }
    salvarUsuario(_usuario) {
        return __awaiter(this, void 0, void 0, function* () {
            var insconsistencias = yield this.validar(_usuario);
            if (insconsistencias) {
                throw new TypeError(insconsistencias);
            }
            try {
                let usuarioNovo = yield Usuario_1.Usuario.create(_usuario);
                return {
                    id: usuarioNovo.id,
                    login: usuarioNovo.login,
                    email: usuarioNovo.email,
                    createdAt: usuarioNovo.createdAt,
                    updatedAt: usuarioNovo.updatedAt
                };
            }
            catch (err) {
                throw new TypeError(`Erro ao criar usuário: ${err}`);
            }
        });
    }
    autenticar(_autentica) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                var auth = _autentica;
                if (!auth.login) {
                    throw new TypeError(`Login não informado`);
                }
                if (!auth.senha) {
                    throw new TypeError(`Senha não informada`);
                }
                let usuarioBanco = yield this.buscarPorLoginValidate(auth.login);
                if (!usuarioBanco) {
                    throw new TypeError(`Usuário não encontrado`);
                }
                if (usuarioBanco.senha != auth.senha) {
                    throw new TypeError(`Senha inválida`);
                }
                let usuario = {
                    id: usuarioBanco.id,
                    login: usuarioBanco.login,
                    email: usuarioBanco.email,
                    createdAt: usuarioBanco.createdAt,
                    updatedAt: usuarioBanco.updatedAt
                };
                return { usuario, token: this.gerarToken({ id: usuarioBanco.id }) };
            }
            catch (err) {
                throw new TypeError(`Erro ao autenticar: ${err}`);
            }
        });
    }
}
exports.UsuarioService = UsuarioService;
