import * as express from "express";
import { EnderecoService } from "../services/EnderecoService";
import authMiddleware from "../middlewares/AuthMiddleware";
import { ResponseBuilder } from "../common/ResponseBuilder";

let enderecoService = new EnderecoService();
let router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    let enderecos = await enderecoService.buscarTodos(
      req.query.offset,
      req.query.limit,
      req.query.order
    );
    res.send(
      new ResponseBuilder(
        true,
        "Endereços encontrados com sucesso",
        enderecos.obj,
        enderecos.proximo,
        enderecos.offset,
        req.query.limit,
        enderecos.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    let endereco = await enderecoService.buscarPorId(req.params.id);
    res.send(
      new ResponseBuilder(true, "Endereço encontrado com sucesso", endereco)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    let endereco = await enderecoService.salvarEndereco(req.body);
    res.send(new ResponseBuilder(true, "Endereco salvo com sucesso", endereco));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let endereco = await enderecoService.deletarEndereco(req.params.id);
    res.send(
      new ResponseBuilder(true, "Endereço deletado com sucesso", endereco)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export = router;
