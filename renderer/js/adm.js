const icone =
document.getElementById("icone");


const nomeDispositivo =
document.getElementById("nomeDispositivo");


const mensagem =
document.getElementById("mensagem");


const botao =
document.getElementById("btnAtendido");


const config =
document.getElementById("config");


let chamadaAtual = null;



async function carregarADM() {


    const dispositivo =
        await window.electronAPI.obterDispositivo();


    if(!dispositivo)
        return;



    nomeDispositivo.textContent =
        dispositivo.nome;



    icone.src =
        "img/dormindo.png";


    mensagem.textContent =
        "";

}




function escutarChamadas(){


    db
    .channel("piu-adm")


    .on(

        "postgres_changes",

        {

            event:"INSERT",

            schema:"public",

            table:"chamadas"

        },


        (payload)=>{


            const chamada =
                payload.new;



            if(
                chamada.status !== "chamando"
            ){

                return;

            }



            chamadaAtual =
                chamada;



            icone.src =
                "img/chamando.png";



            mensagem.textContent =
                chamada.dispositivo?.nome ||
                "Caixa chamando";



            botao.style.display =
                "block";



            tocarCampainha();


        }

    )


    .subscribe();


}





botao.addEventListener(
"click",
async()=>{


    if(!chamadaAtual)
        return;



    const { error } =
        await db
        .from("chamadas")
        .update({

            status:"a_caminho"

        })
        .eq(

            "id",

            chamadaAtual.id

        );



    if(error){

        console.error(error);

        return;

    }



    tocarAtendido();



    icone.src =
        "img/dormindo.png";



    mensagem.textContent =
        "A caminho";



    botao.style.display =
        "none";



});





config.addEventListener(
"click",
()=>{

    window.location.href =
    "config.html";

});




carregarADM();

escutarChamadas();