/**
 * HealthConnect - Lógica de Agendamento com Persistência em PostgreSQL
 */

// 1. Configurações de Conexão (Usa o objeto CONFIG definido no config.js)
const supabaseClient = supabase.createClient(CONFIG.SUPABASE_URL, CONFIG.SUPABASE_KEY);

// 2. Seleção de Elementos do DOM
const select = document.getElementById('specialty-select');
const priceDisplay = document.getElementById('price-display');
const consoleLog = document.getElementById('console-log');
const btnBook = document.getElementById('btn-book');

// Dados simulados para o Select (Simulação de resposta de API externa)
const medData = [
  { id: 1, name: "Cardiologia", price: 250 },
  { id: 2, name: "Dermatologia", price: 180 },
  { id: 3, name: "Clínico Geral", price: 120 },
  { id: 4, name: "Psicologia", price: 150 }
];

// 3. Função de Log Visual (Para demonstração no vídeo)
function addLog(message) {
  const p = document.createElement('p');
  p.className = "border-l-2 border-blue-500 pl-2 py-1 bg-slate-800/50 mb-1";
  p.innerText = `> ${new Date().toLocaleTimeString()}: ${message}`;
  consoleLog.prepend(p);
}

// 4. Verificar Conexão com o Supabase e Liberar UI
async function checkConnection() {
  try {
    // Tenta uma consulta simples para validar a API e RLS
    const { error } = await supabaseClient.from('agendamentos').select('id').limit(1);
    
    // PGRST116 é um erro de "não encontrado" que acontece se a tabela estiver vazia (está tudo ok)
    if (!error || error.code === 'PGRST116') {
      btnBook.disabled = false;
      btnBook.classList.remove('opacity-50', 'cursor-not-allowed');
      btnBook.innerText = "Confirmar Agendamento e Pagar";
      addLog("Conexão com PostgreSQL (Supabase) estabelecida.");
    } else {
      addLog(`Aviso de Segurança: ${error.message}`);
      btnBook.innerText = "Erro de Configuração";
    }
  } catch (err) {
    addLog("Erro Crítico: Verifique as chaves no config.js.");
  }
}

// 5. Função para Persistir Dados no Banco Real
async function salvarNoBanco(especialidade, valor) {
  addLog(`Enviando dados para o banco de dados...`);
  
  const { data, error } = await supabaseClient
    .from('agendamentos')
    .insert([{ especialidade: especialidade, valor: parseInt(valor) }]);

  if (error) {
    addLog(`Erro de Inserção: ${error.message}`);
    return false;
  } else {
    addLog(`Dados confirmados no PostgreSQL.`);
    return true;
  }
}

// 6. Popular o Select (Simulando Latência de Rede de 800ms)
setTimeout(() => {
  select.innerHTML = '<option value="">Selecione uma opção...</option>';
  medData.forEach(item => {
    let opt = document.createElement('option');
    opt.value = item.price;
    opt.innerHTML = item.name;
    select.appendChild(opt);
  });
  addLog("Especialidades médicas carregadas via Mock API.");
}, 800);

// 7. Evento de Seleção de Especialidade
select.addEventListener('change', (e) => {
  const price = e.target.value;
  priceDisplay.innerText = price ? `R$ ${price},00` : "R$ 0,00";
  if (price) {
    addLog(`Especialidade selecionada. Valor: R$ ${price}`);
  }
});

// 8. Evento Principal: Checkout e Salvamento
btnBook.addEventListener('click', async () => {
  if (!select.value) {
    addLog("ERRO: Escolha uma especialidade antes de continuar.");
    return;
  }

  const especialidadeNome = select.options[select.selectedIndex].text;
  const valorConsulta = select.value;

  // Feedback Visual de Carregamento
  btnBook.innerText = "Processando Pagamento...";
  btnBook.disabled = true;
  
  addLog("Iniciando fluxo do Stripe Checkout Session...");

  // Simulando a confirmação do pagamento e salvando no banco
  setTimeout(async () => {
    const sucesso = await salvarNoBanco(especialidadeNome, valorConsulta);
    
    if (sucesso) {
      addLog("Pagamento Confirmado! Agendamento Finalizado.");
      alert(`Parabéns, Paulus! Consulta de ${especialidadeNome} agendada e salva no banco.`);
    }

    // Restaura o botão
    btnBook.innerText = "Confirmar Agendamento e Pagar";
    btnBook.disabled = false;
  }, 1200);
});

// Inicialização
checkConnection();