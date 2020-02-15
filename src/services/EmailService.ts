import * as nodemailer from 'nodemailer'

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

export class EmailService {
    async enviarEmail(remetente, destinatario, assunto, texto, conteudo) {
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
                return false
            }
            console.log("Mensagem enviada!" + result);
            return true
        });
    }
}
