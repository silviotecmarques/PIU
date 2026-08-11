const { autoUpdater } = require("electron-updater");

autoUpdater.forceDevUpdateConfig = true;

let janela = null;
let abrirAplicacao = null;

let atualizadorIniciado = false;


// ========================================
// INICIAR ATUALIZADOR
// ========================================

function iniciarAtualizador(
    win,
    callbackAbrirAplicacao
) {

    // Evita iniciar duas vezes
    if (atualizadorIniciado) {
        return;
    }

    atualizadorIniciado = true;

    janela = win;
    abrirAplicacao =
        callbackAbrirAplicacao;


    console.log(
        "UPDATER: iniciado."
    );


    // ========================================
    // CONFIGURAÇÃO
    // ========================================

    autoUpdater.autoDownload = true;

    autoUpdater.autoInstallOnAppQuit = true;


    // ========================================
    // VERIFICANDO
    // ========================================

    autoUpdater.on(
        "checking-for-update",
        () => {

            console.log(
                "UPDATER: verificando..."
            );

            enviarStatus(
                "Verificando atualização..."
            );

            enviarProgresso(10);

        }
    );


    // ========================================
    // NOVA VERSÃO
    // ========================================

    autoUpdater.on(
        "update-available",
        (info) => {

            console.log(
                "UPDATER: nova versão:",
                info.version
            );

            enviarStatus(
                "Nova versão encontrada..."
            );

            enviarProgresso(20);

        }
    );


    // ========================================
    // NENHUMA ATUALIZAÇÃO
    // ========================================

    autoUpdater.on(
        "update-not-available",
        () => {

            console.log(
                "UPDATER: PIU já está atualizado."
            );

            enviarStatus(
                "PIU! está atualizado."
            );

            enviarProgresso(100);


            setTimeout(() => {

                abrirSistema();

            }, 500);

        }
    );


    // ========================================
    // DOWNLOAD
    // ========================================

    autoUpdater.on(
        "download-progress",
        (info) => {

            const progresso =
                Math.round(
                    info.percent
                );


            console.log(
                "UPDATER:",
                progresso + "%"
            );


            enviarStatus(
                "Baixando atualização..."
            );


            enviarProgresso(
                progresso
            );

        }
    );


    // ========================================
    // ATUALIZAÇÃO BAIXADA
    // ========================================

    autoUpdater.on(
        "update-downloaded",
        () => {

            console.log(
                "UPDATER: atualização baixada."
            );


            enviarStatus(
                "Atualização pronta!"
            );


            enviarProgresso(100);


            setTimeout(() => {

                autoUpdater.quitAndInstall(
                    false,
                    true
                );

            }, 1000);

        }
    );


    // ========================================
    // ERRO
    // ========================================

    autoUpdater.on(
        "error",
        (erro) => {

            console.error(
                "UPDATER: erro:",
                erro
            );


            /*
             * O updater nunca deve impedir
             * o PIU de abrir.
             */

            enviarStatus(
                "Iniciando PIU!..."
            );


            enviarProgresso(100);


            setTimeout(() => {

                abrirSistema();

            }, 500);

        }
    );


    // ========================================
    // COMEÇAR VERIFICAÇÃO
    // ========================================

    autoUpdater.checkForUpdates();

}


// ========================================
// ABRIR SISTEMA
// ========================================

function abrirSistema() {

    if (
        typeof abrirAplicacao ===
        "function"
    ) {

        abrirAplicacao();

    }

}


// ========================================
// ENVIAR STATUS
// ========================================

function enviarStatus(
    mensagem
) {

    if (
        !janela ||
        janela.isDestroyed()
    ) {

        return;

    }


    janela.webContents.send(
        "update-status",
        mensagem
    );

}


// ========================================
// ENVIAR PROGRESSO
// ========================================

function enviarProgresso(
    porcentagem
) {

    if (
        !janela ||
        janela.isDestroyed()
    ) {

        return;

    }


    janela.webContents.send(
        "update-progress",
        porcentagem
    );

}


// ========================================
// EXPORTAR
// ========================================

module.exports = {
    iniciarAtualizador
};