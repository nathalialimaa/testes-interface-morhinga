import { carregarDadosAnaliseCompleta } from "./assets/scripts/controller.js";  // Ajuste o caminho conforme necessário

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
  const loadingIndicator = document.getElementById("loadingIndicator");  // Verificando o elemento do indicador de carregamento

  // Evento para fechar o painel
  fecharBtn.addEventListener("click", () => {
    painel.classList.remove("aberto");
  });

  // Evento para o puxador também fechar o painel
  puxador.addEventListener("click", () => {
    painel.classList.remove("aberto");
  });

  // Exibir loading enquanto os dados são carregados (com verificação de existência do elemento)
  if (loadingIndicator) {
    loadingIndicator.style.display = "block";
  }

  // Carrega dados e insere marcador
  carregarDadosAnaliseCompleta().then((dados) => {
    // Ocultar loading após o carregamento dos dados
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }

    if (!dados || dados.length === 0) {
      console.error("Nenhum dado encontrado.");
      return;
    }

    const ultimoDado = dados[dados.length - 1];  // Último dado

    console.log("Gráfico do último dado");
    console.table(ultimoDado);

    // Inserindo marcador no mapa
    const marker = L.marker([-8.08729, -39.57953])
      .addTo(map)
      .bindPopup("Parnamirim")
      .on("click", () => {
        console.log("Clique no marcador: dado mais recente:", ultimoDado);

        // Preenche os gráficos com os dados do último dado
        preencherJustGageCharts(ultimoDado);
        preencherGrafico(ultimoDado);

        painel.classList.add("aberto");  // Exibe o painel deslizante
        puxador.style.display = "flex";
        historicoLink.style.display = "block";
        historicoLink.href = `historico.html?id=${ultimoDado.id}`;
      });
  }).catch((error) => {
    // Ocultar loading em caso de erro
    if (loadingIndicator) {
      loadingIndicator.style.display = "none";
    }
    console.error("Erro ao carregar dados:", error);
  });
});
