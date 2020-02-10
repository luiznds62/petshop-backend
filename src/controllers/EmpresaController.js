import express from "express"
import empresaService from "../services/empresaService"
import authMiddleware from '../middlewares/AuthMiddleware'
import ResponseBuilder from "../common/ResponseBuilder"
import multer from 'multer'
import path from 'path'

const multerConfig = {
    storage: multer.diskStorage({
        destination: function (req, file, next) {
            next(null, 'src/uploads/images/empresa')
        },
        filename: function (req, file, next) {
            const ext = file.mimetype.split('/')[1]
            next(null, file.fieldname + '-' + Date.now() + '.' + ext)
        }
    }),
    fileFilter: function (req, file, next) {
        if (!file) {
            next();
        }

        const image = file.mimetype.startsWith('image/')
        if (image) {
            next(null, true)
        } else {
            next({ message: "Extensão não suportada" }, false)
        }
    }
}

let router = express.Router()
router.use(authMiddleware)

router.get('/:id/logo', async (req, res) => {

    let nomeLogo = await empresaService.buscarCaminhoLogo(req.params.id)

    if (nomeLogo.err) {
        res.sendFile(path.join(__dirname, `../uploads/images/empresa/notfound.jpg`))
    }else{
        res.sendFile(path.join(__dirname, `../uploads/images/empresa/${nomeLogo}`))
    }
})

router.post('/upload/logo', multer(multerConfig).single('logo'), (req, res) => {
    try {
        if (req.file) {
            req.body.logo = req.file.filename;
        }

        empresaService.salvarCaminhoLogo(req.body.empresaId, req.file.filename)

        res.send(new ResponseBuilder(true, 'Upload realizado com sucesso'))

    } catch (error) {
        res.send(new ResponseBuilder(false, 'Ocorreu um erro'))
    }
})

router.get('/', async (req, res) => {
    let empresas = await empresaService.buscarTodos(req.query.offset, req.query.limit, req.query.order)

    if (empresas.err) {
        res.send(new ResponseBuilder(false, empresas.err))
    }

    res.send(new ResponseBuilder(
        true,
        'Empresas encontradas com sucesso',
        empresas.obj,
        empresas.proximo,
        empresas.offset,
        req.query.limit,
        empresas.total
    ))
})

router.get('/:id', async (req, res) => {
    let empresa = await empresaService.buscarPorId(req.params.id)

    if (empresa.err) {
        res.send(new ResponseBuilder(false, empresa.err))
    }
    console.log('teste')

    res.send(new ResponseBuilder(true, 'Empresa encontrada com sucesso', empresa))
})

router.put('/', async (req, res) => {
    let empresaAtualizada = await empresaService.atualizarEmpresa(req.body)

    if (empresaAtualizada.err) {
        res.send(new ResponseBuilder(false, empresaAtualizada.err))
    }

    res.send(new ResponseBuilder(true, 'Empresa atualizada com sucesso', empresaAtualizada))
})

router.post('/', async (req, res) => {
    let empresa = await empresaService.salvarEmpresa(req.body)

    if (empresa.err) {
        res.send(new ResponseBuilder(false, empresa.err))
    }

    res.send(new ResponseBuilder(true, 'Empresa salva com sucesso', empresa))
})

router.delete('/:id', async (req, res) => {
    let empresaDeletada = await empresaService.deletarEmpresa(req.params.id)

    if (empresaDeletada.err) {
        res.send(new ResponseBuilder(false, empresaDeletada.err))
    }

    res.send(new ResponseBuilder(true, 'Empresa deletada com sucesso', empresaDeletada))
})

export default router