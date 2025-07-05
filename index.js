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
    
    // Check if click is outside the menu and not on the hamburger
    if (!navbar.contains(event.target) && !hamburger.contains(event.target)) {
        navbar.classList.remove('show');
        hamburger.classList.remove('hidden');
        document.removeEventListener('click', closeMenuOnOverlayClick);
    }
}

// View all destinations functionality
document.addEventListener('DOMContentLoaded', function() {
    const viewAllBtn = document.querySelector('.view-all-btn');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden');
    let isExpanded = false;
    
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function() {
            if (!isExpanded) {
                // Show all hidden items
                hiddenItems.forEach(item => {
                    item.classList.remove('hidden');
                });
                viewAllBtn.textContent = 'Show Less';
                isExpanded = true;
            } else {
                // Hide the items again
                hiddenItems.forEach(item => {
                    item.classList.add('hidden');
                });
                viewAllBtn.textContent = 'View All Destinations';
                isExpanded = false;
            }
        });
    }
    
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

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