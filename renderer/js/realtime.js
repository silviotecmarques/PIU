let channel = null;


function iniciarRealtime(onNovaChamada) {


    channel =
    db
    .channel("piu-chamadas")


    .on(

        "postgres_changes",

        {

            event: "INSERT",

            schema: "public",

            table: "chamadas"

        },


        async(payload)=>{


            const chamada =
                payload.new;



            if(
                chamada.status !== "chamando"
            ){

                return;

            }



            const { data } =
                await db
                .from("dispositivos")
                .select("*")
                .eq(
                    "id",
                    chamada.origem
                )
                .single();



            if(data){


                onNovaChamada({

                    ...chamada,

                    dispositivo:data

                });


            }


        }

    )


    .subscribe();


}



function pararRealtime(){


    if(channel){

        db.removeChannel(channel);

    }


}