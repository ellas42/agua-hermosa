

        const navbar = document.querySelector('.navbar');
        const links = navbar.querySelectorAll('a');
      
        function updateNavbarColor() {
          const scrollThreshold = 200; // adjust to when you want the switch
      
          if (window.scrollY < scrollThreshold) {
            // On top of the image
            links.forEach(link => link.style.color = 'white');
          } else {
            // After scrolling past image
            links.forEach(link => link.style.color = 'black');
          }
        }
      
        window.addEventListener('scroll', updateNavbarColor);
        window.addEventListener('load', updateNavbarColor);

        const viewAllBtn = document.querySelector('.view-all-btn');
        const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    
        viewAllBtn.addEventListener('click', () => {
            hiddenItems.forEach(item => {
                item.classList.toggle('hidden'); // Toggle the 'hidden' class
            });
    
            // Change button text based on visibility
            if (viewAllBtn.textContent === 'View All Destinations') {
                viewAllBtn.textContent = 'Show Less';
            } else {
                viewAllBtn.textContent = 'View All Destinations';
            }
        });