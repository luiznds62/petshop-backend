"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "luiznds62@gmail.com",
        pass: "rmghhpkytvnwamnp"
    },
    tls: {
        rejectUnauthorized: false
    }
});
class EmailService {
    enviarEmail(remetente, destinatario, assunto, texto, conteudo) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = {
                from: remetente,
                to: destinatario,
                subject: assunto,
                text: texto,
                html: conteudo
            };
            transporter.sendMail(email, function (err, result) {
                if (err) {
                    console.log(err);
                    return false;
                }
                console.log("Mensagem enviada!" + result);
                return true;
            });
        });
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=EmailService.js.map