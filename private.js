// Select the header element
const header = document.querySelector('.header');

// Add a scroll event listener
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        // Add the "scrolled" class when the user scrolls down
        header.classList.add('scrolled');
    } else {
        // Remove the "scrolled" class when the user scrolls back to the top
        header.classList.remove('scrolled');
    }
});


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

// Select elements
const radioYes = document.querySelector('input[name="change-destinations"][value="yes"]');
const radioNo = document.querySelector('input[name="change-destinations"][value="no"]');
const destinationOptions = document.querySelector('.destination-options');

// Function to toggle visibility of the destination options
function toggleDestinationOptions() {
    if (radioYes.checked) {
        destinationOptions.classList.remove('hidden'); // Show the container
    } else {
        destinationOptions.classList.add('hidden'); // Hide the container
    }
}

// Select the max-destinations element
const maxDestinations = document.querySelector('.max-destinations');

// Function to toggle visibility of the destination options and max-destinations
function toggleDestinationOptions() {
    if (radioYes.checked) {
        destinationOptions.classList.remove('hidden'); // Show the destination options
        maxDestinations.classList.remove('hidden'); // Show the max-destinations heading
    } else {
        destinationOptions.classList.add('hidden'); // Hide the destination options
        maxDestinations.classList.add('hidden'); // Hide the max-destinations heading
    }
}

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

// Add event listeners to the radio buttons
radioYes.addEventListener('change', toggleDestinationOptions);
radioNo.addEventListener('change', toggleDestinationOptions);

// Initialize visibility on page load
toggleDestinationOptions();

const checkboxes = document.querySelectorAll('.destination-options input[type="checkbox"]');

function enforceMaxSelection() {
    const checkedCheckboxes = document.querySelectorAll('.destination-options input[type="checkbox"]:checked');
    if (checkedCheckboxes.length > 3) {
        event.preventDefault();
        alert('You can only select up to 3 destinations.');
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', enforceMaxSelection);
});

///////

// Select the buttons and hidden gallery items
const viewAllBtn = document.querySelector('.view-all-btn');
const viewLessBtn = document.querySelector('.view-less-btn');
const hiddenGalleryItems = document.querySelectorAll('.gallery-item.hidden');

// Function to show all hidden gallery items
viewAllBtn.addEventListener('click', () => {
    hiddenGalleryItems.forEach(item => {
        item.classList.remove('hidden'); // Remove the 'hidden' class to show items
    });
    viewAllBtn.classList.add('hidden'); // Hide the "View All" button
    viewLessBtn.classList.remove('hidden'); // Show the "View Less" button
});

// Function to hide all gallery items again
viewLessBtn.addEventListener('click', () => {
    hiddenGalleryItems.forEach(item => {
        item.classList.add('hidden'); // Add the 'hidden' class to hide items
    });
    viewLessBtn.classList.add('hidden'); // Hide the "View Less" button
    viewAllBtn.classList.remove('hidden'); // Show the "View All" button
});


//////


// Update navbar color based on background
function getComputedBgColor(element) {
    return window.getComputedStyle(element).backgroundColor;
}

function isLightColor(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match) return false;

    const [r, g, b] = match.map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128;
}

function updateNavbarColor() {
    const navbar = document.getElementById("navbar");
    const bgColor = getComputedBgColor(navbar.parentElement);

    if (isLightColor(bgColor)) {
        navbar.style.color = "#000";
    } else {
        navbar.style.color = "#fff";
    }
}

window.addEventListener("load", updateNavbarColor);
window.addEventListener("resize", updateNavbarColor);
window.addEventListener("scroll", updateNavbarColor);

// Show all hidden gallery items and hide the button
document.querySelector('.view-all-btn').addEventListener('click', function () {
    document.querySelectorAll('.gallery-item.hidden').forEach(item => {
        item.classList.remove('hidden');
    });
    this.style.display = 'none';
});


////
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


