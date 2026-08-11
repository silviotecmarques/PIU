const nome =
    document.getElementById("nome");

const btnCaixa =
    document.getElementById("btnCaixa");

const btnADM =
    document.getElementById("btnADM");

const btnEntrar =
    document.getElementById("btnEntrar");


let tipoSelecionado = "caixa";


// ===============================
// SELECIONAR CAIXA
// ===============================

btnCaixa.addEventListener(
    "click",
    () => {

        tipoSelecionado = "caixa";

        btnCaixa.classList.add(
            "selecionado"
        );

        btnADM.classList.remove(
            "selecionado"
        );

    }
);


// ===============================
// SELECIONAR ADM
// ===============================

btnADM.addEventListener(
    "click",
    () => {

        tipoSelecionado = "adm";

        btnADM.classList.add(
            "selecionado"
        );

        btnCaixa.classList.remove(
            "selecionado"
        );

    }
);


// ===============================
// ENTRAR
// ===============================

btnEntrar.addEventListener(
    "click",
    async () => {

        const nomeDispositivo =
            nome.value.trim();


        if (!nomeDispositivo) {

            alert(
                "Digite o nome do dispositivo."
            );

            nome.focus();

            return;

        }


        btnEntrar.disabled = true;


        const dispositivo = {

            id: crypto.randomUUID(),

            nome: nomeDispositivo,

            tipo: tipoSelecionado,

            iniciarWindows: false

        };


        try {

            await window.electronAPI
                .salvarDispositivo(
                    dispositivo
                );


            if (
                tipoSelecionado === "caixa"
            ) {

                window.location.href =
                    "index.html";

            }
            else {

                window.location.href =
                    "adm.html";

            }


        }
        catch (erro) {

            console.error(
                "Erro ao salvar dispositivo:",
                erro
            );


            btnEntrar.disabled = false;


            alert(
                "Não foi possível configurar o PIU!."
            );

        }

    }
);