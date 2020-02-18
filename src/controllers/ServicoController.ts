import * as express from "express";
import { ServicoService } from "../services/ServicoService";
import { ResponseBuilder } from "../common/ResponseBuilder";
import authMiddleware from "../middlewares/AuthMiddleware";

let servicoService = new ServicoService();
let router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    let servicos = await servicoService.buscarTodos(
      req.query.offset,
      req.query.limit,
      req.query.order
    );
    res.send(
      new ResponseBuilder(
        true,
        "Serviços encontrados com sucesso",
        servicos.obj,
        servicos.proximo,
        servicos.offset,
        req.query.limit,
        servicos.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    let servico = await servicoService.buscarPorId(req.params.id);
    res.send(
      new ResponseBuilder(true, "Serviço encontrado com sucesso", servico)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    let servico = await servicoService.salvarServico(req.body);
    res.send(new ResponseBuilder(true, "Serviço salvo com sucesso", servico));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.put("/:id", async (req, res) => {
  try {
    let servico = await servicoService.atualizarServico(
      req.params.id,
      req.body
    );
    res.send(
      new ResponseBuilder(true, "Serviço atualizado com sucesso", servico)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let servico = await servicoService.deletarServico(req.params.id);
    res.send(
      new ResponseBuilder(true, "Serviço deletado com sucesso", servico)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export = router;
