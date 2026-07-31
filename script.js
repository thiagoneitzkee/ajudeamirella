// Configurações iniciais
let GOAL = 100000.00;
let RAISED = 0.00;

// Dados de contato / PIX
const PIX_KEY = "53984860921";
const CONTACT_EMAIL = "larissaneitzke2016@gmail.com";
const CONTACT_WHATSAPP = "53984860921";

// Formatação
function formatBRL(v){ return v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); }

function updateUI(){
  const percent = Math.min(100, GOAL > 0 ? Math.round((RAISED/GOAL) * 100) : 0);
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = percent + '%';

  const raisedEl = document.getElementById('raisedAmount');
  if (raisedEl) raisedEl.textContent = formatBRL(RAISED);

  const goalEl = document.getElementById('goalAmount');
  if (goalEl) goalEl.textContent = formatBRL(GOAL);

  const pixKeyEl = document.getElementById('pixKey');
  if (pixKeyEl) pixKeyEl.textContent = PIX_KEY;
}

// Função para adicionar doações (pode ser usada no console)
function addDonation(amount){
  const v = Number(amount);
  if (isNaN(v) || v <= 0) return false;
  RAISED += v;
  updateUI();
  return true;
}

// Copiar chave PIX
function copyToClipboard(text){
  if (navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e){ console.error(e); }
    document.body.removeChild(ta);
    return Promise.resolve();
  }
}

document.addEventListener('DOMContentLoaded', ()=> {
  updateUI();

  const copyBtn = document.getElementById('copyPix');
  if (copyBtn){
    copyBtn.addEventListener('click', async () => {
      await copyToClipboard(PIX_KEY);
      copyBtn.textContent = 'Chave copiada ✓';
      setTimeout(()=> copyBtn.textContent = 'Copiar chave PIX', 3000);
    });
  }

  const copyBtnMsg = document.getElementById('copyPixWithMsg');
  if (copyBtnMsg){
    copyBtnMsg.addEventListener('click', async () => {
      const text = `${PIX_KEY} | DOACAO-MIRELLA-2026`;
      await copyToClipboard(text);
      copyBtnMsg.textContent = 'Copiado com TXID ✓';
      setTimeout(()=> copyBtnMsg.textContent = 'Copiar com mensagem', 3000);
    });
  }

  // Galeria lightbox
  const thumbs = document.querySelectorAll('.thumb');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lb-img');
  const lbClose = document.querySelector('.lb-close');

  thumbs.forEach(t => {
    t.addEventListener('click', () => {
      const src = t.getAttribute('data-src');
      if (!src) return;
      lbImg.src = src;
      lightbox.setAttribute('aria-hidden','false');
    });
  });

  lbClose.addEventListener('click', ()=> {
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.setAttribute('aria-hidden','true');
      lbImg.src = '';
    }
  });

  // Links de doação (substitua os href no HTML para usar)
  const paypalLink = document.getElementById('paypalLink');
  if (paypalLink) paypalLink.href = '#';

  const picpayLink = document.getElementById('picpayLink');
  if (picpayLink) picpayLink.href = '#';

  const vakinhaLink = document.getElementById('vakinhaLink');
  if (vakinhaLink) vakinhaLink.href = '#';
});

// Expose for console use
window.addDonation = addDonation;
window.updateUI = updateUI;
