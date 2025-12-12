export function construirTables(data) {
    const parametros = [
        'temperatura', 'umidade', 'pressao', 'velocidadeDoVento', 'cO2',
        'rpm', 'qualidadeDoAr', 'luminosidade', 'voltagem', 'ph', 'pluviometria'
    ];

    parametros.forEach(param => {
        // Verifica se o parâmetro existe nos dados
        if (data.length && data[0].mapaDados && data[0].mapaDados[param]) {
            const table = criarTabela(data, param);
            const container = document.querySelector(`#${param}`);
            if (container) {
                container.appendChild(table);
            }
        }
    });
}

function criarTabela(data, parametro) {
    const table = document.createElement("table");
    table.appendChild(criarCabecalho());

    // Ordena os dados pela data (intervaloTempo)
    data.sort((a, b) => new Date(b.intervaloTempo) - new Date(a.intervaloTempo));

    data.forEach(element => {
        const tr = document.createElement("tr");

        // Adiciona as células para cada dado
        tr.appendChild(criarCelula(element.intervaloTempo));

        // Verifica se o parametro existe antes de adicionar
        if (element.mapaDados[parametro]) {
            tr.appendChild(criarCelula(element.mapaDados[parametro].media || 'N/A'));
            tr.appendChild(criarCelula(criarLista(element.mapaDados[parametro].moda)));
            tr.appendChild(criarCelula(criarLista(element.mapaDados[parametro].mediana)));
            tr.appendChild(criarCelula(element.mapaDados[parametro].q1 || 'N/A'));
            tr.appendChild(criarCelula(element.mapaDados[parametro].q3 || 'N/A'));
        } else {
            // Caso o parâmetro não esteja nos dados, coloca "N/A"
            tr.appendChild(criarCelula('N/A'));
            tr.appendChild(criarCelula('N/A'));
            tr.appendChild(criarCelula('N/A'));
            tr.appendChild(criarCelula('N/A'));
            tr.appendChild(criarCelula('N/A'));
        }

        table.appendChild(tr);
    });

    return table;
}

function criarCabecalho() {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");

    ['Data e Hora', 'Média', 'Moda', 'Mediana', 'Q1', 'Q3'].forEach(texto => {
        const th = document.createElement("th");
        th.textContent = texto;
        tr.appendChild(th);
    });

    thead.appendChild(tr);
    return thead;
}

function criarCelula(dados) {
    const td = document.createElement("td");
    if (dados instanceof HTMLElement) {
        td.appendChild(dados);
    } else {
        td.textContent = dados;
    }
    return td;
}

function criarLista(dados) {
    if (!Array.isArray(dados)) {
        console.error('dados deve ser um array');
        return document.createTextNode('N/A');
    }

    const ul = document.createElement("ul");
    dados.forEach(element => {
        const li = document.createElement("li");
        li.textContent = element;
        ul.appendChild(li);
    });
    return ul;
}
