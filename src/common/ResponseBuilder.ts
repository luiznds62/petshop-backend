export class ResponseBuilder {
    constructor(sucesso = false, mensagem = "", objeto: any = [], proximo = false, offset = 0, limit = 25,total = 0) {
        return { sucesso: sucesso, mensagem: mensagem, objeto: objeto, proximo: proximo, offset: offset, limit: limit, total: total }
    }
}
