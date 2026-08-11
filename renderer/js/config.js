const nome =
    document.getElementById("nome");

const tipo =
    document.getElementById("tipo");

const iniciarWindows =
    document.getElementById("iniciarWindows");

const btnSalvar =
    document.getElementById("btnSalvar");

const btnTestar =
    document.getElementById("btnTestar");

const btnVoltar =
    document.getElementById("btnVoltar");

const btnReset =
    document.getElementById("btnReset");


// ========================================
// CARREGAR CONFIGURAÇÃO
// ========================================

async function carregar() {

    try {

        const dispositivo =
            await window.electronAPI
                .obterDispositivo();


        console.log(
            "CONFIGURAÇÃO ENCONTRADA:",
            dispositivo
        );


        if (!dispositivo) {

            window.location.href =
                "entrada.html";

            return;

        }


        nome.value =
            dispositivo.nome || "";


        tipo.value =
            dispositivo.tipo === "caixa"
                ? "CAIXA"
                : "ADM";


        iniciarWindows.checked =
            dispositivo.iniciarWindows || false;


    }
    catch (erro) {

        console.error(
            "Erro ao carregar configuração:",
            erro
        );

    }

}


// ========================================
// SALVAR
// ========================================

btnSalvar.addEventListener(
    "click",
    async () => {

        const dispositivo =
            await window.electronAPI
                .obterDispositivo();


        if (!dispositivo)
            return;


        const novoNome =
            nome.value.trim();


        if (!novoNome) {

            alert(
                "Digite o nome do dispositivo."
            );

            nome.focus();

            return;

        }


        dispositivo.nome =
            novoNome;


        dispositivo.iniciarWindows =
            iniciarWindows.checked;


        try {

            await window.electronAPI
                .salvarDispositivo(
                    dispositivo
                );


            alert(
                "Configurações salvas!"
            );

        }
        catch (erro) {

            console.error(
                "Erro ao salvar:",
                erro
            );

            alert(
                "Não foi possível salvar as configurações."
            );

        }

    }
);


// ========================================
// TESTAR CAMPAINHA
// ========================================

btnTestar.addEventListener(
    "click",
    () => {

        const audio =
            new Audio(
                "sounds/campainha.mp3"
            );


        audio.volume = 1;


        audio.play()
            .catch((erro) => {

                console.error(
                    "Erro ao reproduzir campainha:",
                    erro
                );

            });

    }
);

// ========================================
// VOLTAR
// ========================================

btnVoltar.addEventListener(
    "click",
    async () => {

        const dispositivo =
            await window.electronAPI
                .obterDispositivo();


        if (!dispositivo) {

            window.location.href =
                "entrada.html";

            return;

        }


        if (
            dispositivo.tipo === "caixa"
        ) {

            window.location.href =
                "index.html";

        }
        else {

            window.location.href =
                "adm.html";

        }

    }
);


// ========================================
// RESET
// ========================================

btnReset.addEventListener(
    "click",
    async () => {

        console.log(
            "BOTÃO RESET CLICADO"
        );


        const confirmar =
            confirm(
                "RESETAR O PIU!?\n\n" +
                "A configuração deste dispositivo " +
                "será apagada e o PIU! voltará " +
                "para a tela de entrada."
            );


        if (!confirmar) {

            console.log(
                "RESET CANCELADO"
            );

            return;

        }


        console.log(
            "APAGANDO DISPOSITIVO..."
        );


        btnReset.disabled = true;


        try {

            const resultado =
                await window.electronAPI
                    .limparDispositivo();


            console.log(
                "RESULTADO DO RESET:",
                resultado
            );


            /*
             * IMPORTANTE:
             *
             * O main.js já fecha esta janela
             * e cria uma nova entrada.html.
             *
             * Portanto NÃO fazemos:
             *
             * window.location.href =
             * "entrada.html";
             *
             * aqui.
             */


        }
        catch (erro) {

            console.error(
                "ERRO AO RESETAR:",
                erro
            );


            btnReset.disabled = false;


            alert(
                "Não foi possível resetar o PIU!."
            );

        }

    }
);


// ========================================
// VERSÃO
// ========================================

document.getElementById(
    "versao"
).textContent =
    "PIU! v1.0.0";


// ========================================
// INICIAR
// ========================================

carregar();