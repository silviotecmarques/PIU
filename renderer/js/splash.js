const status =
    document.getElementById("status");

const progresso =
    document.getElementById("progresso");

const porcentagem =
    document.getElementById("porcentagem");


function atualizar(
    mensagem,
    valor
) {

    status.textContent =
        mensagem;

    progresso.style.width =
        valor + "%";

    porcentagem.textContent =
        valor + "%";

}


async function iniciar() {

    atualizar(
        "Iniciando PIU!...",
        15
    );


    await esperar(500);


    atualizar(
        "Carregando sistema...",
        35
    );


    await esperar(500);


    atualizar(
        "Verificando atualizações...",
        60
    );


    await esperar(800);


    atualizar(
        "Carregando dispositivo...",
        85
    );


    await esperar(500);


    atualizar(
        "Pronto!",
        100
    );


    await esperar(300);


    window.location.href =
        "entrada.html";

}


function esperar(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}


iniciar();