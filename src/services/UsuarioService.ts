import * as jwt from "jsonwebtoken";
import * as authConfig from "../../config/auth.json";
import * as crypto from "crypto";
import * as bcrypt from "bcrypt";
import { Usuario } from "../models/Usuario";
import { EmailService } from "./EmailService";
import gerarHTML from "../../config/email/templateResetEmail";

let emailService = new EmailService();

export class UsuarioService {
  gerarToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
      expiresIn: 86400
    });
  }

  async buscarPorEmailValidate(_email) {
    return Usuario.findOne({
      where: {
        email: _email
      }
    });
  }

  async buscarPorLoginValidate(_login) {
    return Usuario.findOne({
      where: {
        login: _login
      }
    });
  }

  async validar(_usuario) {
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
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(_usuario.email)) {
      return "Email inválido";
    }

    if ((await this.buscarPorLoginValidate(_usuario.login)) != null) {
      return "Login já utilizado";
    }

    if ((await this.buscarPorEmailValidate(_usuario.email)) != null) {
      return "Email já utilizado";
    }
  }

  async trocarSenha(_dados) {
    if (!_dados.login) {
      throw new TypeError("Usuário não informado");
    }
    if (!_dados.senhaAntiga) {
      throw new TypeError("Senha antiga não informada");
    } else {
      let usuarioExiste = await Usuario.findOne({
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
    } else {
      if (_dados.senhaNova.length < 8) {
        throw new TypeError(
          "A nova senha precisa conter no mínimo 8 caractéres"
        );
      }
    }

    try {
      let usuarioAlterado = await Usuario.update(
        {
          senha: _dados.senhaNova
        },
        {
          where: {
            login: _dados.login
          }
        }
      );

      return usuarioAlterado;
    } catch (error) {
      throw new TypeError("Ocorreu um erro ao alterar");
    }
  }

  async resetarSenha(_email, _senha, _token) {
    if (!_senha) {
      throw new TypeError("Nova senha não informada");
    }
    if (!_token) {
      throw new TypeError("Token não informado");
    }
    if (!_email) {
      throw new TypeError("Email não informado");
    } else {
      let usuarioExiste = await Usuario.findOne({
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

      let usuarioAlterado = await Usuario.update(
        {
          senha: _senha
        },
        {
          where: {
            email: _email
          }
        }
      );

      return usuarioAlterado;
    }
  }

  async gerarTokenSenha(_email) {
    if (!_email) {
      throw new TypeError("Email não informado");
    } else {
      let usuarioExiste = await Usuario.findOne({
        where: {
          email: _email
        }
      });

      if (!usuarioExiste) {
        throw new TypeError("Nenhum usuário contém o email informado");
      }

      let token = crypto.randomBytes(20).toString("hex");
      let agora = new Date();
      agora.setHours(agora.getHours() + 1);

      try {
        await Usuario.update(
          {
            tokenResetarSenha: token,
            expiracaoToken: agora
          },
          {
            where: {
              email: _email
            }
          }
        );
      } catch (error) {
        throw new TypeError("Ocorreu um erro interno");
      }

      emailService.enviarEmail(
        "luiznds62@gmail.com",
        _email,
        "Resetar Senha Petshop",
        `Olá, tudo bem?
                Utilize este token para resetar sua senha: ${token}`,
        gerarHTML(token)
      );

      return [];
    }
  }

  async buscarTodos() {
    try {
      let usuarios = await Usuario.findAll();

      if (!usuarios) {
        throw new TypeError("Nenhum usuário encontrado");
      }

      return usuarios;
    } catch (err) {
      throw new TypeError(`${err.message}`);
    }
  }

  async buscarPorLogin(_login) {
    try {
      let usuario = await Usuario.findOne({
        where: {
          login: _login
        }
      });

      if (!usuario) {
        throw new TypeError("Nenhum usuário encontrado");
      }

      let usuarioRetorno = {
        id: usuario.id,
        email: usuario.email,
        createdAt: usuario.createdAt,
        updatedAt: usuario.updatedAt
      };

      return usuarioRetorno;
    } catch (err) {
      throw new TypeError(`${err.message}`);
    }
  }

  async salvarUsuario(_usuario) {
    var insconsistencias = await this.validar(_usuario);

    if (insconsistencias) {
      throw new TypeError(insconsistencias);
    }

    try {
      let usuarioNovo = await Usuario.create(_usuario);
      return {
        id: usuarioNovo.id,
        login: usuarioNovo.login,
        email: usuarioNovo.email,
        createdAt: usuarioNovo.createdAt,
        updatedAt: usuarioNovo.updatedAt
      };
    } catch (err) {
      throw new TypeError(`${err.message}`);
    }
  }

  async autenticar(_autentica) {
    try {
      var auth = _autentica;

      if (!auth.login) {
        throw new TypeError(`Login não informado`);
      }

      if (!auth.senha) {
        throw new TypeError(`Senha não informada`);
      }

      let usuarioBanco = await this.buscarPorLoginValidate(auth.login);

      if (!usuarioBanco) {
        throw new TypeError(`Usuário não encontrado`);
      }

      if (!bcrypt.compare(usuarioBanco.senha, auth.senha)) {
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
    } catch (err) {
      throw new TypeError(`${err.message}`);
    }
  }
}
