const { app, ipcMain } = require("electron");

const {
    createWindow
} = require("./windows");

const store =
    require("./store");

const {
    iniciarAtualizador
} = require("./updater");


let mainWindow = null;


// ========================================
// ABRIR A APLICAÇÃO
// ========================================

function abrirAplicacao() {

    const dispositivo =
        store.get("dispositivo");


    console.log(
        "ABRINDO APLICAÇÃO:",
        dispositivo
    );


    if (mainWindow) {

        mainWindow.close();

    }


    mainWindow =
        createWindow(
            dispositivo
        );

}


// ========================================
// APP READY
// ========================================

app.whenReady().then(() => {

    console.log(
        "PIU! iniciando..."
    );


    // Primeiro abre o Splash
    mainWindow =
        createWindow(
            null,
            "splash.html"
        );


    /*
     * Dá tempo para o Splash carregar
     * antes de enviar eventos.
     */

    mainWindow.webContents.once(
        "did-finish-load",
        () => {

            console.log(
                "Splash carregado."
            );


            iniciarAtualizador(
                mainWindow,
                abrirAplicacao
            );

        }
    );

});


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


        console.log(
            "DISPOSITIVO SALVO:",
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