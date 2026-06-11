/**
 * AncestralCrop.js - Versão Sabedoria Indígena Brasileira
 * Solução interativa para o ecossistema do GitHub.
 */

(function() {
    // 1. Injeção automática dos estilos CSS estilizados com as cores da nossa terra
    const estilos = `
        .ancestral-container {
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #faf6f0;
            border-radius: 16px;
            padding: 25px;
            max-width: 650px;
            margin: 20px auto;
            box-shadow: 0 8px 24px rgba(0,0,0,0.06);
            border-top: 6px solid #e65100;
        }
        .ancestral-header { text-align: center; margin-bottom: 20px; }
        .ancestral-header h2 { color: #5d4037; margin: 0 0 10px 0; font-size: 1.6rem; }
        .ancestral-grid {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 25px;
        }
        .ancestral-card {
            background: #ffffff;
            border: 2px solid #d7ccc8;
            border-radius: 12px;
            padding: 15px;
            width: 150px;
            text-align: center;
            cursor: pointer;
            transition: all 0.2s ease;
            user-select: none;
        }
        .ancestral-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .ancestral-card.active {
            border-color: #e65100;
            background-color: #fbe9e7;
        }
        .ancestral-icon { font-size: 2.5rem; margin-bottom: 8px; }
        .ancestral-card h4 { margin: 5px 0; color: #3e2723; }
        .ancestral-card p { margin: 0; font-size: 0.85rem; color: #8d6e63; }
        .ancestral-painel {
            background: #ffffff;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #d7ccc8;
            text-align: center;
        }
        .ancestral-btn {
            background-color: #e65100;
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 0.95rem;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 15px;
            font-weight: bold;
            transition: background 0.2s;
        }
        .ancestral-btn:hover { background-color: #bf360c; }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: bold;
            margin-top: 10px;
            background: #ffcc80;
            color: #e65100;
        }
        .status-badge.completo { background: #c8e6c9; color: #1b5e20; }
    `;

    const estiloElemento = document.createElement('style');
    estiloElemento.textContent = estilos;
    document.head.appendChild(estiloElemento);

    // 2. Banco de dados fundamentado no Sistema Agrícola Tradicional da Amazônia e Mata Atlântica
    const sabedoriaIndigena = {
        mandioca: {
            nome: "Mandioca",
            icone: "🌿",
            funcao: "A Base da Roça",
            sinergia: "Planta soberana nas roças indígenas. Suas raízes estruturam o solo e toleram períodos extremos de seca, servindo de base para a segurança alimentar e sombreamento inicial."
        },
        feijao: {
            nome: "Feijão-de-Corda",
            icone: "🫘",
            funcao: "O Nutritivo",
            sinergia: "Se adapta perfeitamente aos solos brasileiros. Fixa o nitrogênio do ar diretamente na terra através de microrganismos simbólicos, adubando as plantas vizinhas de forma biológica."
        },
        cara: {
            nome: "Cará",
            icone: "🥔",
            funcao: "O Protetor do Solo",
            sinergia: "Trepadeira nativa que se espalha pelos galhos caídos ou base da mandioca. Suas folhas protegem o solo contra o impacto direto da chuva tropical, evitando a erosão e mantendo a umidade."
        }
    };

    const selecao = new Set();

    // 3. Inicialização e montagem do HTML dinâmico
    function inicializarInteracao() {
        let alvo = document.getElementById('ancestral-root');
        if (!alvo) {
            alvo = document.createElement('div');
            alvo.id = 'ancestral-root';
            document.body.appendChild(alvo);
        }

        alvo.innerHTML = `
            <div class="ancestral-container">
                <div class="ancestral-header">
                    <h2>Consórcio de Roça Tradicional Indígena 🏹</h2>
                    <p>Combine os cultivos do manejo agroflorestal nativo do Brasil para simular a criação de uma <strong>Terra Preta de Índio</strong> hiper-fértil.</p>
                </div>
                <div class="ancestral-grid" id="ancestral-grid"></div>
                <div class="ancestral-painel" id="ancestral-painel">
                    <p id="ancestral-texto">Selecione as plantas nativas acima para entender o manejo biológico do solo.</p>
                    <div id="ancestral-status"></div>
                </div>
            </div>
        `;

        const grid = document.getElementById('ancestral-grid');
        Object.keys(sabedoriaIndigena).forEach(chave => {
            const planta = sabedoriaIndigena[chave];
            const card = document.createElement('div');
            card.className = 'ancestral-card';
            card.innerHTML = `
                <div class="ancestral-icon">${planta.icone}</div>
                <h4>${planta.nome}</h4>
                <p>${planta.funcao}</p>
            `;
            card.addEventListener('click', () => alternarPlanta(chave, card));
            grid.appendChild(card);
        });
    }

    // 4. Processamento da sinergia ecológica
    function alternarPlanta(chave, elemento) {
        if (selecao.has(chave)) {
            selecao.delete(chave);
            elemento.classList.remove('active');
        } else {
            selecao.add(chave);
            elemento.classList.add('active');
        }
        atualizarPainel();
    }

    function atualizarPainel() {
        const texto = document.getElementById('ancestral-texto');
        const status = document.getElementById('ancestral-status');

        if (selecao.size === 0) {
            texto.innerHTML = "Selecione as plantas nativas acima para entender o manejo biológico do solo.";
            status.innerHTML = "";
            return;
        }

        if (selecao.size === 3) {
            texto.innerHTML = `
                <strong>✨ Sinergia da Biodiversidade Nativa Ativada! ✨</strong><br><br>
                Você recriou o policultivo das roças de coivara brasileiras. O uso combinado dessas três espécies nativas dispensa arados mecânicos e venenos, permitindo que a floresta se regenere sozinha após a colheita, enriquecendo o solo com matéria orgânica duradoura.
            `;
            status.innerHTML = `
                <div class="status-badge completo">Fertilidade Estilo 'Terra Preta de Índio' (100%)</div>
                <br>
                <button class="ancestral-btn" onclick="window.open('https://github.com', '_blank')">
                    Apoiar a Agroecologia no Mundo Real
                </button>
            `;
            return;
        }

        // Fluxo intermediário para 1 ou 2 plantas
        let relatorio = "";
        selecao.forEach(chave => {
            const p = sabedoriaIndigena[chave];
            relatorio += `<strong>${p.nome}:</strong> ${p.sinergia}<br><br>`;
        });
        
        texto.innerHTML = relatorio;
        status.innerHTML = `
            <div class="status-badge">Solo em Transição Ecológica (${selecao.size * 33}%)</div>
            <p style="font-size: 0.85rem; margin-top: 10px; color: #8d6e63;">
                Adicione Mandioca, Feijão-de-Corda e Cará simultaneamente para atingir o equilíbrio de uma roça sustentável.
            </p>
        `;
    }

    // Execução segura pós-carregamento do DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarInteracao);
    } else {
        inicializarInteracao();
    }
})();
