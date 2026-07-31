// Valores iniciais — edite conforme doações chegam
let GOAL = 100000.00; // R$ meta total
let RAISED = 0.00;    // R$ arrecadado atual (inicie em 0 ou atualize conforme necessário)

// PIX / pagamento (mostramos a chave; para QR válido, veja nota)
const PIX_KEY = "53984860921";
const PIX_QR_PLACEHOLDER = "https://via.placeholder.com/220?text=QR+PIX+placeholder";

function formatBRL(v){ return v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); }

function updateUI(){
  document.getElementById('goalAmount').textContent = formatBRL(GOAL);
  document.getElementById('raisedAmount').textContent = formatBRL(RAISED);
  document.getElementById('pixKey').textContent = PIX_KEY;
  document.getElementById('pixQr').src = PIX_QR_PLACEHOLDER;

  const percent = Math.min(100, GOAL > 0 ? Math.round((RAISED/GOAL) * 100) : 0);
  document.getElementById('progressFill').style.width = percent + '%';
}

// Função simples para atualizar manualmente o valor arrecadado (use com cuidado)
function addDonation(amount){
  const v = Number(amount);
  if (isNaN(v) || v <= 0) return false;
  RAISED += v;
  updateUI();
  return true;
}

// Callbacks para botões (os links devem ser atualizados com URLs reais)
document.getElementById('paypalBtn').addEventListener('click', (e) => {
  alert('Substitua o link do PayPal no HTML com seu PayPal.Me ou botão de doação.');
});
document.getElementById('picpayBtn').addEventListener('click', (e) => {
  alert('Substitua o link do PicPay no HTML com o seu perfil ou campanha.');
});

// Inicializa UI
updateUI();
