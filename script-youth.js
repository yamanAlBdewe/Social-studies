


function goBack() {
  
  if (history.length > 1) history.back(); else window.location.href = 'index.html';
}


function scrollToTop() { window.scrollTo({top:0, behavior:'smooth'}); }


document.addEventListener('DOMContentLoaded', () => {
  const nodes = Array.from(document.querySelectorAll('.node'));
  const cards = Array.from(document.querySelectorAll('.card'));
  const path = document.getElementById('journeyPath');

  
  function clearActive() { nodes.forEach(n=>n.classList.remove('active')); cards.forEach(c=>c.classList.remove('revealed')); }

  
  nodes.forEach(node => {
    node.addEventListener('click', () => {
      const id = node.dataset.id;
      const card = document.getElementById(id);
      if (!card) return;
      clearActive();
      node.classList.add('active');
      
      card.classList.add('revealed');
      card.scrollIntoView({behavior: 'smooth', block: 'center'});
    });
  });

  
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
  
        const id = entry.target.id;
        const matching = document.querySelector(`.node[data-id="${id}"]`);
        if (matching) {
          document.querySelectorAll('.node').forEach(n=>n.classList.remove('active'));
          matching.classList.add('active');
        }
      }
    });
  }, { threshold: 0.35 });

  cards.forEach(card => io.observe(card));


  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');

  document.querySelectorAll('.play-video').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.video || 'assets/sample-video.mp4';
      modalVideo.src = src;
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      modalVideo.play().catch(()=>{});
    });
  });
});

function closeVideo() {
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = '';
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
