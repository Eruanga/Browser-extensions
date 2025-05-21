let allExtensions = [];


fetch('data.json')
  .then(res => res.json())
  .then(data => {
    allExtensions = data;
    renderExtensions(allExtensions);
  });

function renderExtensions(extensions) {
  const container = document.getElementById('extensionContainer');
  container.innerHTML = ''; 

  extensions.forEach((ext, index) => {
    const row = document.createElement('div');
    row.className = 'list-row';

    row.innerHTML = `
      <div class="ext-img-and-details">
        <img src="${ext.logo}" alt="${ext.name} logo">
        <div class="headingandwriteup">
            <h3 class="headings">${ext.name}</h3>
            <p class="writeups">${ext.description}</p>
        </div>
      </div>
      <div class="toggle-div">
        <button><a href="../remove.html">Remove</a></button>
        <label class="switch">
          <input type="checkbox" class="toggle-switch" ${ext.isActive ? 'checked' : ''} data-index="${index}">
          <span class="slider round"></span>
        </label>
      </div>
    `;
    container.appendChild(row);
  });

  document.querySelectorAll('.toggle-switch').forEach(switchEl => {
    switchEl.addEventListener('change', function () {
      const index = this.dataset.index;
      allExtensions[index].isActive = this.checked;

      const activeBtn = document.querySelector('.ext-btn.active');
      if (activeBtn) {
        const filter = activeBtn.dataset.filter;
        applyFilter(filter);
      }
    });
  });
}

const filterButtons = document.querySelectorAll('.ext-btn');
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active')); 
    button.classList.add('active'); 
    const filter = button.dataset.filter;
    applyFilter(filter);
  });
});
const themeToggle = document.querySelector('.day-toggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');

  if (document.body.classList.contains('light-mode')) {
    themeToggle.src = './assets/images/icon-moon.svg'; 
    themeToggle.alt = 'toggle to light theme';
  } else {
    themeToggle.src = './assets/images/icon-sun.svg';
    themeToggle.alt = 'toggle to dark theme';
  }
});

function applyFilter(filter) {
  if (filter === 'active') {
    renderExtensions(allExtensions.filter(ext => ext.isActive));
  } else if (filter === 'inactive') {
    renderExtensions(allExtensions.filter(ext => !ext.isActive));
  } else {
    renderExtensions(allExtensions);
  }
}
