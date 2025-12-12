import { preencherGrafico } from "./gauge.js";
import { preencherJustGageCharts } from "./justgagecharts.js";


// Busca os dados do backend
export async function carregarDadosAnaliseCompleta() {
  try {
    const response = await fetch("https://spring-moringa.onrender.com/api/analise-completa");
    const dados = await response.json();
    return dados;
  } catch (error) {
    console.error("Erro ao buscar dados unificados:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const map = L.map("map").setView([-8.08729, -39.57953], 12);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
  }).addTo(map);

  L.Control.geocoder({ defaultMarkGeocode: true }).addTo(map);

  const painel = document.getElementById("painelGraficos");
  const puxador = document.getElementById("puxador");
  const historicoLink = document.getElementById("linkHistorico");
  const fecharBtn = document.getElementById("fecharPainel");

  // Evento para fechar o painel
  fecharBtn.addEventListener("click", () => {
    painel.classList.remove("aberto");
  });

  // Evento para o puxador também fechar o painel
  puxador.addEventListener("click", () => {
    painel.classList.remove("aberto");
  });

  // Carrega dados e insere marcador
  carregarDadosAnaliseCompleta().then((dados) => {
    if (!dados || dados.length === 0) {
      console.error("Nenhum dado encontrado.");
      return;
    }

    const ultimoDado = dados[dados.length - 1];

    console.log("Gráfico do ultimo dado");
    console.table(ultimoDado);

    const marker = L.marker([-8.08729, -39.57953])
      .addTo(map)
      .bindPopup("Parnamirim")
      .on("click", () => {
        console.log("Clique no marcador: dado mais recente:", ultimoDado);

        preencherJustGageCharts(ultimoDado);
        preencherGrafico(ultimoDado);

        painel.classList.add("aberto");  // Exibe o painel deslizante
        puxador.style.display = "flex";
        historicoLink.style.display = "block";
        historicoLink.href = `historico.html?id=${ultimoDado.id}`;
      });
  }).catch((error) => {
    console.error("Erro ao carregar dados:", error);
  });
  
});
