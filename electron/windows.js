const { BrowserWindow } = require("electron");
const path = require("path");


function createWindow(
    dispositivo,
    paginaForcada = null
) {

    console.log(
        "CONFIGURAÇÃO ENCONTRADA:",
        dispositivo
    );


    // ========================================
    // DEFINIR PÁGINA
    // ========================================

    let pagina =
        "entrada.html";


    // Se o main.js informou uma página,
    // ela tem prioridade.
    if (paginaForcada) {

        pagina =
            paginaForcada;

    }
    else if (dispositivo) {

        if (
            dispositivo.tipo === "caixa"
        ) {

            pagina =
                "index.html";

        }


        if (
            dispositivo.tipo === "adm"
        ) {

            pagina =
                "adm.html";

        }

    }


    // ========================================
    // TAMANHO DA JANELA
    // ========================================

    let largura = 420;
    let altura = 720;


    // Configuração precisa de mais espaço
    if (
        pagina === "config.html"
    ) {

        altura = 820;

    }


    // Splash
    if (
        pagina === "splash.html"
    ) {

        largura = 420;
        altura = 720;

    }


    // ========================================
    // CRIAR JANELA
    // ========================================

    const win =
        new BrowserWindow({

            width: largura,

            height: altura,

            minWidth: largura,

            minHeight: altura,

            resizable: false,

            autoHideMenuBar: true,

            icon: path.join(
                __dirname,
                "../renderer/img/logo.png"
            ),

            webPreferences: {

                preload: path.join(
                    __dirname,
                    "preload.js"
                ),

                contextIsolation: true,

                nodeIntegration: false

            }

        });


    // Garante que o menu não apareça
    win.setMenuBarVisibility(false);


    console.log(
        "ABRINDO:",
        pagina
    );


    // ========================================
    // CARREGAR PÁGINA
    // ========================================

    win.loadFile(

        path.join(
            __dirname,
            "..",
            "renderer",
            pagina
        )

    );


    return win;

}


module.exports = {
    createWindow
};