const dropdown = document.getElementById('dropdown');
  const dropdownBtn = document.getElementById('dropdownBtn');
  const menu = document.getElementById('menu');
  const items = menu.querySelectorAll('li');

  const seriesBySeason = {
    1: 11,
    2: 10,
    3: 10,
    4: 10,
    5: 10,
    6: 10
  };

  dropdownBtn.addEventListener('click', () => {
    dropdown.classList.toggle('open');
  });

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const seasonNumber = item.getAttribute('data-season');

      if (!seasonNumber) {
        removeAllSubMenus();
        items.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        dropdownBtn.textContent = item.textContent;
        return;
      }

      const nextElement = item.nextElementSibling;
      if (nextElement && nextElement.classList.contains('sub-menu')) {
        nextElement.remove();
        item.classList.remove('active');
        return;
      }

      removeAllSubMenus();
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      dropdownBtn.textContent = item.textContent;

      const subMenu = document.createElement('ul');
      subMenu.classList.add('sub-menu');
      const episodeCount = seriesBySeason[seasonNumber] || 0;

      for (let i = 1; i <= episodeCount; i++) {
        const li = document.createElement('li');
        li.textContent = `${i} series`;
        li.addEventListener('click', (ev) => {
          ev.stopPropagation();
          dropdownBtn.textContent = `${seasonNumber} season / ${i} series`;
          dropdown.classList.remove('open');
          removeAllSubMenus();
          items.forEach(i => i.classList.remove('active'));
        });
        subMenu.appendChild(li);
      }

      item.insertAdjacentElement('afterend', subMenu);
      subMenu.style.display = 'block';
    });
  });

  function removeAllSubMenus() {
    const oldSubMenus = menu.querySelectorAll('.sub-menu');
    oldSubMenus.forEach(sm => sm.remove());
  }

  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove('open');
      removeAllSubMenus();
    }
  });








  