// Site interativo — estiloso
let GOAL = 103147.00;
let RAISED = 0.00;

// Dados (já preenchidos)
const PIX_KEY = "53984860921";
const CONTACT_EMAIL = "larissaneitzke2016@gmail.com";
const CONTACT_WHATSAPP = "53984860921";
const TXID = "DOACAO-MIRELLA-2026";

// Formatação BRL
function formatBRL(v){ return Number(v).toLocaleString('pt-BR', {style:'currency', currency:'BRL'}); }

// Atualiza UI com animação do progresso
function updateUI(animated = true){
  const percent = Math.min(100, GOAL > 0 ? (RAISED/GOAL) * 100 : 0);
  const fill = document.getElementById('progressFill');
  const raisedEl = document.getElementById('raisedAmount');
  const goalEl = document.getElementById('goalAmount');

  if (raisedEl) raisedEl.textContent = formatBRL(RAISED);
  if (goalEl) goalEl.textContent = formatBRL(GOAL);

  if (fill){
    if (animated){
      requestAnimationFrame(()=> { fill.style.width = percent + '%'; });
    } else {
      fill.style.width = percent + '%';
    }
  }
}

// Simula doação e anima contagem
function addDonation(amount){
  const v = Number(amount);
  if (isNaN(v) || v <= 0) return false;
  const start = RAISED;
  const end = RAISED + v;
  const duration = 700;
  const startTime = performance.now();

  function step(now){
    const t = Math.min(1, (now - startTime)/duration);
    const val = start + (end - start) * t;
    RAISED = val;
    updateUI(false);
    if (t < 1) requestAnimationFrame(step);
    else { RAISED = end; updateUI(true); }
  }
  requestAnimationFrame(step);
  return true;
}

// Copiar para clipboard com fallback
async function copyToClipboard(text){
  if (navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(text);
  } else {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { console.error(e); }
    document.body.removeChild(ta);
    return Promise.resolve();
  }
}

// Lightbox com navegação por teclado
document.addEventListener('DOMContentLoaded', ()=> {
  // UI inicial
  updateUI(false);

  // Copy PIX
  const copyBtn = document.getElementById('copyPix');
  if (copyBtn){
    copyBtn.addEventListener('click', async () => {
      await copyToClipboard(PIX_KEY);
      copyBtn.textContent = 'Chave copiada ✓';
      setTimeout(()=> copyBtn.textContent = 'Copiar chave', 3000);
    });
  }

  const copyBtnMsg = document.getElementById('copyPixWithMsg');
  if (copyBtnMsg){
    copyBtnMsg.addEventListener('click', async () => {
      const text = `${PIX_KEY} | ${TXID}`;
      await copyToClipboard(text);
      copyBtnMsg.textContent = 'Copiado com TXID ✓';
      setTimeout(()=> copyBtnMsg.textContent = 'Copiar com TXID', 3000);
    });
  }

  // Simular doação
  const donateTest = document.getElementById('donateTest');
  if (donateTest) donateTest.addEventListener('click', ()=> addDonation(50));

  // Share (abre dialog share se suportado)
  const shareBtn = document.getElementById('shareBtn');
  if (shareBtn){
    shareBtn.addEventListener('click', async () => {
      const shareData = {
        title: 'Ajude a Mirella',
        text: 'A Mirella precisa de ajuda — saiba mais e contribua.',
        url: location.href
      };
      if (navigator.share){
        try { await navigator.share(shareData); } catch(e){ console.log(e); }
      } else {
        // fallback: copiar link
        await copyToClipboard(location.href);
        alert('Link copiado! Compartilhe nas redes sociais.');
      }
    });
  }

  // Lightbox
  const thumbs = Array.from(document.querySelectorAll('.thumb'));
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.querySelector('.lb-img');
  const lbClose = document.querySelector('.lb-close');
  const lbPrev = document.querySelector('.lb-prev');
  const lbNext = document.querySelector('.lb-next');
  let currentIndex = -1;

  function openLightbox(index){
    const t = thumbs[index];
    if (!t) return;
    const src = t.getAttribute('data-src');
    lbImg.src = src;
    lightbox.setAttribute('aria-hidden','false');
    currentIndex = index;
  }
  function closeLightbox(){
    lightbox.setAttribute('aria-hidden','true');
    lbImg.src = '';
    currentIndex = -1;
  }
  function nextLightbox(){ if (currentIndex < thumbs.length - 1) openLightbox(currentIndex + 1); else openLightbox(0); }
  function prevLightbox(){ if (currentIndex > 0) openLightbox(currentIndex - 1); else openLightbox(thumbs.length - 1); }

  thumbs.forEach((t,i) => t.addEventListener('click', ()=> openLightbox(i)));
  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', nextLightbox);
  lbPrev.addEventListener('click', prevLightbox);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (lightbox.getAttribute('aria-hidden') === 'false'){
      if (e.key === 'ArrowRight') nextLightbox();
      if (e.key === 'ArrowLeft') prevLightbox();
      if (e.key === 'Escape') closeLightbox();
    }
  });

  // Links de pagamento (substitua hrefs no HTML para apontar a campanhas reais)
  const paypalLink = document.getElementById('paypalLink');
  if (paypalLink) paypalLink.href = '#';
  const picpayLink = document.getElementById('picpayLink');
  if (picpayLink) picpayLink.href = '#';
  const vakinhaLink = document.getElementById('vakinhaLink');
  if (vakinhaLink) vakinhaLink.href = '#';
});

// Expor no console
window.addDonation = addDonation;
window.updateUI = updateUI;
