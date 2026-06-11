/**
 * AncestralCrop.js
 * Solução interativa de cultivo ancestral e regeneração planetária.
 * Pode ser importado em qualquer arquivo HTML para gerar o componente.
 */

(function() {
    // 1. Injeção automática dos estilos CSS para manter o arquivo único
    const estilos = `
        .ancestral-container {
            font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f7f9f6;
            border-radius: 16px;
            padding: 25px;
            max-width: 650px;
            margin: 20px auto;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            border-top: 6px solid #2e7d32;
        }
        .ancestral-header { text-align: center; margin-bottom: 20px; }
        .ancestral-header h2 { color: #1b5e20; margin: 0 0 10px 0; }
        .ancestral-grid {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
            margin-bottom: 25px;
        }
        .ancestral-card {
            background: #ffffff;
            border: 2px solid #c8e6c9;
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
            border-color: #2e7d32;
            background-color: #e8f5e9;
        }
        .ancestral-icon { font-size: 2.5rem; margin-bottom: 8px; }
        .ancestral-card h4 { margin: 5px 0; color: #37474f; }
        .ancestral-card p { margin: 0; font-size: 0.85rem; color: #78909c; }
        .ancestral-painel {
            background: #ffffff;
            border-radius: 8px;
            padding: 20px;
            border: 1px solid #cfd8dc;
            text-align: center;
        }
        .ancestral-btn {
            background-color: #2e7d32;
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
        .ancestral-btn:hover { background-color: #1b5e20; }
        .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 0.85rem;
            font-weight: bold;
            margin-top: 10px;
            background: #ffe0b2;
            color: #e65100;
        }
        .status-badge.completo { background: #c8e6c9; color: #1b5e20; }
    `;

    const estiloElemento = document.createElement('style');
    estiloElemento.textContent = estilos;
    document.head.appendChild(estiloElemento);

    // 2. Banco de dados do conhecimento das Três Marias (Milpa)
    const sabedoriaAncestral = {
        milho: {
            nome: "Milho",
            icone: "🌽",
            funcao: "O Suporte",
            sinergia: "O Milho cresce alto e forte, servindo como uma estrutura de suporte vertical natural para o feijão trepador, eliminando estacas artificiais."
        },
        feijao: {
            nome: "Feijão",
            icone: "🫘",
            funcao: "O Nutritivo",
            sinergia: "O Feijão absorve o nitrogênio do ar e o fixa no solo através de suas raízes, alimentando o milho e a abóbora sem necessidade de adubo químico."
        },
        abobora: {
            nome: "Abóbora",
            icone: "🎃",
            funcao: "A Protetora",
            sinergia: "As folhas largas da Abóbora espalham-se rente ao chão, criando uma cobertura viva que mantém a umidade da terra e impede ervas concorrentes."
        }
    };

    const selecao = new Set();

    // 3. Função para inicializar o componente na página do usuário
    function inicializarInteracao() {
        // Procura por um elemento com o id 'ancestral-root' ou injeta no final do body
        let alvo = document.getElementById('ancestral-root');
        if (!alvo) {
            alvo = document.createElement('div');
            alvo.id = 'ancestral-root';
            document.body.appendChild(alvo);
        }

        // Montagem da estrutura HTML
        alvo.innerHTML = `
            <div class="ancestral-container">
                <div class="ancestral-header">
                    <h2>Consórcio das Três Marias 🌱</h2>
                    <p>Ative a combinação ancestral maia de policultura para simular a regeneração do solo em tempo real.</p>
                </div>
                <div class="ancestral-grid" id="ancestral-grid"></div>
                <div class="ancestral-painel" id="ancestral-painel">
                    <p id="ancestral-texto">Selecione os cultivos acima para descobrir as conexões ecológicas.</p>
                    <div id="ancestral-status"></div>
                </div>
            </div>
        `;

        // Renderização dos cards de plantas
        const grid = document.getElementById('ancestral-grid');
        Object.keys(sabedoriaAncestral).forEach(chave => {
            const planta = sabedoriaAncestral[chave];
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

    // 4. Lógica de interação e atualização do ecossistema
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
            texto.innerHTML = "Selecione os cultivos acima para descobrir as conexões ecológicas.";
            status.innerHTML = "";
            return;
        }

        if (selecao.size === 3) {
            texto.innerHTML = `
                <strong>✨ Sinergia Sagrada Alcançada! ✨</strong><br><br>
                Você reuniu o consórcio completo das Três Marias (Milho, Feijão e Abóbora). Juntas, elas criam um ecossistema autossustentável que protege a biodiversidade, economiza água e regenera o planeta de forma prática e escalável.
            `;
            status.innerHTML = `
                <div class="status-badge completo">Solo 100% Regenerativo</div>
                <br>
                <button class="ancestral-btn" onclick="window.open('https://github.com', '_blank')">
                    Levar Solução para o Mundo Real
                </button>
            `;
            return;
        }

        // Caso tenha selecionado 1 ou 2 plantas
        let relatorio = "";
        selecao.forEach(chave => {
            const p = sabedoriaAncestral[chave];
            relatorio += `<strong>${p.nome}:</strong> ${p.sinergia}<br><br>`;
        });
        
        texto.innerHTML = relatorio;
        status.innerHTML = `
            <div class="status-badge">Solo em Recuperação (${selecao.size * 33}%)</div>
            <p style="font-size: 0.85rem; margin-top: 10px; color: #546e7a;">
                Combine o Milho, o Feijão e a Abóbora para desbloquear o equilíbrio ecológico total.
            </p>
        `;
    }

    // Garante a execução assim que o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarInteracao);
    } else {
        inicializarInteracao();
    }
})();
