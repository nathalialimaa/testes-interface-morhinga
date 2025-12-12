const api = "https://testemorhingaspring.onrender.com";

async function carregarDadosEstacao() {
    try {
        const response = await fetch(`${api}/api/DadosEstacao`);
        const dados = await response.json();
        console.log("Dados da estação:", dados);
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados da estação:", error);
    }
}

async function carregarDadosPluviometro() {
    try {
        const response = await fetch(`${api}/api/Pluviometro`);
        const dados = await response.json();
        console.log("Dados do pluviômetro:", dados);
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados do pluviômetro:", error);
    }
}

async function carregarDadosSensorDePh() {
    try {
        const response = await fetch(`${api}/api/SensorDePh`);
        const dados = await response.json();
        console.log("Dados do sensor de pH:", dados);
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados do sensor de pH:", error);
    }
}

async function carregarDadosReservatorios() {
    try {
        const response = await fetch(`${api}/api/Reservatorios`);
        const dados = await response.json();
        console.log("Dados dos reservatórios:", dados);
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados dos reservatórios:", error);
    }
}

async function carregarDadosSensorDeSolo() {
    try {
        const response = await fetch(`${api}/api/SensorDeSolo`);
        const dados = await response.json();
        console.log("Dados do sensor de solo:", dados);
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados do sensor de solo:", error);
    }
}

async function carregarDadosAnaliseCompleta() {
    try {
        // Requisição para pegar todos os dados já analisados
        const response = await fetch(`${api}/api/analise-completa`);
        const intervalos = await response.json();

        if (!intervalos || intervalos.length === 0) {
            console.error("Nenhum dado disponível.");
            return [];
        }

        console.log("Dados de análise completa recebidos:", intervalos);
        return intervalos;
    } catch (error) {
        console.error("Erro ao buscar dados unificados:", error);
        return [];
    }
}

export {
    carregarDadosEstacao,
    carregarDadosPluviometro,
    carregarDadosSensorDePh,
    carregarDadosReservatorios,
    carregarDadosSensorDeSolo,
    carregarDadosAnaliseCompleta
};
