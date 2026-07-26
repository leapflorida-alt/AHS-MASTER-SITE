const menu=document.querySelector('.mobile');
const links=document.querySelector('.links');
if(menu&&links){
  menu.addEventListener('click',()=>{
    const open=links.classList.toggle('show');
    menu.setAttribute('aria-expanded',String(open));
    menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    document.body.classList.toggle('menu-open',open);
  });
  document.querySelectorAll('.dropdown > a').forEach(link=>{
    link.addEventListener('click',event=>{
      if(window.innerWidth<=900){
        event.preventDefault();
        link.parentElement.classList.toggle('open');
      }
    });
  });
  document.querySelectorAll('.links a:not(.dropdown > a), .mobile-menu-contact a').forEach(link=>{
    link.addEventListener('click',()=>{
      links.classList.remove('show');
      menu.setAttribute('aria-expanded','false');
      document.body.classList.remove('menu-open');
    });
  });
}

document.querySelectorAll('[data-count]').forEach(el=>{const target=Number(el.dataset.count),suffix=el.dataset.suffix||'';let n=0;const step=Math.max(1,Math.ceil(target/60));const timer=setInterval(()=>{n=Math.min(target,n+step);el.textContent=n+suffix;if(n>=target)clearInterval(timer)},25)});
const filters=document.querySelectorAll('.filter');filters.forEach(b=>b.onclick=()=>{filters.forEach(x=>x.classList.remove('active'));b.classList.add('active');document.querySelectorAll('[data-cat]').forEach(i=>i.style.display=b.dataset.filter==='all'||i.dataset.cat===b.dataset.filter?'block':'none')});
const zoomable=document.querySelectorAll('.zoomable');if(zoomable.length){const box=document.createElement('div');box.className='lightbox';box.innerHTML='<button class="lightbox-close" aria-label="Close image">×</button><img alt="Expanded project photograph">';document.body.appendChild(box);const image=box.querySelector('img');zoomable.forEach(img=>img.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();image.src=img.currentSrc||img.src;image.alt=img.alt||'Expanded project photograph';box.classList.add('open');document.body.style.overflow='hidden'}));const close=()=>{box.classList.remove('open');document.body.style.overflow=''};box.addEventListener('click',event=>{if(event.target===box||event.target.classList.contains('lightbox-close'))close()});document.addEventListener('keydown',event=>{if(event.key==='Escape')close()})}

// Homepage hero rotating slideshow
(function(){
  const heroSection = document.getElementById('homeHero');
  const dotsWrap = document.getElementById('heroDots');
  if(!heroSection || !dotsWrap) return;
  const slides = heroSection.querySelectorAll('.hero-slide');
  if(!slides.length) return;
  let current = 0;
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    if(i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => showSlide(i));
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('span');
  function showSlide(i){
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = i;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }
  setInterval(() => showSlide((current + 1) % slides.length), 5000);
})();
