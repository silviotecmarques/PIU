const continuar = document.getElementById("continuar");

continuar.addEventListener("click", async () => {

    const tipo = document.querySelector(
        'input[name="tipo"]:checked'
    ).value;

    if (tipo === "adm") {

        await window.api.salvarDispositivo({

            id: crypto.randomUUID(),

            nome: "ADM",

            tipo: "adm"

        });

        location.reload();

        return;

    }

    location.href = "nome.html";

});