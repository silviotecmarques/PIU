const status =
    document.getElementById("status");

const progresso =
    document.getElementById("progresso");

const porcentagem =
    document.getElementById("porcentagem");

const versao =
    document.getElementById("versao");


// ========================================
// ATUALIZAR BARRA
// ========================================

function atualizar(
    mensagem,
    valor
) {

    const percentual =
        Math.max(
            0,
            Math.min(
                100,
                Number(valor) || 0
            )
        );


    status.textContent =
        mensagem;


    progresso.style.width =
        percentual + "%";


    porcentagem.textContent =
        percentual + "%";

}


// ========================================
// CARREGAR VERSÃO
// ========================================

async function carregarVersao() {

    try {

        const numeroVersao =
            await window.electronAPI
                .obterVersao();


        versao.textContent =
            `PIU! v${numeroVersao}`;

    }
    catch (erro) {

        console.error(
            "Erro ao carregar versão:",
            erro
        );


        versao.textContent =
            "PIU!";

    }

}


// ========================================
// STATUS DO UPDATER
// ========================================

window.electronAPI.onUpdateStatus(
    (mensagem) => {

        atualizar(
            mensagem,
            parseInt(
                porcentagem.textContent
            ) || 0
        );

    }
);


// ========================================
// PROGRESSO DO UPDATER
// ========================================

window.electronAPI.onUpdateProgress(
    (valor) => {

        atualizar(
            "Baixando atualização...",
            valor
        );

    }
);


// ========================================
// INICIAR
// ========================================

carregarVersao();