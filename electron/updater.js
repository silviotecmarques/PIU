const { autoUpdater } = require("electron-updater");


// Permite testar o updater durante o desenvolvimento.
// Em produção isso não atrapalha.
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

        console.log(
            "UPDATER: já foi iniciado."
        );

        return;

    }


    atualizadorIniciado = true;


    janela = win;

    abrirAplicacao =
        callbackAbrirAplicacao;


    console.log(
        "================================"
    );

    console.log(
        "UPDATER: iniciado."
    );

    console.log(
        "Versão atual:",
        require("electron").app.getVersion()
    );

    console.log(
        "================================"
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
                "UPDATER: verificando atualizações..."
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
                "================================"
            );

            console.log(
                "UPDATER: NOVA VERSÃO ENCONTRADA"
            );

            console.log(
                "Versão atual:",
                require("electron").app.getVersion()
            );

            console.log(
                "Nova versão:",
                info.version
            );

            console.log(
                "================================"
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
        (info) => {

            console.log(
                "================================"
            );

            console.log(
                "UPDATER: NENHUMA ATUALIZAÇÃO"
            );

            console.log(
                "Versão atual:",
                require("electron").app.getVersion()
            );

            console.log(
                "================================"
            );


            enviarStatus(
                "PIU! está atualizado."
            );


            enviarProgresso(100);


            setTimeout(() => {

                abrirSistema();

            }, 700);

        }
    );


    // ========================================
    // DOWNLOAD
    // ========================================

    autoUpdater.on(
        "download-progress",
        (info) => {

            const progresso =
                Math.max(
                    0,
                    Math.min(
                        100,
                        Math.round(info.percent)
                    )
                );


            console.log(
                "UPDATER: download:",
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
        (info) => {

            console.log(
                "================================"
            );

            console.log(
                "UPDATER: ATUALIZAÇÃO BAIXADA!"
            );

            console.log(
                "Versão atual:",
                require("electron").app.getVersion()
            );

            console.log(
                "Versão baixada:",
                info.version
            );

            console.log(
                "================================"
            );


            enviarStatus(
                "Atualização pronta!"
            );


            enviarProgresso(100);


            setTimeout(() => {

                console.log(
                    "UPDATER: executando quitAndInstall..."
                );


                try {

                    autoUpdater.quitAndInstall(
                        false,
                        true
                    );

                }
                catch (erro) {

                    console.error(
                        "UPDATER: erro ao instalar:",
                        erro
                    );


                    abrirSistema();

                }

            }, 1500);

        }
    );


    // ========================================
    // ERRO
    // ========================================

    autoUpdater.on(
        "error",
        (erro) => {

            console.error(
                "================================"
            );

            console.error(
                "UPDATER: ERRO"
            );

            console.error(
                erro
            );

            console.error(
                "================================"
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

            }, 700);

        }
    );


    // ========================================
    // COMEÇAR VERIFICAÇÃO
    // ========================================

    console.log(
        "UPDATER: chamando checkForUpdates()..."
    );


    autoUpdater.checkForUpdates();

}


// ========================================
// ABRIR SISTEMA
// ========================================

function abrirSistema() {

    console.log(
        "UPDATER: liberando abertura do PIU..."
    );


    if (
        typeof abrirAplicacao ===
        "function"
    ) {

        abrirAplicacao();

    }
    else {

        console.error(
            "UPDATER: abrirAplicacao não é uma função!"
        );

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


    const valor =
        Math.max(
            0,
            Math.min(
                100,
                Number(porcentagem) || 0
            )
        );


    janela.webContents.send(
        "update-progress",
        valor
    );

}


// ========================================
// EXPORTAR
// ========================================

module.exports = {
    iniciarAtualizador
};