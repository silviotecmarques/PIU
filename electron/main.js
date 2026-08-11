const { app, ipcMain } = require("electron");

const { autoUpdater } =
    require("electron-updater");

const { createWindow } =
    require("./windows");

const store =
    require("./store");


let mainWindow = null;


// ========================================
// DESABILITAR DOWNLOAD AUTOMÁTICO
// ========================================

autoUpdater.autoDownload = true;

autoUpdater.autoInstallOnAppQuit = true;


// ========================================
// ABRIR A TELA CORRETA
// ========================================

function abrirAplicacao() {

    const dispositivo =
        store.get("dispositivo");


    if (mainWindow) {

        mainWindow.close();

    }


    mainWindow =
        createWindow(dispositivo);

}


// ========================================
// ATUALIZAÇÃO
// ========================================

function iniciarAtualizacao() {

    console.log(
        "Verificando atualização..."
    );


    autoUpdater.checkForUpdates();

}


// ========================================
// APP READY
// ========================================

app.whenReady().then(() => {

    /*
     * Primeiro abre o Splash.
     */

    mainWindow =
        createWindow(null, "splash.html");


    /*
     * Pequeno atraso para garantir
     * que o Splash esteja carregado.
     */

    setTimeout(() => {

        iniciarAtualizacao();

    }, 500);

});


// ========================================
// VERIFICANDO
// ========================================

autoUpdater.on(
    "checking-for-update",
    () => {

        console.log(
            "Verificando atualização..."
        );


        if (mainWindow) {

            mainWindow.webContents.send(
                "status-update",
                {
                    texto:
                        "Verificando atualização...",

                    progresso:
                        25
                }
            );

        }

    }
);


// ========================================
// NÃO EXISTE ATUALIZAÇÃO
// ========================================

autoUpdater.on(
    "update-not-available",
    () => {

        console.log(
            "PIU! já está atualizado."
        );


        if (mainWindow) {

            mainWindow.webContents.send(
                "status-update",
                {
                    texto:
                        "PIU! está atualizado.",

                    progresso:
                        100
                }
            );

        }


        setTimeout(() => {

            abrirAplicacao();

        }, 500);

    }
);


// ========================================
// EXISTE ATUALIZAÇÃO
// ========================================

autoUpdater.on(
    "update-available",
    (info) => {

        console.log(
            "Nova versão:",
            info.version
        );


        if (mainWindow) {

            mainWindow.webContents.send(
                "status-update",
                {
                    texto:
                        "Nova versão encontrada...",

                    progresso:
                        40
                }
            );

        }

    }
);


// ========================================
// DOWNLOAD
// ========================================

autoUpdater.on(
    "download-progress",
    (info) => {

        const progresso =
            Math.floor(info.percent);


        console.log(
            "Download:",
            progresso + "%"
        );


        if (mainWindow) {

            mainWindow.webContents.send(
                "status-update",
                {
                    texto:
                        "Baixando atualização...",

                    progresso:
                        progresso
                }
            );

        }

    }
);


// ========================================
// ATUALIZAÇÃO BAIXADA
// ========================================

autoUpdater.on(
    "update-downloaded",
    () => {

        console.log(
            "Atualização baixada."
        );


        if (mainWindow) {

            mainWindow.webContents.send(
                "status-update",
                {
                    texto:
                        "Atualização pronta!",

                    progresso:
                        100
                }
            );

        }


        setTimeout(() => {

            autoUpdater.quitAndInstall();

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
            "Erro no atualizador:",
            erro
        );


        /*
         * Se houver erro no updater,
         * NÃO vamos impedir o PIU de abrir.
         */

        if (mainWindow) {

            mainWindow.webContents.send(
                "status-update",
                {
                    texto:
                        "Iniciando PIU!...",

                    progresso:
                        100
                }
            );

        }


        setTimeout(() => {

            abrirAplicacao();

        }, 500);

    }
);


// ========================================
// SALVAR DISPOSITIVO
// ========================================

ipcMain.handle(
    "salvar-dispositivo",
    (event, dispositivo) => {

        store.set(
            "dispositivo",
            dispositivo
        );


        return true;

    }
);


// ========================================
// OBTER DISPOSITIVO
// ========================================

ipcMain.handle(
    "obter-dispositivo",
    () => {

        return store.get(
            "dispositivo"
        );

    }
);


// ========================================
// RESETAR DISPOSITIVO
// ========================================

ipcMain.handle(
    "limpar-dispositivo",
    () => {

        console.log(
            "RESET: apagando dispositivo..."
        );


        store.delete(
            "dispositivo"
        );


        console.log(
            "RESET: dispositivo apagado."
        );


        if (mainWindow) {

            mainWindow.close();

        }


        mainWindow =
            createWindow(
                null
            );


        return true;

    }
);


// ========================================
// FECHAR APLICAÇÃO
// ========================================

app.on(
    "window-all-closed",
    () => {

        if (
            process.platform !== "darwin"
        ) {

            app.quit();

        }

    }
);