import { carregarDadosAnaliseCompleta } from "./controller.js";

document.querySelector("#formTemporal").addEventListener("click", async () => {
    const graficos = document.querySelector("#charts");
    graficos.innerHTML = ""; // Limpar gráficos antigos

    // 1. Carregar os dados processados pelo back-end
    const intervalos = await carregarDadosAnaliseCompleta();

    if (intervalos.length === 0) {
        graficos.innerHTML = "<p>Nenhum dado disponível.</p>";
        return;
    }

    // 2. Extrair os campos (como 'temperatura', 'pressao', etc.) do primeiro intervalo
    const campos = Object.keys(intervalos[0].mapaDados);

    // 3. Transformar os dados para o formato necessário para os gráficos
    const dadosParaGrafico = intervalos.map(intervalo => {
        const data = new Date(intervalo.intervaloTempo); // Usa a data do intervalo
        const valores = campos.map(campo => intervalo.mapaDados[campo]?.media || 0); // Média de cada campo
        return [data, ...valores];
    });

    // 4. Gerar gráficos para cada campo
    gerarGraficosDygraph(dadosParaGrafico, campos);
});

function gerarGraficosDygraph(dados, campos) {
    const chart = document.querySelector("#charts");

    // Adiciona estilo para os gráficos
    const style = document.createElement('style');
    style.textContent = `
        .graficoDygraph {
            width: 100%;
            height: 300px;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);

    // Criar um gráfico para cada campo
    campos.forEach((campo, index) => {
        const div = document.createElement("div");
        div.setAttribute("class", "graficoDygraph");
        chart.appendChild(div);

        requestAnimationFrame(() => {
            // Seleciona apenas a coluna do campo atual
            const d = dados.map(item => [item[0], item[index + 1]]);

            new Dygraph(div, d, {
                legend: "always",
                title: campo.charAt(0).toUpperCase() + campo.slice(1),
                ylabel: campo,
                showRoller: true,
                width: div.offsetWidth,
                height: div.offsetHeight,
            });
        });
    });
}
