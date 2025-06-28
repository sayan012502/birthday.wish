// ─── PLAY MUSIC & CONFETTI ────────────────────────────────────
function playMusic() {
  document.getElementById("song").play();
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// ─── FIREWORKS (bursting confetti) ────────────────────────────
function launchFireworks() {
  const end = Date.now() + 1500;
  const colors = ['#ff007f', '#ffffff', '#ffd700'];

  (function frame() {
    confetti({
      particleCount: 30,
      angle: Math.random() * 360,
      spread: 60,
      colors: colors,
      origin: { x: Math.random(), y: Math.random() * 0.6 }
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// ─── AGE CALCULATOR ───────────────────────────────────────────
(function calcAge(){
  const now = new Date();
  const dob = new Date('1998-01-07T00:00:00');
  let age = now.getFullYear() - dob.getFullYear();
  if (
      now.getMonth() < dob.getMonth() ||
      (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())
    ) { age--; }
  document.getElementById('age').textContent = age;
})();

// ─── COUNTDOWN TIMER ──────────────────────────────────────────
(function countdown(){
  // next birthday (handles after‑Jan‑07 correctly)
  const today = new Date();
  const yr = today.getMonth() > 0 || (today.getMonth() === 0 && today.getDate() > 7)
           ? today.getFullYear() + 1 : today.getFullYear();
  const target = new Date(`${yr}-01-07T00:00:00`);
  const ids = {d:'d',h:'h',m:'m',s:'s'};

  function update(){
    const now = new Date();
    const diff = target - now;
    if (diff <= 0) return; // reached
    const s = Math.floor(diff/1000)%60;
    const m = Math.floor(diff/(1000*60))%60;
    const h = Math.floor(diff/(1000*60*60))%24;
    const d = Math.floor(diff/(1000*60*60*24));
    Object.entries({d,h,m,s}).forEach(([k,v])=>document.getElementById(ids[k]).textContent=v);
  }
  update();
  setInterval(update,1000);
})();

// ─── SURPRISE MODAL ───────────────────────────────────────────
setTimeout(()=>document.getElementById('modal').classList.remove('hidden'), 5000);
document.getElementById('closeModal').onclick = ()=>document.getElementById('modal').classList.add('hidden');

// ─── SHARE BUTTON (Web Share API fallback) ────────────────────
document.getElementById('shareBtn').addEventListener('click', async ()=>{
  const url = window.location.href;
  const title = 'Wish Rahul a Happy Birthday!';
  const text  = 'Join the party 🎉';
  if (navigator.share) {
    try{ await navigator.share({title,text,url}); }
    catch(e){ /* cancelled */ }
  } else {
    // fallback: WhatsApp
    window.open(`https://wa.me/?text=${encodeURIComponent(text+' '+url)}`,'_blank');
  }
});

// ─── INIT AOS (scroll animations) ─────────────────────────────
AOS.init({duration:1000, once:true});
