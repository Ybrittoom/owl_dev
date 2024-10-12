const { ipcRenderer } = require("electron")
const { futimesSync } = require("original-fs")

//codigo onde fecha a janela
document.querySelector("#close").addEventListener("click", () => {
    ipcRenderer.send("manualClose")
})

//codigo onde minimiza a janela 
document.querySelector("#minimize").addEventListener("click", () => {
    ipcRenderer.send("manualMinimize")
})

//codigo onde maximiza a janela
document.querySelector("#maximize").addEventListener("click", () => {
    ipcRenderer.send("manualMaximize")
})


//codigo do modal
window.onload = function () {
    //pegando os IDs 
    const modal = document.getElementById("modal")
    const corpo = document.getElementById("corpo")

    corpo.style.display = "none"
    modal.style.display = "block"

    setTimeout(function () {
        modal.style.display = "none"
        corpo.style.display = "block"
        iniciar()
    }, 4000)
}

function iniciar() {

    // Código do quiz 
    const PerguntaEResposta = document.getElementById("PerguntaEResposta");
    const respostaUsuario = document.getElementById("respostaUsuario");

    //array de perguntas
    const perguntas = [
        { pergunta: "1- Qual o seu nome?", resposta: "qualquer resposta" }, // Resposta vazia como placeholder
        { pergunta: "2- Você é homem ou mulher?", resposta: "qualquer resposta" }, // Resposta vazia como placeholder
        { pergunta: "3- Qual a distância da Terra e a Lua? (em km)", resposta: "384400" },
        { pergunta: "4- Qual a capital do Brasil?", resposta: "brasilia" }
    ];

    //array de respostas
    let respostas = {
        nome: "", //aqui fica as resposta pessoal do usuario
        genero: "", //aqui fica as resposta pessoal do usuario
    };

    // Função para ao apertar o Enter ele envia a resposta
    function handleKeyDown(event) {
        if (event.key !== "Enter") return;

        // Para perguntas 1 e 2, sempre considera como certa
        if (questao.resposta === "qualquer resposta" || respostaUsuario.value.trim().toLowerCase() === questao.resposta.trim().toLowerCase()) {
            PerguntaEResposta.textContent = "Está certa a resposta";

            //armazenar a resposta 

            if (questao.pergunta.includes("Qual o seu nome?")) {
                respostas.nome = respostaUsuario.value; // Armazena o nome
                PerguntaEResposta.textContent = respostas.nome //mostra a resposta do usuario
            } else if (questao.pergunta.includes("Você é homem ou mulher?")) {
                respostas.genero = respostaUsuario.value; // Armazena gênero
                PerguntaEResposta.textContent = respostas.genero //mostra a resposta do usuario
            }

            setTimeout(() => {
                if (perguntas.length) {
                    perguntar();
                } else {
                    final(); // Certifique-se de que a função 'final()' está definida
                }
            }, 2000);
        } else {
            PerguntaEResposta.textContent = "A resposta está errada";
            setTimeout(() => {
                if (perguntas.length) {
                    perguntar();
                } else {
                    final(); // Certifique-se de que a função 'final()' está definida
                }
            }, 2000);
        }
    }

    //perguntas do Owl
    function pergOwl() {

        const pergOWl = [
            {perguntaOwl: "5- "}
        ]

        let queOwl;
        PerguntaEResposta.textContent = queOwl
    }




    // Função onde ele faz a pergunta 
    let questao;
    function perguntar() {
        questao = perguntas.shift();
        PerguntaEResposta.textContent = questao.pergunta;
        respostaUsuario.value = " "
    }

    // Adicione o evento de teclado
    respostaUsuario.addEventListener("keydown", handleKeyDown);

    perguntar()
}