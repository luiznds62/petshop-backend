import * as express from "express";
import * as fs from "fs";
import * as uuid from "uuid";
import { TipoUpload } from "./TipoUpload";

export class UploadService {

    getFile(fileName) {
        if (!fileName) {
            throw new TypeError("Nome do arquivo não informado");
        }

        fs.exists(`${__dirname}/../uploads/${fileName}`, (exists) => {
            if (exists) {
                return `${__dirname}/../uploads/${fileName}`
            } else {
                throw new TypeError("Arquivo não existente");
            }
        })
        return ""
    }

    saveFile(req: express.Request, tipoUpload: TipoUpload) {
        if (!req.files || Object.keys(req.files).length === 0) {
            throw new TypeError("Arquivo não encontrado")
        }

        let idUpload = uuid.v1()
        let fileToUpload: any = req.files.file;
        if (!fileToUpload) {
            throw new TypeError("Requisição precisa enviar objeto 'file'")
        }
        let fileName = idUpload.toString().concat(fileToUpload.name)

        switch (tipoUpload) {
            case TipoUpload.Empresa:
                // Use the mv() method to place the file somewhere on your server
                if (!fs.existsSync(`${__dirname}/../uploads`)) {
                    fs.mkdirSync(`${__dirname}/../uploads`)
                }

                fileToUpload.mv(`${__dirname}/../uploads/${fileName}`, function (err) {
                    if (err)
                        throw new TypeError(err)

                    return true
                });
                break;
        }

        return fileName
    }

}
