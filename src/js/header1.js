 const header1 = document.getElementById('header1');
  window.addEventListener('scroll', () => {
    header1.classList.toggle('scrolled', window.scrollY > 10);
  });