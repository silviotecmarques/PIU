let canalCaixa = null;

async function escutarAtendimento() {

    const dispositivo =
        await window.electronAPI.obterDispositivo();

    canalCaixa = db
        .channel("piu-caixa")
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