import * as express from "express";
import { UsuarioHasEmpresaService } from "../services/UsuarioHasEmpresaService";
import { ResponseBuilder } from "../common/ResponseBuilder";
import AuthMiddleware from "../middlewares/AuthMiddleware";

let usuarioHasEmpresaService = new UsuarioHasEmpresaService();
const router = express.Router();
router.use(AuthMiddleware);

router.get("/", async (req, res) => {
  try {
    var usuariosHasEmpresa = await usuarioHasEmpresaService.buscarTodos(
      req.query.offset,
      req.query.limit,
      req.query.order
    );
    res.send(
      new ResponseBuilder(
        true,
        "Usuários encontrados com sucesso",
        usuariosHasEmpresa.obj,
        usuariosHasEmpresa.proximo,
        usuariosHasEmpresa.offset,
        req.query.limit,
        usuariosHasEmpresa.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/usuario/:idUsuario", async (req, res) => {
  try {
    var usuariosHasEmpresa = await usuarioHasEmpresaService.buscarPorUsuario(
      req.params.idUsuario
    );
    res.send(
      new ResponseBuilder(
        true,
        "Usuário vinculado a Empresa buscado com sucesso",
        usuariosHasEmpresa
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.delete("/empresa/:idEmpresa/usuario/:idUsuario", async (req, res) => {
  try {
    var usuariosHasEmpresa = await usuarioHasEmpresaService.desvincularUsuarioDeEmpresa(
      req.params.idEmpresa,
      req.params.idUsuario
    );
    res.send(
      new ResponseBuilder(
        true,
        "Usuário desvinculado da Empresa buscado com sucesso",
        usuariosHasEmpresa
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/empresa/:idEmpresa/usuario/:idUsuario", async (req, res) => {
  try {
    var usuariosHasEmpresa = await usuarioHasEmpresaService.vincularUsuarioDeEmpresa(
      req.params.idEmpresa,
      req.params.idUsuario
    );
    res.send(
      new ResponseBuilder(
        true,
        "Usuário vinculado da Empresa buscado com sucesso",
        usuariosHasEmpresa
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    let usuarioHasEmpresa = await usuarioHasEmpresaService.salvarUsuarioHasEmpresa(
      req.body
    );
    res.send(
      new ResponseBuilder(
        true,
        "Usuário has Empresa salvo com sucesso",
        usuarioHasEmpresa
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export = router;
