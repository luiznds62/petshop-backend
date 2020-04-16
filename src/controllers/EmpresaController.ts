import * as express from "express";
import * as path from "path";
import { EmpresaService } from "../services/EmpresaService";
import { ResponseBuilder } from "../common/ResponseBuilder";
import { UploadService } from "../common/UploadService";
import { TipoUpload } from "../common/TipoUpload";
import authMiddleware from "../middlewares/AuthMiddleware";

let uploadService = new UploadService();
let empresaService = new EmpresaService();
let router = express.Router();
router.use(authMiddleware);

router.get("/:id/logo", async (req, res) => {
  try {
    let nomeLogo = await empresaService.buscarCaminhoLogo(req.params.id);

    try {
      res.sendFile(path.join(__dirname, `../uploads/` + nomeLogo));
    } catch (error) {
      if (error.message == "Logo não encontrada") {
        res.sendFile(
          path.join(__dirname, `../src/assets/logonotfound.png`)
        );
      }
    }
  } catch (error) {
    res.sendFile(
      path.join(__dirname, `../assets/logonotfound.png`)
    );
  }
});

router.post(
  "/upload/logo",
  (req: any, res) => {
    try {
      let fileName = uploadService.saveFile(req, TipoUpload.Empresa);

      empresaService.salvarCaminhoLogo(req.body.empresaId, fileName);

      res.send(new ResponseBuilder(true, "Upload realizado com sucesso"));
    } catch (error) {
      res.send(new ResponseBuilder(false, "Ocorreu um erro: " + error));
    }
  }
);

router.get("/", async (req, res) => {
  try {
    let empresas = await empresaService.buscarTodos(
      req.query.offset,
      req.query.limit,
      req.query.order
    );

    res.send(
      new ResponseBuilder(
        true,
        "Empresas encontradas com sucesso",
        empresas.obj,
        empresas.proximo,
        empresas.offset,
        req.query.limit,
        empresas.total
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.get("/:id", async (req, res) => {
  try {
    let empresa = await empresaService.buscarPorId(req.params.id);

    res.send(
      new ResponseBuilder(true, "Empresa encontrada com sucesso", empresa)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.put("/", async (req, res) => {
  try {
    let empresaAtualizada = await empresaService.atualizarEmpresa(req.body);

    res.send(
      new ResponseBuilder(
        true,
        "Empresa atualizada com sucesso",
        empresaAtualizada
      )
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.post("/", async (req, res) => {
  try {
    let empresa = await empresaService.salvarEmpresa(req.body);

    res.send(new ResponseBuilder(true, "Empresa salva com sucesso", empresa));
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let empresaDeletada = await empresaService.deletarEmpresa(req.params.id);

    res.send(
      new ResponseBuilder(true, "Empresa deletada com sucesso", empresaDeletada)
    );
  } catch (error) {
    res.send(new ResponseBuilder(false, error.message));
  }
});

export = router;
