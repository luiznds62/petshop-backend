import * as express from "express";
import { ClienteService } from "../services/ClienteService";
import { ResponseBuilder } from "../common/ResponseBuilder";
import authMiddleware from "../middlewares/AuthMiddleware";

let clienteService = new ClienteService();
let router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    let clientes = await clienteService.buscarTodos(
      req.query.offset,
      req.query.limit,
      req.query.order
    );
    res.send(
      new ResponseBuilder(
        true,
        "Clientes encontrados com sucesso",
        clientes.obj,
        clientes.proximo,
        clientes.offset,
        req.query.limit,
        clientes.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    let cliente = await clienteService.buscarPorId(req.params.id);
    res.send(
      new ResponseBuilder(true, "Cliente encontrado com sucesso", cliente)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    let cliente = await clienteService.salvarCliente(req.body);
    res.send(new ResponseBuilder(true, "Cliente salvo com sucesso", cliente));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.put("/:id", async (req, res) => {
  try {
    let cliente = await clienteService.atualizarCliente(
      req.params.id,
      req.body
    );
    res.send(
      new ResponseBuilder(true, "Cliente atualizado com sucesso", cliente)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let cliente = await clienteService.deletarCliente(req.params.id);
    res.send(
      new ResponseBuilder(true, "Cliente deletado com sucesso", cliente)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export = router;
