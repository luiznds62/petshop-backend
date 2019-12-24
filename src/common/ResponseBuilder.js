class ResponseBuilder {
    constructor(sucesso = false, mensagem = "", objeto = [], proximo = false, offset = 0) {
        return { sucesso: sucesso, mensagem: mensagem, objeto, proximo, offset }
    }
}

export default ResponseBuilder