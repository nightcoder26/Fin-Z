document.addEventListener("DOMContentLoaded", function() {
  const sidebarLinks = document.querySelectorAll('.sidebar-link');
  const dots = document.querySelectorAll('.dot');
  const mainContent = document.getElementById('main-content');

  sidebarLinks.forEach(function(link, index) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const target = this.getAttribute('data-target');
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');

  
      sidebarLinks.forEach(link => link.classList.remove('active'));

      this.classList.add('active');

      switch(target) {
        case 'overview':
          mainContent.innerHTML = '<h2>Overview Content</h2><p>Content for Overview</p>';
          break;
        case 'new-entry':
          mainContent.innerHTML = '<h2>New Entry Content</h2><p>Content for New Entry</p>';
          break;
        case 'today':
          mainContent.innerHTML = '<h2>Today</h2><p>Content for Today</p>';
          break;
        case 'week':
          mainContent.innerHTML = '<h2>Week</h2><p>Content for Week</p>';
          break;
        case 'month':
          mainContent.innerHTML = '<h2>Month</h2><p>Content for Month</p>';
          break;
        case 'year':
          mainContent.innerHTML = '<h2>Year</h2><p>Content for Year</p>';
          break;
        default:
          mainContent.innerHTML = '<h2>Default Content</h2><p>No content available</p>';
          break;
      }
    });
  });
});
