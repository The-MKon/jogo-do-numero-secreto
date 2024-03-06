let listaNumerosGerados = [];
let numeroLimite = 100;
let numeroGerado = gerarNumAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function exibirTextoInicial() {
    exibirTexto('h1','Jogo do Número Secreto');
    exibirTexto('p','Escolha um número entre 1 e 100');
}

exibirTextoInicial();

function verificarChute() {
    let chute = document.querySelector('input').value
    if(chute == numeroGerado){
        exibirTexto('h1', 'Você acertou');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativa = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto('p',mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }
    else if(chute > numeroGerado){
        exibirTexto('p', 'O número secreto é menor');
    }
    else{
        exibirTexto('p', 'O número secreto é maior');
    }
    tentativas++;
    limparCampo();
}

function gerarNumAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosGerados.length;

    if(quantidadeElementosLista == numeroLimite){
        listaNumerosGerados = [];
    }
    if(listaNumerosGerados.includes(numeroEscolhido)){
        return gerarNumAleatorio();
    }
    else{
        listaNumerosGerados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroGerado = gerarNumAleatorio();
    limparCampo();
    tentativas = 1;
    exibirTextoInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}