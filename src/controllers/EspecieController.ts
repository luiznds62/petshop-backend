import * as express from "express";
import { EspecieService } from "../services/EspecieService";
import { ResponseBuilder } from "../common/ResponseBuilder";
import authMiddleware from "../middlewares/AuthMiddleware";

let especieService = new EspecieService();
let router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    let especies = await especieService.buscarTodos(
      req.query.offset,
      req.query.limit,
      req.query.order
    );
    res.send(
      new ResponseBuilder(
        true,
        "Espécies encontradas com sucesso",
        especies.obj,
        especies.proximo,
        especies.offset,
        req.query.limit,
        especies.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    let especie = await especieService.buscarPorId(req.params.id);
    res.send(new ResponseBuilder(true, "Especie buscada com sucesso", especie));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    let especie = await especieService.salvarEspecie(req.body);
    res.send(new ResponseBuilder(true, "Especie salva com sucesso", especie));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.put("/:id", async (req, res) => {
  try {
    let especie = await especieService.atualizarEspecie(
      req.params.id,
      req.body
    );
    res.send(
      new ResponseBuilder(true, "Especie atualizada com sucesso", especie)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let especie = await especieService.deletarEspecie(req.params.id);
    res.send(
      new ResponseBuilder(true, "Especie deletada com sucesso", especie)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export = router;
