const {
    contextBridge,
    ipcRenderer
} = require("electron");


contextBridge.exposeInMainWorld(
    "electronAPI",
    {

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

        }

    }
);