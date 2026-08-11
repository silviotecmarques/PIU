async function criarChamada() {

    const dispositivo =
        await window.electronAPI.obterDispositivo();

    // Verifica se já existe uma chamada pendente
    const { data, error } = await db
        .from("chamadas")
        .select("id")
        .eq("origem", dispositivo.id)
        .eq("status", "pendente");

    if (error) {
        console.error(error);
        return false;
    }

    // Já existe uma chamada
    if (data.length > 0) {
        return false;
    }

    // Cria nova chamada
    const { error: insertError } = await db
        .from("chamadas")
        .insert({
            origem: dispositivo.id,
            status: "pendente"
        });

    if (insertError) {
        console.error(insertError);
        return false;
    }

    return true;

}

async function verificarChamadaPendente() {

    const dispositivo =
        await window.electronAPI.obterDispositivo();

    const { data, error } = await db
        .from("chamadas")
        .select("*")
        .eq("origem", dispositivo.id)
        .eq("status", "pendente")
        .single();

    if (error && error.code !== "PGRST116") {
        console.error(error);
        return false;
    }

    if (!data)
        return false;

    return data;

}

async function atenderChamada(origem) {

    const { error } = await db
        .from("chamadas")
        .update({
            status: "atendida"
        })
        .eq("origem", origem)
        .eq("status", "pendente");

    if (error) {
        console.error(error);
        return false;
    }

    return true;

}