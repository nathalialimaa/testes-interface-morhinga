const api = "https://spring-moringa.onrender.com";

//retorna o getting correspondente ao dto do back-end "DadoSensorUnificado.java"
async function carregarDadosAnaliseCompleta() {
    try {
        const response = await fetch(`${api}/api/analise-completa`);
        const dados = await response.json();
        
        console.log("Dados unificados recebidos:", dados);
        
        // Aqui você pode fazer o que quiser com os dados
        //atualizarGrafico(dados);
        return dados;
    } catch (error) {
        console.error("Erro ao buscar dados unificados:", error);
    }
}


export { carregarDadosAnaliseCompleta };
 
