import * as express from "express";
import { AnimalService } from "../services/AnimalService";
import { ResponseBuilder } from "../common/ResponseBuilder";
import authMiddleware from "../middlewares/AuthMiddleware";

let animalService = new AnimalService();
let router = express.Router();
router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    let animais = await animalService.buscarTodos(
      req.query.offset,
      req.query.limit,
      req.query.order
    );
    res.send(
      new ResponseBuilder(
        true,
        "Animais buscados com sucesso",
        animais.obj,
        animais.proximo,
        animais.offset,
        req.query.limit,
        animais.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    let animal = await animalService.buscarPorId(req.params.id);
    res.send(new ResponseBuilder(true, "Animal buscado com sucesso", animal));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    let animal = await animalService.salvarAnimal(req.body);
    res.send(new ResponseBuilder(true, "Animal salvo com sucesso", animal));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.put("/:id", async (req, res) => {
  try {
    let animal = await animalService.atualizarAnimal(req.params.id, req.body);
    res.send(
      new ResponseBuilder(true, "Animal atualizado com sucesso", animal)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let animal = await animalService.deletarAnimal(req.params.id);
    res.send(new ResponseBuilder(true, "Animal deletado com sucesso", animal));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export = router;
