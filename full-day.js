// Hide the "Book Now" button when the booking form is in view
const bookNowBtn = document.querySelector('.book-now-btn');
const bookingForm = document.querySelector('.booking-form-container');

window.addEventListener('scroll', () => {
    const bookingFormRect = bookingForm.getBoundingClientRect();
    if (bookingFormRect.top <= window.innerHeight && bookingFormRect.bottom >= 0) {
        bookNowBtn.style.opacity = '0';
        bookNowBtn.style.pointerEvents = 'none';
    } else {
        bookNowBtn.style.opacity = '0.8';
        bookNowBtn.style.pointerEvents = 'auto';
    }
});

// Select elements for accommodation options
const accommodationYes = document.querySelector('input[name="add-accommodation"][value="yes"]');
const accommodationNo = document.querySelector('input[name="add-accommodation"][value="no"]');
const accommodationOptions = document.querySelector('.accommodation-options');

// Function to toggle visibility of the accommodation options
function toggleAccommodationOptions() {
    if (accommodationYes.checked) {
        accommodationOptions.classList.remove('hidden'); // Show the container
    } else {
        accommodationOptions.classList.add('hidden'); // Hide the container
    }
}

// Add event listeners to the radio buttons
accommodationYes.addEventListener('change', toggleAccommodationOptions);
accommodationNo.addEventListener('change', toggleAccommodationOptions);

// Initialize visibility on page load
toggleAccommodationOptions();

// Select the "About" buttons and their respective hotel details sections
const aboutBtnPrivate = document.getElementById('about-btn-private');
const aboutBtnStandard = document.getElementById('about-btn-standard');
const hotelDetailsPrivate = document.getElementById('hotel-details-private'); // For private room
const hotelDetailsStandard = document.getElementById('hotel-details-standard'); // For standard room

// Add a click event listener to the "About" button for the private room
aboutBtnPrivate.addEventListener('click', () => {
    // Toggle the "hidden" class on the private room hotel details section
    hotelDetailsPrivate.classList.toggle('hidden');

    // Change the button text based on visibility
    if (hotelDetailsPrivate.classList.contains('hidden')) {
        aboutBtnPrivate.textContent = 'About'; // Reset to "About" when hidden
    } else {
        aboutBtnPrivate.textContent = 'Hide Details'; // Change to "Hide Details" when visible
    }
});

// Add a click event listener to the "About" button for the standard room
aboutBtnStandard.addEventListener('click', () => {
    // Toggle the "hidden" class on the standard room hotel details section
    hotelDetailsStandard.classList.toggle('hidden');

    // Change the button text based on visibility
    if (hotelDetailsStandard.classList.contains('hidden')) {
        aboutBtnStandard.textContent = 'About'; // Reset to "About" when hidden
    } else {
        aboutBtnStandard.textContent = 'Hide Details'; // Change to "Hide Details" when visible
    }
});





const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach((carousel) => {
    let isDown = false;
    let startX;
    let scrollLeft;

    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        carousel.classList.add('active');
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.classList.remove('active');
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Adjust scroll speed
        carousel.scrollLeft = scrollLeft - walk;
    });
});

//hamburger 
function toggleMenu() {
  var navbar = document.querySelector('.navbar');
  navbar.classList.toggle('show');
}