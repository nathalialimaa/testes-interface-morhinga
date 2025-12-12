// gauge.js

function limitarValor(valor, min, max) {
  if (valor < min) return min;
  if (valor > max) return max;
  return valor;
}

function colorRangeChange(min, max, value, etapa1, etapa2) {
  const fatorCorrecao = 180 / (max - min);
  const valorLimitado = limitarValor(value, min, max);
  let rotationStyle;

  if (valorLimitado < etapa1) {
    rotationStyle = `--rotation:${(valorLimitado - min) * fatorCorrecao}deg; --color:blue; --background:#e9ecef;`;
  } else if (valorLimitado < etapa2) {
    rotationStyle = `--rotation:${(valorLimitado - min) * fatorCorrecao}deg; --color:yellow; --background:#e9ecef;`;
  } else {
    rotationStyle = `--rotation:${(valorLimitado - min) * fatorCorrecao}deg; --color:red; --background:#e9ecef;`;
  }

  return rotationStyle;
}

function valorSeguro(valor) {
  return (valor !== null && valor !== undefined && !isNaN(valor)) ? Number(valor) : 0;
}

export function preencherGrafico(listData) {
  console.log("Chamada do preencherGrafico com campos:", Object.keys(listData));
  console.log(listData);

  const elementos = [
    { id: "Temperatura", campo: "temperatura", min: 0, max: 50, etapa1: 30, etapa2: 40, sufixo: "°C", fixo: 1 },
    { id: "Umidade", campo: "umidade", min: 0, max: 100, etapa1: 40, etapa2: 70, sufixo: "%", fixo: 1 },
    { id: "Pressao", campo: "pressao", min: 900, max: 1100, etapa1: 980, etapa2: 1020, sufixo: " hPa", fixo: 1 },
    { id: "Luz", campo: "luminosidade", min: 0, max: 100000, etapa1: 20000, etapa2: 50000, sufixo: " lux" },
    { id: "Gas", campo: "co2", min: 0, max: 1000, etapa1: 300, etapa2: 700, sufixo: " ppm" },
    { id: "Ar", campo: "qualidadeAr", min: 0, max: 500, etapa1: 100, etapa2: 200, sufixo: " AQI" },
    { id: "VelocidadeDoVento", campo: "velocidadeVento", min: 0, max: 100, etapa1: 20, etapa2: 50, sufixo: " km/h" },
    { id: "Voltagem", campo: "voltagem", min: 0, max: 5, etapa1: 2.5, etapa2: 4.5, sufixo: " V", fixo: 2 },
    { id: "Rpm", campo: "rpm", min: 0, max: 10000, etapa1: 3000, etapa2: 7000, sufixo: " rpm" },
    { id: "PH", campo: "ph", min: 0, max: 14, etapa1: 6, etapa2: 9 },
    { id: "Pluviometro", campo: "pluviometria", min: 0, max: 100, etapa1: 20, etapa2: 50, sufixo: " mm" }
  ];

  elementos.forEach(({ id, campo, min, max, etapa1, etapa2, sufixo = '', fixo = 0 }) => {
    const valorBruto = parseFloat(listData[campo]?.media) || 0; // Usando 'media' dos valores
    const valorLimitado = limitarValor(valorBruto, min, max);
    const grafico = document.getElementById(`grafico${id}`);
    
    console.log("Valor do gráfico Normal: ", grafico);

    if (!grafico) {
      console.warn(`Elemento com ID grafico${id} não encontrado.`);
      return;
    }

    grafico.style = colorRangeChange(min, max, valorLimitado, etapa1, etapa2);
  });
}

export function preencherJustGageCharts(data) {
  //temperatura
  document.querySelector("#graficoTemperatura").innerHTML = "";
  new JustGage({
    id: "graficoTemperatura",
    value: valorSeguro(data.temperatura.media), // Acessando 'media'
    min: 0,
    max: 50,
    title: "Temperatura °C",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //umidade
  document.querySelector("#graficoUmidade").innerHTML = "";
  new JustGage({
    id: "graficoUmidade",
    value: valorSeguro(data.umidade.media), // Acessando 'media'
    min: 0,
    max: 100,
    title: "Umidade %",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //pressão
  document.querySelector("#graficoPressao").innerHTML = "";
  new JustGage({
    id: "graficoPressao",
    value: valorSeguro(data.pressao.media), // Acessando 'media'
    min: 900,
    max: 1100,
    title: "Pressão hPa",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //luz
  document.querySelector("#graficoLuz").innerHTML = "";
  new JustGage({
    id: "graficoLuz",
    value: valorSeguro(data.luminosidade.media), // Acessando 'media'
    min: 0,
    max: 100000,
    title: "Luminosidade lux",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //co2
  document.querySelector("#graficoGas").innerHTML = "";
  new JustGage({
    id: "graficoGas",
    value: valorSeguro(data.co2.media), // Acessando 'media'
    min: 0,
    max: 1000,
    title: "CO2 ppm",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //qualidade do ar
  document.querySelector("#graficoAr").innerHTML = "";
  new JustGage({
    id: "graficoAr",
    value: valorSeguro(data.qualidadeAr.media), // Acessando 'media'
    min: 0,
    max: 500,
    title: "Qualidade do Ar AQI",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //velocidade do vento
  document.querySelector("#graficoVelocidadeDoVento").innerHTML = "";
  new JustGage({
    id: "graficoVelocidadeDoVento",
    value: valorSeguro(data.velocidadeVento.media), // Acessando 'media'
    min: 0,
    max: 100,
    title: "Velocidade Do Vento km/h",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //voltagem
  document.querySelector("#graficoVoltagem").innerHTML = "";
  new JustGage({
    id: "graficoVoltagem",
    value: valorSeguro(data.voltagem.media), // Acessando 'media'
    min: 0,
    max: 5,  // ajustado conforme backend
    title: "Voltagem V",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //RPM
  document.querySelector("#graficoRpm").innerHTML = "";
  new JustGage({
    id: "graficoRpm",
    value: valorSeguro(data.rpm.media), // Acessando 'media'
    min: 0,
    max: 10000,
    title: "RPM",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //pH
  document.querySelector("#graficoPH").innerHTML = "";
  new JustGage({
    id: "graficoPH",
    value: valorSeguro(data.ph.media), // Acessando 'media'
    min: 0,
    max: 14,
    title: "PH",
    refreshAnimation: true,
    relativeGaugeSize: true
  });

  //pluviometria
  document.querySelector("#graficoPluviometro").innerHTML = "";
  new JustGage({
    id: "graficoPluviometro",
    value: valorSeguro(data.pluviometria.media), // Acessando 'media'
    min: 0,
    max: 100,  // ajustei pra 100 (verifique se faz sentido)
    title: "Pluviometria mm",
    refreshAnimation: true,
    relativeGaugeSize: true
  });
}
