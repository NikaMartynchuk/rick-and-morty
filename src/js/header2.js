
  const header2 = document.getElementById('header2');
  window.addEventListener('scroll', () => {
    header2.classList.toggle('scrolled', window.scrollY > 10);
  });
