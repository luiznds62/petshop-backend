function gerarHTML(token){
    return `
<h1>Parece que você esqueceu sua senha!</h1>
<p>Não tem problema, pode estar resetando utilizando o token: ${token}
 no link abaixo: </p>
 <p>localhost:3000/usuario/resetarsenha</p>
`
}
export default gerarHTML