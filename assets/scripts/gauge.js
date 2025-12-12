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
    const valorBruto = parseFloat(listData[campo]) || 0;
    const valorLimitado = limitarValor(valorBruto, min, max);
    const grafico = document.getElementById(`grafico${id}`);
    // const mostradorGauge = document.getElementById(`mostrador${id}Gauge`);

    console.log("Valor do gráfico Normal: ", grafico);
    // console.log("Valor do mostrador: ", mostradorGauge);

    if (!grafico) {
      console.warn(`Elemento com ID grafico${id} não encontrado.`);
      return;
    }

    // if (!grafico || !mostradorGauge) {
    //   console.warn(`Elemento com ID grafico${id} ou mostrador${id} não encontrado.`);
    //   return;
    // }

    // mostradorGauge.innerHTML = `${valorLimitado.toFixed(fixo)}${sufixo}`;
    grafico.style = colorRangeChange(min, max, valorLimitado, etapa1, etapa2);
    // grafico.append(mostradorGauge);
  });
}
