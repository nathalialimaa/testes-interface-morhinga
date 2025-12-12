import {
    carregarDadosAnaliseCompleta
} from "./controller.js";
import { construirTables } from "./tables.js";

const response = await fetch("http://localhost:8080/api/analise-completa");
const todosOsDados = await response.json();

console.log("Exemplo de dado recebido:", todosOsDados[0]);
document.querySelector("#formTemporal").addEventListener("click", async () => {
    const graficos = document.querySelector("#charts");
    graficos.innerHTML = "";

    const startDate = new Date(document.querySelector("#startDate").value);
    const endDate = new Date(document.querySelector("#endDate").value);

    // 1. Requisição ao backend
    const response = await fetch("http://localhost:8080/api/analise-completa");
    const todosOsDados = await response.json();

    // 2. Filtrar dados conforme intervalo de data
    const dadosFiltrados = todosOsDados.filter(item => {
        if (!item.data || !item.hora) return false;

        const [dia, mes, ano] = item.data.split("/").map(Number);
        const [hora, minuto, segundo] = item.hora.split(":").map(Number);
        const dataCompleta = new Date(ano, mes - 1, dia, hora, minuto, segundo);

        return dataCompleta >= startDate && dataCompleta <= endDate;
    });

    // 3. Mapear dados para gráfico
    const dados = dadosFiltrados.map(item => {
        const [dia, mes, ano] = item.data.split("/").map(Number);
        const [hora, minuto, segundo] = item.hora.split(":").map(Number);
        const dataFormatada = new Date(ano, mes - 1, dia, hora, minuto, segundo);

        return [
            dataFormatada,
            item.temperatura,
            item.pressao,
            item.luminosidade,
            item.co2,
            item.qualidadeAr,
            item.velocidadeVento,
            item.voltagem,
            item.rpm,
            item.ph,
            item.pluviometria
        ];
    });

    // 4. Construir gráficos
    setTimeout(() => {
        gerarGraficoDygraph(dados);
    }, 0);
});

function gerarGraficoDygraph(dados) {
    const chart = document.querySelector("#charts");
    const labels = [
        "Temperatura °C",
        "Pressão hPa",
        "Luminosidade lux",
        "CO2 ppm",
        "Qualidade do Ar AQI",
        "Velocidade do Vento km/h",
        "Voltagem V",
        "RPM",
        "pH",
        "Pluviometria mm"
    ];

    const style = document.createElement('style');
    style.textContent = `
        .graficoDygraph {
            width: 100%;
            height: 300px;
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);

    for (let i = 1; i < dados[0].length; i++) {
        const div = document.createElement("div");
        div.setAttribute("class", "graficoDygraph");
        chart.appendChild(div);

        requestAnimationFrame(() => {
            const d = dados.map(item => [item[0], item[i]]);
            new Dygraph(div, d, {
                legend: "always",
                title: labels[i - 1],
                showRoller: true,
                ylabel: labels[i - 1],
                width: div.offsetWidth,
                height: div.offsetHeight,
            });
        });
    }
}
