// Substitua estes valores via edição direta ou por integração automatizada posteriormente.
const GOAL = 8000.00; // R$ meta
const RAISED = 1234.50; // R$ arrecadado atual
const PIX_KEY = "seu-pix@exemplo.com";
const PIX_QR = "https://via.placeholder.com/220?text=QR+PIX"; // troque pela sua imagem de QR

function formatBRL(v){ return v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); }

document.getElementById('goalAmount').textContent = formatBRL(GOAL);
document.getElementById('raisedAmount').textContent = formatBRL(RAISED);
document.getElementById('pixKey').textContent = PIX_KEY;
document.getElementById('pixQr').src = PIX_QR;

const percent = Math.min(100, Math.round((RAISED/GOAL) * 100));
document.getElementById('progressFill').style.width = percent + '%';

// Optional: simple analytics event (no backend)
document.querySelectorAll('.donation-buttons a').forEach(a=>{
  a.addEventListener('click', ()=> {
    // placeholder for tracking
    console.log('Doação iniciada por:', a.href);
  });
});
