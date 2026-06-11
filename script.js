/**
 * Guardiões da Terra - Interação Interativa de Cultivo Ancestral
 * * Este script cria uma seção interativa no site onde os usuários podem explorar
 * técnicas agrícolas ancestrais indígenas brasileiras, calcular o impacto ecológico
 * de sua replicação e se comprometer com práticas de regeneração planetária.
 */

// 1. Banco de Dados de Conhecimento Ancestral e Impacto Regenerativo
const sabedoriaAncestral = {
  milpa: {
    nome: "Sistema Milpa / Três Irmãs (Adaptado)",
    povos: "Povos de diversas etnias (Guarani, Tupinambá)",
    descricao: "Consórcio entre milho, feijão e abóbora. O milho serve de tutor para o feijão, o feijão fixa nitrogênio no solo, e a abóbora cobre a terra mantendo a umidade e evitando ervas espontâneas.",
    beneficioAmbiental: "Elimina a necessidade de fertilizantes químicos e reduz o uso de água em até 30%.",
    fatorRegeneracao: 1.5 // Multiplicador de saúde do solo
  },
  terraPreta: {
    nome: "Terra Preta de Índio (Biochar)",
    povos: "Povos Ancestrais da Amazônia",
    descricao: "Incorporação de carvão vegetal fragmentado, restos de alimentos e cerâmica ao solo. Cria um ecossistema vivo altamente fértil que retém carbono por séculos.",
    beneficioAmbiental: "Sequestro permanente de carbono no solo e regeneração de terras degradadas.",
    fatorRegeneracao: 2.5
  },
  agrofloresta: {
    nome: "Roça de Coivara / Quintais Agroflorestais",
    povos: "Povos Populações Tradicionais e Indígenas (como os Yanomami e Kayapó)",
    descricao: "Cultivo que imita a estrutura da floresta nativa, integrando árvores frutíferas, plantas medicinais e tubérculos (como a mandioca) em diferentes estratos.",
    beneficioAmbiental: "Aumento drástico da biodiversidade local e restauração de microclimas.",
    fatorRegeneracao: 3.0
  }
};

// 2. Estado da Aplicação (Simulando interação do usuário)
let usuarioProgresso = {
  tecnicaSelecionada: null,
  areaSimuladaM2: 0,
  compromissos firmados: 0
};

// 3. Funções Principais de Interação

/**
 * Inicializa a interface interativa no HTML do site
 */
function inicializarPainelAncestral() {
  console.log("🌱 Inicializando Experiência Guardiões da Terra...");
  
  // Cria o container principal se ele não existir
  let container = document.getElementById('espaco-ancestral');
  if (!container) {
    container = document.createElement('div');
    container.id = 'espaco-ancestral';
    document.body.appendChild(container);
  }

  renderizarInterface(container);
}

/**
 * Renderiza os elementos visuais e interativos na página
 */
function renderizarInterface(container) {
  container.innerHTML = `
    <style>
      .card-ancestral { background: #f4efe6; border-left: 5px solid #2e5a44; padding: 15px; margin: 10px 0; border-radius: 4px; font-family: sans-serif; }
      .btn-acao { background-color: #2e5a44; color: white; border: none; padding: 10px 15px; cursor: pointer; border-radius: 4px; margin-top: 10px; }
      .btn-acao:hover { background-color: #1e3d2d; }
      .resultado-painel { background: #e8f0ec; padding: 15px; margin-top: 20px; border-radius: 4px; font-weight: bold; }
    </style>

    <h2>🌍 Conexão Ancestral: Soluções para o Futuro</h2>
    <p>Explore a sabedoria dos povos originários do Brasil e descubra como aplicar a ciência da floresta para regenerar o nosso planeta hoje.</p>
    
    <div id="lista-tecnicas"></div>
    
    <div class="resultado-painel" id="simulador-impacto">
      <h3>Simulador de Regeneração Planetária</h3>
      <label for="input-area">Tamanho do seu quintal ou área comunitária (em m²): </label>
      <input type="number" id="input-area" min="1" value="10" style="padding: 5px; width: 60px;">
      <div id="texto-impacto" style="margin-top: 10px; color: #1e3d2d;">Selecione uma técnica acima para calcular o impacto.</div>
    </div>
  `;

  exibirTecnicas();
  configurarEventos();
}

/**
 * Lista as técnicas disponíveis gerando botões interativos
 */
function exibirTecnicas() {
  const listaDiv = document.getElementById('lista-tecnicas');
  listaDiv.innerHTML = '';

  for (const chave in sabedoriaAncestral) {
    const tecnica = sabedoriaAncestral[chave];
    const card = document.createElement('div');
    card.className = 'card-ancestral';
    card.innerHTML = `
      <h3>${tecnica.nome}</h3>
      <p><strong>Origem:</strong> ${tecnica.povos}</p>
      <p>${tecnica.descricao}</p>
      <p style="font-style: italic; color: #555;">🌱 <strong>Impacto Real:</strong> ${tecnica.beneficioAmbiental}</p>
      <button class="btn-acao" onclick="selecionarTecnica('${chave}')">Conectar com esta técnica</button>
    `;
    listaDiv.appendChild(card);
  }
}

/**
 * Configura os ouvintes de eventos para atualizações em tempo real
 */
function configurarEventos() {
  const inputArea = document.getElementById('input-area');
  inputArea.addEventListener('input', () => {
    usuarioProgresso.areaSimuladaM2 = parseFloat(inputArea.value) || 0;
    atualizarCalculoImpacto();
  });
}

/**
 * Gerencia a seleção da técnica pelo usuário
 */
window.selecionarTecnica = function(chave) {
  usuarioProgresso.tecnicaSelecionada = sabedoriaAncestral[chave];
  const inputArea = document.getElementById('input-area');
  usuarioProgresso.areaSimuladaM2 = parseFloat(inputArea.value) || 10;
  
  atualizarCalculoImpacto();
};

/**
 * Realiza o cálculo lógico do impacto ecológico baseado na escolha do usuário
 */
function atualizarCalculoImpacto() {
  const textoImpacto = document.getElementById('texto-impacto');
  const tecnica = usuarioProgresso.tecnicaSelecionada;
  const area = usuarioProgresso.areaSimuladaM2;

  if (!tecnica) {
    textoImpacto.innerHTML = "Por favor, escolha uma das tecnologias ancestrais acima para iniciar a simulação.";
    return;
  }

  // Algoritmo conceitual de regeneração (Área * Fator da Técnica)
  const pontosRegeneracao = (area * tecnica.fatorRegeneracao).toFixed(1);
  const carbonoRetidoKg = (area * (tecnica.fatorRegeneracao * 0.4)).toFixed(1);

  textoImpacto.innerHTML = `
    <strong>Você escolheu:</strong> ${tecnica.nome}<br><br>
    Ao aplicar essa lógica em uma área de <u>${area}m²</u>, você impulsiona:<br>
    ✨ <strong>+${pontosRegeneracao} pontos</strong> de Índice de Saúde do Solo (Biodiversidade microbiana).<br>
    🛡️ Aproximadamente <strong>${carbonoRetidoKg} kg</strong> de potencial de retenção/mitigação de carbono ao longo do ciclo.<br><br>
    <button class="btn-acao" style="background-color: #d2691e;" onclick="firmarCompromisso()">Multiplicar essa ideia para o mundo!</button>
  `;
}

/**
 * Aciona uma resposta de engajamento social e comunitário
 */
window.firmarCompromisso = function() {
  usuarioProgresso.compromissosFirmados++;
  alert(`✨ Gratidão! Você se conectou a essa rede de regeneração. Compartilhe esse conhecimento com sua comunidade para que possamos reflorestar mentes e práticas!`);
  console.log(`Compromissos ativos nesta sessão: ${usuarioProgresso.compromissosFirmados}`);
};

// Executa a aplicação assim que o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicializarPainelAncestral);
} else {
  inicializarPainelAncestral();
}
