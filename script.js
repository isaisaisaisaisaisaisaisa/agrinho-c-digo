/**
 * ============================================
 * GUARDIÕES DA TERRA
 * ============================================
 * Interação Interativa de Cultivo Ancestral
 * 
 * Este script cria uma seção interativa no site onde os usuários podem explorar
 * técnicas agrícolas ancestrais indígenas brasileiras, calcular o impacto ecológico
 * de sua replicação e se comprometer com práticas de regeneração planetária.
 * 
 * ✨ Melhorias implementadas:
 * - Correção de bugs
 * - Acessibilidade melhorada (ARIA labels, atributos semânticos)
 * - Validação de entrada robusta
 * - Tratamento de erros
 * - Performance otimizada
 */

// ============================================
// 1. BANCO DE DADOS - Conhecimento Ancestral
// ============================================
const sabedoriaAncestral = {
  milpa: {
    nome: "Sistema Milpa / Três Irmãs (Adaptado)",
    povos: "Povos de diversas etnias (Guarani, Tupinambá)",
    descricao: "Consórcio entre milho, feijão e abóbora. O milho serve de tutor para o feijão, o feijão fixa nitrogênio no solo, e a abóbora cobre a terra mantendo a umidade e evitando ervas daninhas.",
    beneficioAmbiental: "Elimina a necessidade de fertilizantes químicos e reduz o uso de água em até 30%.",
    fatorRegeneracao: 1.5,
    emoji: "🌽"
  },
  terraPreta: {
    nome: "Terra Preta de Índio (Biochar)",
    povos: "Povos Ancestrais da Amazônia",
    descricao: "Incorporação de carvão vegetal fragmentado, restos de alimentos e cerâmica ao solo. Cria um ecossistema vivo altamente fértil que retém carbono por séculos.",
    beneficioAmbiental: "Sequestro permanente de carbono no solo e regeneração de terras degradadas.",
    fatorRegeneracao: 2.5,
    emoji: "⚫"
  },
  agrofloresta: {
    nome: "Roça de Coivara / Quintais Agroflorestais",
    povos: "Povos Populações Tradicionais e Indígenas (como os Yanomami e Kayapó)",
    descricao: "Cultivo que imita a estrutura da floresta nativa, integrando árvores frutíferas, plantas medicinais e tubérculos (como a mandioca) em diferentes estratos.",
    beneficioAmbiental: "Aumento drástico da biodiversidade local e restauração de microclimas.",
    fatorRegeneracao: 3.0,
    emoji: "🌳"
  }
};

// ============================================
// 2. ESTADO DA APLICAÇÃO - Gerenciamento de Dados
// ============================================
const usuarioProgresso = {
  tecnicaSelecionada: null,
  areaSimuladaM2: 0,
  compromissosFirmados: 0,
  
  // ✅ CORRECTED: Sem espaço em 'compromissosFirmados'
  
  /**
   * Reseta o progresso do usuário
   */
  resetar() {
    this.tecnicaSelecionada = null;
    this.areaSimuladaM2 = 0;
  }
};

// ============================================
// 3. FUNÇÕES UTILITÁRIAS - Validação e Helpers
// ============================================

/**
 * Valida se a chave de técnica existe
 * @param {string} chave - Chave da técnica a validar
 * @returns {boolean} Verdadeiro se a técnica é válida
 */
function validarTecnica(chave) {
  if (!chave || typeof chave !== 'string') {
    console.error('❌ Chave de técnica inválida:', chave);
    return false;
  }
  
  if (!sabedoriaAncestral.hasOwnProperty(chave)) {
    console.error('❌ Técnica não encontrada:', chave);
    return false;
  }
  
  return true;
}

/**
 * Valida se a área inserida é válida
 * @param {number} area - Área em metros quadrados
 * @returns {boolean} Verdadeiro se a área é válida
 */
function validarArea(area) {
  const areaNum = parseFloat(area);
  
  if (isNaN(areaNum) || areaNum <= 0) {
    console.warn('⚠️ Área inválida. Usando valor padrão.');
    return false;
  }
  
  return true;
}

/**
 * Sanitiza texto para evitar injeção de HTML
 * @param {string} texto - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
function sanitizarTexto(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  return div.innerHTML;
}

// ============================================
// 4. RENDERIZAÇÃO - Interface Interativa
// ============================================

/**
 * Inicializa a interface interativa no HTML do site
 */
function inicializarPainelAncestral() {
  console.log("🌱 Inicializando Experiência Guardiões da Terra...");
  
  try {
    // Busca o container ou cria um novo
    let container = document.getElementById('espaco-ancestral');
    
    if (!container) {
      container = document.createElement('section');
      container.id = 'espaco-ancestral';
      container.setAttribute('aria-labelledby', 'titulo-painel-ancestral');
      
      // Insere antes do rodapé
      const rodape = document.querySelector('.rodape');
      if (rodape) {
        rodape.parentNode.insertBefore(container, rodape);
      } else {
        document.body.appendChild(container);
      }
    }

    renderizarInterface(container);
    anexarEventosBotao();
    
  } catch (erro) {
    console.error('❌ Erro ao inicializar painel:', erro);
  }
}

/**
 * Renderiza os elementos visuais e interativos na página
 * @param {HTMLElement} container - Elemento container
 */
function renderizarInterface(container) {
  container.innerHTML = `
    <h2 id="titulo-painel-ancestral">🌍 Conexão Ancestral: Soluções para o Futuro</h2>
    <p style="text-align: center; color: #636e72; margin-bottom: 1.5rem;">
      Explore a sabedoria dos povos originários do Brasil e descubra como aplicar a ciência da floresta para regenerar o nosso planeta hoje.
    </p>
    
    <div id="lista-tecnicas" role="region" aria-label="Técnicas ancestrais disponíveis"></div>
    
    <div class="resultado-painel" id="simulador-impacto" role="region" aria-label="Simulador de impacto ecológico">
      <h3>📊 Simulador de Regeneração Planetária</h3>
      
      <div style="margin-bottom: 1.5rem;">
        <label for="input-area" style="display: block; margin-bottom: 0.5rem; font-weight: 600;">
          Tamanho do seu quintal ou área comunitária (em m²):
        </label>
        <input 
          type="number" 
          id="input-area" 
          min="1" 
          max="999999"
          value="10"
          aria-label="Área em metros quadrados"
          aria-describedby="descricao-area"
        >
        <small id="descricao-area" style="display: block; margin-top: 0.5rem; color: #636e72;">
          Digite um valor entre 1 e 999.999 m²
        </small>
      </div>
      
      <div 
        id="texto-impacto" 
        role="status" 
        aria-live="polite"
        aria-atomic="true"
        style="margin-top: 1.5rem; padding: 1rem; background-color: rgba(255, 255, 255, 0.5); border-radius: 8px;"
      >
        Selecione uma técnica acima para calcular o impacto.
      </div>
    </div>
  `;

  exibirTecnicas();
  configurarEventos();
}

/**
 * Lista as técnicas disponíveis gerando cards interativos
 */
function exibirTecnicas() {
  const listaDiv = document.getElementById('lista-tecnicas');
  
  if (!listaDiv) {
    console.error('❌ Container de técnicas não encontrado');
    return;
  }
  
  listaDiv.innerHTML = '';

  for (const chave in sabedoriaAncestral) {
    if (!sabedoriaAncestral.hasOwnProperty(chave)) continue;
    
    try {
      const tecnica = sabedoriaAncestral[chave];
      const card = document.createElement('article');
      card.className = 'card-ancestral';
      card.setAttribute('role', 'region');
      card.setAttribute('aria-label', `Técnica: ${tecnica.nome}`);
      
      card.innerHTML = `
        <h3>${tecnica.emoji} ${sanitizarTexto(tecnica.nome)}</h3>
        <p>
          <strong aria-label="Povos originários:">🏛️ Origem:</strong> 
          ${sanitizarTexto(tecnica.povos)}
        </p>
        <p>${sanitizarTexto(tecnica.descricao)}</p>
        <p style="font-style: italic; color: #555; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(46, 90, 68, 0.2);">
          <strong>🌱 Impacto Real:</strong> ${sanitizarTexto(tecnica.beneficioAmbiental)}
        </p>
        <button 
          class="btn-acao" 
          data-tecnica="${chave}"
          aria-label="Conectar com a técnica ${tecnica.nome}"
        >
          ✨ Conectar com esta técnica
        </button>
      `;
      
      listaDiv.appendChild(card);
      
    } catch (erro) {
      console.error('❌ Erro ao renderizar técnica:', chave, erro);
    }
  }
}

/**
 * Configura os ouvintes de eventos para atualizações em tempo real
 */
function configurarEventos() {
  const inputArea = document.getElementById('input-area');
  
  if (!inputArea) {
    console.error('❌ Input de área não encontrado');
    return;
  }

  // Remove listeners anteriores para evitar duplicação
  inputArea.removeEventListener('input', handleAreaChange);
  inputArea.addEventListener('input', handleAreaChange);
}

/**
 * Handler para mudanças na área de entrada
 */
function handleAreaChange() {
  const inputArea = document.getElementById('input-area');
  const valor = parseFloat(inputArea.value);
  
  if (validarArea(valor)) {
    usuarioProgresso.areaSimuladaM2 = valor;
    atualizarCalculoImpacto();
  }
}

/**
 * Anexa eventos aos botões de técnicas (Event Delegation)
 */
function anexarEventosBotao() {
  const listaDiv = document.getElementById('lista-tecnicas');
  
  if (!listaDiv) return;

  listaDiv.removeEventListener('click', handleBotoesAcao);
  listaDiv.addEventListener('click', handleBotoesAcao);
}

/**
 * Handler para cliques em botões de ação (Delegação de Eventos)
 */
function handleBotoesAcao(evento) {
  const botao = evento.target.closest('.btn-acao[data-tecnica]');
  
  if (!botao) return;
  
  const chave = botao.getAttribute('data-tecnica');
  selecionarTecnica(chave);
}

// ============================================
// 5. LÓGICA DE NEGÓCIO - Cálculos e Impacto
// ============================================

/**
 * Gerencia a seleção da técnica pelo usuário
 * @param {string} chave - Chave da técnica selecionada
 */
function selecionarTecnica(chave) {
  if (!validarTecnica(chave)) {
    console.error('❌ Técnica inválida:', chave);
    return;
  }

  usuarioProgresso.tecnicaSelecionada = sabedoriaAncestral[chave];
  const inputArea = document.getElementById('input-area');
  
  if (inputArea) {
    const area = parseFloat(inputArea.value) || 10;
    if (validarArea(area)) {
      usuarioProgresso.areaSimuladaM2 = area;
    }
  }
  
  atualizarCalculoImpacto();
  
  // Feedback visual - scroll suave para o simulador
  const simulador = document.getElementById('simulador-impacto');
  if (simulador) {
    simulador.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

/**
 * Realiza o cálculo lógico do impacto ecológico baseado na escolha do usuário
 */
function atualizarCalculoImpacto() {
  const textoImpacto = document.getElementById('texto-impacto');
  const tecnica = usuarioProgresso.tecnicaSelecionada;
  const area = usuarioProgresso.areaSimuladaM2;

  if (!textoImpacto) {
    console.error('❌ Elemento de impacto não encontrado');
    return;
  }

  if (!tecnica || area <= 0) {
    textoImpacto.innerHTML = "Por favor, escolha uma das técnicas ancestrais acima para iniciar a simulação.";
    textoImpacto.setAttribute('role', 'status');
    return;
  }

  try {
    // Algoritmo conceitual de regeneração (Área * Fator da Técnica)
    const pontosRegeneracao = (area * tecnica.fatorRegeneracao).toFixed(1);
    const carbonoRetidoKg = (area * (tecnica.fatorRegeneracao * 0.4)).toFixed(1);
    const aguaEconomizada = (area * 0.3).toFixed(1); // Exemplo adicional

    textoImpacto.innerHTML = `
      <div style="line-height: 1.8;">
        <strong>✨ Você escolheu: ${sanitizarTexto(tecnica.nome)}</strong><br><br>
        <p>Ao aplicar essa técnica em uma área de <u><strong>${area}m²</strong></u>, você impulsiona:</p>
        <ul style="margin-left: 1.5rem; margin-top: 0.5rem;">
          <li><strong>+${pontosRegeneracao} pontos</strong> de Índice de Saúde do Solo (Biodiversidade microbiana)</li>
          <li><strong>${carbonoRetidoKg} kg</strong> de potencial de retenção/mitigação de carbono</li>
          <li><strong>~${aguaEconomizada}m³</strong> de economia de água estimada</li>
        </ul>
        <br>
        <button 
          class="btn-acao btn-acao-secundario" 
          id="btn-compromisso"
          aria-label="Firmar compromisso com a regeneração planetária"
        >
          🌍 Multiplicar essa ideia para o mundo!
        </button>
      </div>
    `;

    // Anexa o evento ao botão de compromisso
    const btnCompromisso = document.getElementById('btn-compromisso');
    if (btnCompromisso) {
      btnCompromisso.removeEventListener('click', firmarCompromisso);
      btnCompromisso.addEventListener('click', firmarCompromisso);
    }

  } catch (erro) {
    console.error('❌ Erro ao calcular impacto:', erro);
    textoImpacto.textContent = 'Ocorreu um erro ao calcular o impacto. Tente novamente.';
  }
}

/**
 * Aciona uma resposta de engajamento social e comunitário
 */
function firmarCompromisso() {
  usuarioProgresso.compromissosFirmados++;
  
  const mensagem = `✨ Gratidão! Você se conectou a essa rede de regeneração.\n\nCompromissos firmados nesta sessão: ${usuarioProgresso.compromissosFirmados}\n\nCompartilhe esse conhecimento com outras pessoas e inspira uma mudança coletiva!`;
  
  // Usa dialog nativa se disponível, senão usa alert
  if (window.confirm(mensagem + '\n\n(OK para continuar)')) {
    console.log(`🌱 Compromissos ativos nesta sessão: ${usuarioProgresso.compromissosFirmados}`);
  }
}

// ============================================
// 6. INICIALIZAÇÃO - Executa quando o DOM está pronto
// ============================================

/**
 * Função para inicializar quando o documento estiver pronto
 */
function iniciarAplicacao() {
  console.log('✅ Aplicação iniciada com sucesso');
  inicializarPainelAncestral();
}

// Executa a aplicação assim que o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarAplicacao);
} else {
  // DOM já foi carregado
  iniciarAplicacao();
}

// ============================================
// 7. TRATAMENTO DE ERROS GLOBAL
// ============================================

window.addEventListener('error', (evento) => {
  console.error('❌ Erro global capturado:', evento.error);
});

window.addEventListener('unhandledrejection', (evento) => {
  console.error('❌ Promise rejeitada não tratada:', evento.reason);
});
