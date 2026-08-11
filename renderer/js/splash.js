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