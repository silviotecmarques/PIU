const { autoUpdater } = require("electron-updater");

function iniciarAtualizador(win) {

    autoUpdater.autoDownload = true;
    autoUpdater.autoInstallOnAppQuit = true;

    autoUpdater.on("checking-for-update", () => {
        console.log("Verificando atualizações...");
    });

    autoUpdater.on("update-available", (info) => {

        console.log("Nova versão encontrada:", info.version);

        win.webContents.send(
            "update-status",
            "Baixando atualização..."
        );

    });

    autoUpdater.on("update-not-available", () => {

        console.log("Aplicativo atualizado.");

    });

    autoUpdater.on("download-progress", (progress) => {

        win.webContents.send(
            "update-progress",
            Math.round(progress.percent)
        );

    });

    autoUpdater.on("update-downloaded", () => {

        win.webContents.send(
            "update-status",
            "Atualização pronta."
        );

        autoUpdater.quitAndInstall();

    });

    autoUpdater.on("error", (err) => {

        console.error(err);

    });

    autoUpdater.checkForUpdatesAndNotify();

}

module.exports = {
    iniciarAtualizador
};