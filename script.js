const visor1 = document.getElementById("visor1");
const visor3 = document.getElementById("visor3");
const botoes = document.querySelectorAll("button");

let expressaoParaCalcular = "";
let expressaoAtual = "";
let numeroAtual = "";


function atualizarVisor() {
    visor3.value = (expressaoAtual + numeroAtual) || "0";
}

function limparVisor() {
    numeroAtual = "";
    expressaoParaCalcular = "";
    expressaoAtual = "";
    visor1.value = "0";
    visor3.value = "0";
}

function deletarUltimo() {
    if (numeroAtual.length > 0) {
        numeroAtual = numeroAtual.slice(0, -1);
    } else if (expressaoAtual.length > 0) {
        expressaoAtual = expressaoAtual.trim().slice(0, -1);
        expressaoParaCalcular = expressaoParaCalcular.trim().slice(0, -1);
    }
    atualizarVisor();
}

function calcular() {
    if (expressaoParaCalcular === "" && numeroAtual === "") return;
    try {
        const contaFinal = expressaoParaCalcular + numeroAtual;
        const resultado = eval(contaFinal);

        visor1.value = expressaoAtual + numeroAtual;
        visor3.value = resultado;

        // Prepara para continuar a conta a partir do resultado
        numeroAtual = resultado.toString();
        expressaoParaCalcular = "";
        expressaoAtual = "";
    } catch (e) {
        visor3.value = "Erro";
    }
}

botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const valor = botao.innerText;

        if (!isNaN(valor) || valor === ",") {
            const char = valor === "," ? "." : valor;
            if (char === "." && numeroAtual.includes(".")) return;
            numeroAtual += char;
            atualizarVisor();
        }
        else if (botao.classList.contains("operador") && valor !== "=") {
            if (numeroAtual === "" && expressaoParaCalcular === "") return;
            let op = valor === "x" ? "*" : (valor === "÷" ? "/" : valor);
            expressaoParaCalcular += numeroAtual + op;
            expressaoAtual += numeroAtual + valor;
            numeroAtual = "";
            atualizarVisor();
        }
        else if (valor === "=") {
            calcular();
        }
        else if (valor === "CE") {
            limparVisor();
        }
        else if (valor === "C") {
            deletarUltimo();
        }
    });
});