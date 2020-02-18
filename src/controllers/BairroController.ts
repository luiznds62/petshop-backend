import * as express from "express";
import { BairroService } from "../services/BairroService";
import authMiddleware from "../middlewares/AuthMiddleware";
import { ResponseBuilder } from "../common/ResponseBuilder";

let bairroService = new BairroService();
let router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    let bairros = await bairroService.buscarTodos(
      req.query.offset,
      req.query.limit,
      req.query.order
    );
    res.send(
      new ResponseBuilder(
        true,
        "Bairros encontrados com sucesso",
        bairros.obj,
        bairros.proximo,
        bairros.offset,
        req.query.limit,
        bairros.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/cidade/:id", async (req, res) => {
  try {
    let bairros = await bairroService.buscarPorCidadeId(
      req.params.id,
      req.query.offset,
      req.query.limit,
      req.query.order
    );
    res.send(
      new ResponseBuilder(
        true,
        "Bairros encontrados com sucesso",
        bairros.obj,
        bairros.proximo,
        bairros.offset,
        req.query.limit,
        bairros.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    let bairro = await bairroService.salvarBairro(req.body);
    res.send(new ResponseBuilder(true, "Bairro salvo com sucesso", bairro));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export = router;
