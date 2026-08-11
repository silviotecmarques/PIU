const nome = document.getElementById("nomeDispositivo");
const icone = document.getElementById("icone");
const botao = document.getElementById("btnPiu");


let dispositivo = null;
let canalCaixa = null;



console.log("CAIXA.JS CARREGADO");



async function iniciar() {


    dispositivo =
        await window.electronAPI.obterDispositivo();



    if (!dispositivo) {

        alert("Dispositivo não configurado.");

        return;

    }



    nome.textContent =
        dispositivo.nome;



    icone.src =
        "img/dormindo.png";



    console.log(
        "Dispositivo:",
        dispositivo
    );



    await sincronizarDispositivo();


    escutarAtendimento();


}



botao.addEventListener(
"click",
() => {


    console.log(
        "BOTÃO PIU CLICADO"
    );


    chamarADM();


});



iniciar();

botao.addEventListener(
    "click",
    chamarADM
);



async function sincronizarDispositivo() {


    const { data, error } = await db
        .from("dispositivos")
        .select("id")
        .eq("id", dispositivo.id)
        .maybeSingle();


    if (error) {

        console.error(error);

        return;

    }



    if (!data) {


        const { error } = await db
            .from("dispositivos")
            .insert({

                id: dispositivo.id,

                nome: dispositivo.nome,

                tipo: dispositivo.tipo

            });



        if (error) {

            console.error(error);

        }


    }


}



async function chamarADM() {


    botao.disabled = true;


    botao.textContent =
        "CHAMANDO...";


    icone.src =
        "img/chamando.png";



    const { data, error } =
        await db
        .from("chamadas")
        .insert({

            origem: dispositivo.id,

            status: "chamando"

        })
        .select()
        .single();



    if (error) {


        console.error(error);


        botao.disabled = false;


        botao.textContent =
            "PIU!";


        icone.src =
            "img/dormindo.png";


        return;

    }



    const chamadaId =
        data.id;



    setTimeout(async () => {


        const { data: atual } =
            await db
            .from("chamadas")
            .select("status")
            .eq("id", chamadaId)
            .single();



        if(
            atual &&
            atual.status === "chamando"
        ){


            await db
            .from("chamadas")
            .update({

                status:"cancelada"

            })
            .eq("id", chamadaId);



            icone.src =
                "img/dormindo.png";


            botao.disabled =
                false;


            botao.textContent =
                "PIU!";


        }


    },10000);


}



function escutarAtendimento() {


    canalCaixa =
        db
        .channel(
            "piu-caixa-" + dispositivo.id
        )

        .on(

            "postgres_changes",

            {

                event: "UPDATE",

                schema: "public",

                table: "chamadas"

            },


            (payload) => {


                if (

                    payload.new.origem === dispositivo.id &&

                    payload.new.status === "atendida"

                ) {


                    chamadaAtendida();


                }


            }

        )

        .subscribe();


}



function chamadaAtendida() {


    icone.src =
        "img/dormindo.png";


    botao.textContent =
        "PIU!";


    botao.disabled =
        false;


}



const btnConfig =
    document.getElementById("config");



btnConfig.addEventListener(
    "click",
    () => {

        window.location.href =
            "config.html";

    }
);