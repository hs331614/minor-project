document.addEventListener('DOMContentLoaded', function() {
  const dropdowns = document.querySelectorAll('.dropdown');

  dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const menu = dropdown.querySelector('.menu');

    // Event listener for opening/closing dropdown on click
    select.addEventListener('click', (event) => {
      event.stopPropagation();

      // Close all other dropdowns
      dropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          const otherMenu = otherDropdown.querySelector('.menu');
          otherMenu.classList.remove('menu-open');
        }
      });

      // Toggle the clicked dropdown
      menu.classList.toggle('menu-open');
    });
  });

  // Event listener for closing dropdown when clicking outside
  document.addEventListener('click', () => {
    dropdowns.forEach(dropdown => {
      const menu = dropdown.querySelector('.menu');
      menu.classList.remove('menu-open');
    });
  });
});
