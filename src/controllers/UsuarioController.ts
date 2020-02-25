import * as express from "express";
import { UsuarioService } from "../services/UsuarioService";
import { ResponseBuilder } from "../common/ResponseBuilder";
import RateLimiter from "../common/RateLimiter";
import AuthMiddleware from "../middlewares/AuthMiddleware";
const router = express.Router();

let usuarioService = new UsuarioService();

router.get("/:login", AuthMiddleware, async (req, res) => {
  try {
    var usuario = await usuarioService.buscarPorLogin(req.params.login);
    res.send(new ResponseBuilder(true, "Usuário buscado com sucesso", usuario));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post(
  "/",
  RateLimiter(
    45 * 60 * 1000,
    15,
    new ResponseBuilder(
      false,
      "Tentativas consequentes excedidas, tente novamente em 45 minutos"
    )
  ),
  async (req, res) => {
    try {
      let usuario = await usuarioService.salvarUsuario(req.body);
      res.send(new ResponseBuilder(true, "Usuário salvo com sucesso", usuario));
    } catch (error) {
      res.send(new ResponseBuilder(false, error.message));
    }
  }
);

router.post("/trocarsenha", AuthMiddleware, async (req, res) => {
  try {
    let usuario = await usuarioService.trocarSenha(req.body);
    res.send(new ResponseBuilder(true, "Senha alterada com sucesso", usuario));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post(
  "/esquecisenha",
  RateLimiter(
    60 * 60 * 1000,
    15,
    new ResponseBuilder(
      false,
      "Tentativas consequentes excedidas,tente novamente em 1 hora"
    )
  ),
  async (req, res) => {
    try {
      let gerouToken = await usuarioService.gerarTokenSenha(req.body.email);
      res.send(
        new ResponseBuilder(true, "Token gerado e enviado ao email", gerouToken)
      );
    } catch (error) {
      res.send(new ResponseBuilder(false, error.message));
    }
  }
);

router.post(
  "/resetarsenha",
  RateLimiter(
    60 * 60 * 1000,
    15,
    new ResponseBuilder(
      false,
      "Tentativas consequentes excedidas,tente novamente em 1 hora"
    )
  ),
  async (req, res) => {
    try {
      let senhaResetada = await usuarioService.resetarSenha(
        req.body.email,
        req.body.senha,
        req.body.token
      );
      res.send(
        new ResponseBuilder(true, "Senha resetada com sucesso", senhaResetada)
      );
    } catch (error) {
      res.send(new ResponseBuilder(false, error.message));
    }
  }
);

router.post(
  "/autenticar",
  RateLimiter(
    60 * 1000,
    10,
    new ResponseBuilder(false, "Quantidade de tentativas por minuto excedidas")
  ),
  async (req, res) => {
    try {
      let autenticacao = await usuarioService.autenticar(req.body);
      res.send(
        new ResponseBuilder(true, "Autenticado com sucesso", autenticacao)
      );
    } catch (error) {
      res.send(new ResponseBuilder(false, error.message));
    }
  }
);

export = router;
