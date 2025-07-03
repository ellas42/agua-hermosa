

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


       function toggleMenu() {
    var navbar = document.getElementById('navbar');
    navbar.classList.toggle('show');
}

// Function to update the hamburger menu color based on the scroll position

function updateHamburgerColor() {
    const hamburger = document.querySelector('.hamburger');
    const destinations = document.querySelector('.destinations');
    if (!hamburger || !destinations) return;

    // Get the top position of the destinations section relative to the viewport
    const destTop = destinations.getBoundingClientRect().top;

    // If the top of destinations is at or above the top of the viewport, switch to black
    if (destTop <= 60) {
        hamburger.classList.add('black');
    } else {
        hamburger.classList.remove('black');
    }
}

window.addEventListener('scroll', updateHamburgerColor);
window.addEventListener('load', updateHamburgerColor);