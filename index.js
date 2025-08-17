document.addEventListener('DOMContentLoaded', function() {
    // Toggle menu function
    function toggleMenu() {
        const navbar = document.getElementById('navbar');
        const hamburger = document.querySelector('.hamburger');
        
        navbar.classList.toggle('show');
        hamburger.classList.toggle('hidden');
        
        // Add click listener to close menu when clicking overlay
        if (navbar.classList.contains('show')) {
            document.addEventListener('click', closeMenuOnOverlayClick);
        } else {
            document.removeEventListener('click', closeMenuOnOverlayClick);
        }
    }

    // Close menu when clicking outside
    function closeMenuOnOverlayClick(event) {
        const navbar = document.getElementById('navbar');
        const hamburger = document.querySelector('.hamburger');
        if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
            navbar.classList.remove('show');
            hamburger.classList.remove('hidden');
            document.removeEventListener('click', closeMenuOnOverlayClick);
        }
    }

    // View all destinations functionality
    const viewAllBtn = document.querySelector('.view-all-btn');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    let isExpanded = false;
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            if (!isExpanded) {
                hiddenItems.forEach(item => item.classList.remove('hidden'));
                viewAllBtn.textContent = 'Show Less';
                isExpanded = true;
            } else {
                hiddenItems.forEach(item => item.classList.add('hidden'));
                viewAllBtn.textContent = 'View All Destinations';
                isExpanded = false;
            }
        });
    }

    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
        // Hide header at first
        header.classList.remove('visible');
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('visible');
            } else {
                header.classList.remove('visible');
            }
        });
    }

    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});