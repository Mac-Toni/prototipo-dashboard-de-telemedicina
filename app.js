// Simulando dados que viriam de uma API (como a do Tellescope)
const medData = [
    { id: 1, name: "Cardiologia", price: 250 },
    { id: 2, name: "Dermatologia", price: 180 },
    { id: 3, name: "Clínico Geral", price: 120 },
    { id: 4, name: "Psicologia", price: 150 }
];

const select = document.getElementById('specialty-select');
const priceDisplay = document.getElementById('price-display');
const consoleLog = document.getElementById('console-log');
const btnBook = document.getElementById('btn-book');

// Função para logar no "terminal" da tela (Ótimo para o vídeo!)
function addLog(message) {
    const p = document.createElement('p');
    p.innerText = `> ${new Date().toLocaleTimeString()}: ${message}`;
    consoleLog.prepend(p);
}

// 1. Popular o Select (Simulando Fetch de API)
setTimeout(() => {
    select.innerHTML = '<option value="">Selecione...</option>';
    medData.forEach(item => {
        let opt = document.createElement('option');
        opt.value = item.price;
        opt.innerHTML = item.name;
        select.appendChild(opt);
    });
    addLog("Especialidades carregadas via API Mock.");
}, 800);

// 2. Evento de Troca de Preço
select.addEventListener('change', (e) => {
    const price = e.target.value;
    priceDisplay.innerText = price ? `R$ ${price},00` : "R$ 0,00";
    if(price) addLog(`Preço atualizado para ${price} (Stripe Logic).`);
});

// 3. Simulação de Checkout
btnBook.addEventListener('click', () => {
    if(!select.value) {
        addLog("ERRO: Selecione uma especialidade!");
        return;
    }
    btnBook.innerText = "Processando...";
    btnBook.disabled = true;
    
    addLog("Iniciando Stripe Checkout Session...");
    
    setTimeout(() => {
        addLog("Sucesso! Pagamento confirmado.");
        alert("Agendamento realizado com sucesso! (Isso é um rascunho de execução)");
        btnBook.innerText = "Confirmar Agendamento e Pagar";
        btnBook.disabled = false;
    }, 1500);
});