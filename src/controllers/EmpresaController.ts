import * as express from "express";
import { EmpresaService } from "../services/EmpresaService";
import authMiddleware from "../middlewares/AuthMiddleware";
import { ResponseBuilder } from "../common/ResponseBuilder";
import * as multer from "multer";
import * as path from "path";

const multerConfig = {
  storage: multer.diskStorage({
    destination: function(req, file, next) {
      next(null, "src/uploads/images/empresa");
    },
    filename: function(req, file, next) {
      const ext = file.mimetype.split("/")[1];
      next(null, file.fieldname + "-" + Date.now() + "." + ext);
    }
  }),
  fileFilter: function(req, file, next) {
    if (!file) {
      next();
    }

    const image = file.mimetype.startsWith("image/");
    if (image) {
      next(null, true);
    } else {
      next({ message: "Extensão não suportada" }, false);
    }
  }
};

let empresaService = new EmpresaService();
let router = express.Router();
router.use(authMiddleware);

router.get("/:id/logo", async (req, res) => {
  let nomeLogo = await empresaService.buscarCaminhoLogo(req.params.id);

  if (nomeLogo.err) {
    res.sendFile(
      path.join(__dirname, `../src/uploads/images/empresa/notfound.jpg`)
    );
  } else {
    res.sendFile(
      path.join(__dirname, `../src/uploads/images/empresa/${nomeLogo}`)
    );
  }
});

router.post(
  "/upload/logo",
  multer(multerConfig).single("logo"),
  (req: any, res) => {
    try {
      if (req.file) {
        req.body.logo = req.file.filename;
      }

      empresaService.salvarCaminhoLogo(req.body.empresaId, req.file.filename);

      res.send(new ResponseBuilder(true, "Upload realizado com sucesso"));
    } catch (error) {
      res.send(new ResponseBuilder(false, "Ocorreu um erro"));
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
