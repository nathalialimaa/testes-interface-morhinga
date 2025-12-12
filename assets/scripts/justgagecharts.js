let mostradorTemperatura;
let mostradorUmidadade;
let mostradorPressao;
let mostradorLuz;
let mostradorGas;
let mostradorAr;
let mostradorVelocidadeVento;
let mostradorVoltagem;
let mostradorRpm;
let mostradorPH;
let mostradorPluviometro;

function valorSeguro(valor) {
  return (valor !== null && valor !== undefined && !isNaN(valor)) ? Number(valor) : 0;
}

export function preencherJustGageCharts(data) {

    //temperatura
    document.querySelector("#graficoTemperatura").innerHTML = "";
    mostradorTemperatura = new JustGage({
        id: "graficoTemperatura",
        value: valorSeguro(data.temperatura),
        min: 0,
        max: 50,
        title: "Temperatura °C",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //umidade
    document.querySelector("#graficoUmidade").innerHTML = "";
    mostradorUmidadade = new JustGage({
        id: "graficoUmidade",
        value: valorSeguro(data.umidade),
        min: 0,
        max: 100,
        title: "Umidade %",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //pressão
    document.querySelector("#graficoPressao").innerHTML = "";
    mostradorPressao = new JustGage({
        id: "graficoPressao",
        value: valorSeguro(data.pressao),
        min: 900,
        max: 1100,
        title: "Pressão hPa",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //luz
    document.querySelector("#graficoLuz").innerHTML = "";
    mostradorLuz = new JustGage({
        id: "graficoLuz",
        value: valorSeguro(data.luminosidade),
        min: 0,
        max: 100000,
        title: "Luminosidade lux",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //co2
    document.querySelector("#graficoGas").innerHTML = "";
    mostradorGas = new JustGage({
        id: "graficoGas",
        value: valorSeguro(data.co2),
        min: 0,
        max: 1000,
        title: "CO2 ppm",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //qualidade do ar
    document.querySelector("#graficoAr").innerHTML = "";
    mostradorAr = new JustGage({
        id: "graficoAr",
        value: valorSeguro(data.qualidadeAr), // corrigido
        min: 0,
        max: 500,
        title: "Qualidade do Ar AQI",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //velocidade do vento
    document.querySelector("#graficoVelocidadeDoVento").innerHTML = "";
    mostradorVelocidadeVento = new JustGage({
        id: "graficoVelocidadeDoVento",
        value: valorSeguro(data.velocidadeVento), // corrigido
        min: 0,
        max: 100,
        title: "Velocidade Do Vento km/h",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //voltagem
    document.querySelector("#graficoVoltagem").innerHTML = "";
    mostradorVoltagem = new JustGage({
        id: "graficoVoltagem",
        value: valorSeguro(data.voltagem),
        min: 0,
        max: 5,  // ajustado conforme backend
        title: "Voltagem V",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //RPM
    document.querySelector("#graficoRpm").innerHTML = "";
    mostradorRpm = new JustGage({
        id: "graficoRpm",
        value: valorSeguro(data.rpm),
        min: 0,
        max: 10000,
        title: "RPM",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //pH
    document.querySelector("#graficoPH").innerHTML = "";
    mostradorPH = new JustGage({
        id: "graficoPH",
        value: valorSeguro(data.ph),
        min: 0,
        max: 14,
        title: "PH",
        refreshAnimation: true,
        relativeGaugeSize: true
    });

    //pluviometria
    document.querySelector("#graficoPluviometro").innerHTML = "";
    mostradorPluviometro = new JustGage({
        id: "graficoPluviometro",
        value: valorSeguro(data.pluviometria),
        min: 0,
        max: 100,  // ajustei pra 100 (verifique se faz sentido)
        title: "Pluviometria mm",
        refreshAnimation: true,
        relativeGaugeSize: true
    });
}
