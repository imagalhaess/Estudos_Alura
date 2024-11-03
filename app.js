let listaDeNumerosSorteados = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
    // Verifica se a biblioteca responsiveVoice está carregada antes de usar
    if (typeof responsiveVoice !== "undefined") {
        responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.1 });
    } else {
        console.warn("Biblioteca responsiveVoice não carregada.");
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10:");
}

// Exibe a mensagem inicial
exibirMensagemInicial();

function verificarChute() {
    let chute = parseInt(document.querySelector("input").value);
    
    if (chute === numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        
        // Habilita o botão de reiniciar
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute < numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é maior.");
        } else {
            exibirTextoNaTela("p", "O número secreto é menor.");
        }
    }
    
    tentativas++;
    limparCampo();
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista === numeroMaximo) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        console.log(listaDeNumerosSorteados);
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    exibirMensagemInicial();
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    
    // Desativa o botão de reiniciar
    document.getElementById("reiniciar").setAttribute("disabled", true);
}

// Inicialmente desativa o botão de reiniciar
document.getElementById("reiniciar").setAttribute("disabled", true);
