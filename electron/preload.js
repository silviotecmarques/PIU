const {
    contextBridge,
    ipcRenderer
} = require("electron");


contextBridge.exposeInMainWorld(
    "electronAPI",
    {

        // ========================================
        // DISPOSITIVO
        // ========================================

        salvarDispositivo: (dispositivo) => {

            return ipcRenderer.invoke(
                "salvar-dispositivo",
                dispositivo
            );

        },


        obterDispositivo: () => {

            return ipcRenderer.invoke(
                "obter-dispositivo"
            );

        },


        limparDispositivo: () => {

            return ipcRenderer.invoke(
                "limpar-dispositivo"
            );

        },


        // ========================================
        // ATUALIZAÇÃO
        // ========================================

        onUpdateStatus: (callback) => {

            ipcRenderer.on(
                "update-status",
                (event, mensagem) => {

                    callback(mensagem);

                }
            );

        },


        onUpdateProgress: (callback) => {

            ipcRenderer.on(
                "update-progress",
                (event, progresso) => {

                    callback(progresso);

                }
            );

        }

    }
);