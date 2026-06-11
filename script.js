/**
 * AncestralCrop.js - Versão Sabedoria Indígena Brasileira
 * Componente interativo autônomo para sites hospedados no GitHub.
 */

(function() {
    // 1. Injeção dinâmica dos estilos CSS com paleta inspirada na terra e biodiversidade nativa
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
        .ancestral-header p { color: #6d4c41; font-size: 0.95rem; line-height: 1.5; }
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

    // 2. Banco de dados do conhecimento biológico das roças tradicionais (Mandioca, Feijão-de-Corda e Cará)
    const sabedoriaIndigena = {
        mandioca: {
            nome: "Mandioca",
            icone: "🌿",
            funcao: "A Base da Roça",
            sinergia: "Planta soberana no manejo agrícola indígena. Suas raízes profundas estruturam fisicamente o solo e toleram longos períodos de seca, oferecendo sombreamento e estabilidade para as outras plantas."
        },
        feijao: {
            nome: "Feijão-de-Corda",
            icone: "🫘",
            funcao: "O Nutritivo",
            sinergia: "Fixa o nitrogênio do ar diretamente na terra através de uma relação simbiótica com bactérias em suas raízes. Isso nutre o solo de forma 100% natural, dispensando adubos químicos artificiais."
        },
        cara: {
            nome: "Cará",
            icone: "🥔",
            funcao: "O Protetor",
            sinergia: "Trepadeira nativa que cobre os galhos secos e o chão. Suas folhas largas agem como um escudo contra o impacto das chuvas fortes, reduzindo a erosão e mantendo a umidade do ecossistema."
        }
    };

    const selecao = new Set();

    // 3. Montagem da interface dentro do elemento âncora
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
                    <p>Combine os três pilares do cultivo nativo brasileiro e descubra como o manejo ancestral cria ecossistemas de alta fertilidade inspirados na <strong>Terra Preta de Índio</strong>.</p>
                </div>
                <div class="ancestral-grid" id="ancestral-grid"></div>
                <div class="ancestral-painel" id="ancestral-painel">
                    <p id="ancestral-texto">Selecione os cultivos acima para ativar as interações agroecológicas.</p>
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

    // 4. Lógica de controle do ecossistema e cálculo da sinergia
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
            texto.innerHTML = "Selecione os cultivos acima para ativar as interações agroecológicas.";
            status.innerHTML = "";
            return;
        }

        if (selecao.size === 3) {
            texto.innerHTML = `
                <strong>✨ Sinergia Agroflorestal Concluída! ✨</strong><br><br>
                Ao unir <strong>Mandioca, Feijão-de-Corda e Cará</strong>, você simulou o ciclo regenerativo ideal. Essa policultura protege a biodiversidade microbiana subterrânea, reduz a evaporação da água e enriquece o solo através do manejo biológico de biomassa, promovendo a regeneração contínua.
            `;
            status.innerHTML = `
                <div class="status-badge completo">Fertilidade Estilo 'Terra Preta de Índio' (100%)</div>
                <br>
                <button class="ancestral-btn" onclick="alert('Conexão simulada! Esta ação acionaria o download de técnicas ou integraria o usuário ao banco de dados agroecológico.')">
                    Disseminar Prática no Mundo Real
                </button>
            `;
            return;
        }

        // Relatório para estados parciais (1 ou 2 plantas)
        let relatorio = "";
        selecao.forEach(chave => {
            const p = sabedoriaIndigena[chave];
            relatorio += `<strong>${p.nome}:</strong> ${p.sinergia}<br><br>`;
        });
        
        texto.innerHTML = relatorio;
        status.innerHTML = `
            <div class="status-badge">Solo em Transição Ecológica (${selecao.size * 33}%)</div>
            <p style="font-size: 0.85rem; margin-top: 10px; color: #8d6e63;">
                Combine os três elementos para atingir o equilíbrio de biodiversidade ideal do bioma.
            </p>
        `;
    }

    // Inicialização segura baseada no ciclo de vida do DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarInteracao);
    } else {
        iniciarInteracao();
    }
})();
