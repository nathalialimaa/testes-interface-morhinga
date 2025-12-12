export function construirTables(data) {
    const parametros = [
        'temperatura', 'umidade', 'pressao', 'velocidadeDoVento', 'cO2',
        'rpm', 'qualidadeDoAr', 'luminosidade', 'voltagem', 'ph', 'pluviometria'
    ];

    parametros.forEach(param => {
        const table = criarTabela(data, param);
        document.querySelector(`#${param}`).appendChild(table);
    });
}

function criarTabela(data, parametro) {
    const table = document.createElement("table");
    table.appendChild(criarCabecalho());
    data.sort((a, b) => new Date(b.intervaloTempo) - new Date(a.intervaloTempo));
    data.forEach(element => {
        const tr = document.createElement("tr");
        tr.appendChild(criarCelula(element.intervaloTempo));
        tr.appendChild(criarCelula(element.mapaDados[parametro].media));
        tr.appendChild(criarCelula(criarLista(element.mapaDados[parametro].moda)));
        tr.appendChild(criarCelula(criarLista(element.mapaDados[parametro].mediana)));
        tr.appendChild(criarCelula(element.mapaDados[parametro].q1));
        tr.appendChild(criarCelula(element.mapaDados[parametro].q3));
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