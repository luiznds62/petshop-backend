let validador = {}

validador.validarData = (data) => {
    let mascara = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/
    if (!mascara.test(data)) {
        return "Data inválida"
    }
}

export default validador