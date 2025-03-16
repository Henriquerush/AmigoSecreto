let amigos = [];

function adicionarAmigo() {
    let input = document.getElementById("amigo");
    let nome = input.value.trim();

    if (nome === "") {
        alert("Digite um nome válido!");
        return;
    }

    if (amigos.includes(nome)) {
        alert("Este nome já foi adicionado!");
        return;
    }

    amigos.push(nome);
    atualizarLista();
    input.value = "";
}

function atualizarLista() {
    let lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";
    
    amigos.forEach((amigo) => {
        let item = document.createElement("li");
        item.textContent = amigo;
        lista.appendChild(item);
    });
}

function sortearAmigo() {
    if (amigos.length < 2) {
        alert("Adicione pelo menos 2 amigos para o sorteio!");
        return;
    }

    let sorteio = [...amigos];
    let resultado = {};
    
    do {
        sorteio = shuffleArray(sorteio);
    } while (temAlguemComSigoMesmo(sorteio));

    amigos.forEach((amigo, index) => {
        resultado[amigo] = sorteio[index];
    });

    mostrarResultado(resultado);
}

function temAlguemComSigoMesmo(lista) {
    return lista.some((amigo, index) => amigo === amigos[index]);
}

function shuffleArray(array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function mostrarResultado(resultado) {
    let resultadoLista = document.getElementById("resultado");
    resultadoLista.innerHTML = "";

    for (let [amigo, amigoSecreto] of Object.entries(resultado)) {
        let item = document.createElement("li");
        item.textContent = `${amigo} → ${amigoSecreto}`;
        resultadoLista.appendChild(item);
    }
}

function limparLista() {
    amigos = [];
    document.getElementById("listaAmigos").innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
}