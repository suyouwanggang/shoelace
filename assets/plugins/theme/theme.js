(() => {
  if (!window.$docsify) {
    throw new Error('Docsify must be loaded before installing this plugin.');
  }

  window.$docsify.plugins.push((hook, vm) => {
    hook.mounted(function () {
      function getTheme() {
        return localStorage.getItem('theme') || 'auto';
      }

      function isDark() {
        if (theme === 'auto') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
          return theme === 'dark';
        }
      }

      function setTheme(newTheme) {
        const noTransitions = Object.assign(document.createElement('style'), {
          textContent: '* { transition: none !important; }'
        });

        theme = newTheme;
        localStorage.setItem('theme', theme);

        // Update the UI
        [...menu.querySelectorAll('sl-menu-item')].map(item => (item.checked = item.value === theme));
        menuIcon.name = isDark() ? 'moon' : 'sun';

        // Toggle the dark mode class without transitions
        document.body.appendChild(noTransitions);
        requestAnimationFrame(() => {
          document.documentElement.classList.toggle('sl-theme-dark', isDark());
          requestAnimationFrame(() => document.body.removeChild(noTransitions));
        });
      }

      let theme = getTheme();

      // Generate the theme picker dropdown
      const sidebarToggle = document.querySelector('.sidebar-toggle');
      const dropdown = document.createElement('sl-dropdown');
      dropdown.classList.add('theme-picker');
      dropdown.innerHTML = `
        <sl-button size="small" slot="trigger" caret>
          <sl-icon name="sun" label="Select Theme"></sl-icon>
        </sl-button>
        <sl-menu>
          <sl-menu-item value="light">Light</sl-menu-item>
          <sl-menu-item value="dark">Dark</sl-menu-item>
          <sl-menu-divider></sl-menu-divider>
          <sl-menu-item value="auto">Auto</sl-menu-item>
        </sl-menu>
      `;
      sidebarToggle.insertAdjacentElement('beforebegin', dropdown);

      // Listen for selections
      const menu = dropdown.querySelector('sl-menu');
      const menuIcon = dropdown.querySelector('sl-icon');
      menu.addEventListener('sl-select', event => setTheme(event.detail.item.value));

      // Set the intial theme and sync the UI
      setTheme(theme);
    });
  });
})();
