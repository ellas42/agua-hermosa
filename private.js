document.addEventListener('DOMContentLoaded', function () {
    // Header scroll effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Slider
    const sliderTrack = document.querySelector('.slider-track');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateSliderPosition() {
        if (slides.length && sliderTrack) {
            const slideWidth = slides[0].offsetWidth + 20;
            sliderTrack.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        }
    }

    if (prevBtn && nextBtn && slides.length && sliderTrack) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSliderPosition();
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentIndex < slides.length - 1) {
                currentIndex++;
                updateSliderPosition();
            }
        });

        window.addEventListener('resize', updateSliderPosition);
    }

    // Hide the "Book Now" button when the booking form is in view
    const bookNowBtn = document.querySelector('.book-now-btn');
    const bookingForm = document.querySelector('.booking-form-container');
    if (bookNowBtn && bookingForm) {
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
    }

    // Destination options toggle
    const radioYes = document.querySelector('input[name="change-destinations"][value="yes"]');
    const radioNo = document.querySelector('input[name="change-destinations"][value="no"]');
    const destinationOptions = document.querySelector('.destination-options');
    const maxDestinations = document.querySelector('.max-destinations');

    function toggleDestinationOptions() {
        if (radioYes && radioYes.checked) {
            if (destinationOptions) destinationOptions.classList.remove('hidden');
            if (maxDestinations) maxDestinations.classList.remove('hidden');
        } else {
            if (destinationOptions) destinationOptions.classList.add('hidden');
            if (maxDestinations) maxDestinations.classList.add('hidden');
        }
    }

    if (radioYes && radioNo) {
        radioYes.addEventListener('change', toggleDestinationOptions);
        radioNo.addEventListener('change', toggleDestinationOptions);
        toggleDestinationOptions();
    }

    // Accommodation options toggle
    const accommodationYes = document.querySelector('input[name="add-accommodation"][value="yes"]');
    const accommodationNo = document.querySelector('input[name="add-accommodation"][value="no"]');
    const accommodationOptions = document.querySelector('.accommodation-options');

    function toggleAccommodationOptions() {
        if (accommodationYes && accommodationYes.checked) {
            if (accommodationOptions) accommodationOptions.classList.remove('hidden');
        } else {
            if (accommodationOptions) accommodationOptions.classList.add('hidden');
        }
    }

    if (accommodationYes && accommodationNo) {
        accommodationYes.addEventListener('change', toggleAccommodationOptions);
        accommodationNo.addEventListener('change', toggleAccommodationOptions);
        toggleAccommodationOptions();
    }

    // Enforce max 3 destination selection
    const checkboxes = document.querySelectorAll('.destination-options input[type="checkbox"]');
    function enforceMaxSelection(event) {
        const checkedCheckboxes = document.querySelectorAll('.destination-options input[type="checkbox"]:checked');
        if (checkedCheckboxes.length > 3) {
            event.preventDefault();
            alert('You can only select up to 3 destinations.');
            event.target.checked = false;
        }
    }
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', enforceMaxSelection);
    });

    // About buttons for hotel details
    const aboutBtnPrivate = document.getElementById('about-btn-private');
    const aboutBtnStandard = document.getElementById('about-btn-standard');
    const hotelDetailsPrivate = document.getElementById('hotel-details-private');
    const hotelDetailsStandard = document.getElementById('hotel-details-standard');

    if (aboutBtnPrivate && hotelDetailsPrivate) {
        aboutBtnPrivate.addEventListener('click', () => {
            hotelDetailsPrivate.classList.toggle('hidden');
            aboutBtnPrivate.textContent = hotelDetailsPrivate.classList.contains('hidden') ? 'About' : 'Hide Details';
        });
    }
    if (aboutBtnStandard && hotelDetailsStandard) {
        aboutBtnStandard.addEventListener('click', () => {
            hotelDetailsStandard.classList.toggle('hidden');
            aboutBtnStandard.textContent = hotelDetailsStandard.classList.contains('hidden') ? 'About' : 'Hide Details';
        });
    }

    // Navbar color update
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
        if (!navbar || !navbar.parentElement) return;
        const bgColor = getComputedBgColor(navbar.parentElement);
        navbar.style.color = isLightColor(bgColor) ? "#000" : "#fff";
    }
    window.addEventListener("load", updateNavbarColor);
    window.addEventListener("resize", updateNavbarColor);
    window.addEventListener("scroll", updateNavbarColor);

    // Show all hidden gallery items and hide the button
    const viewAllBtn = document.querySelector('.view-all-btn');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function () {
            document.querySelectorAll('.gallery-item.hidden').forEach(item => {
                item.classList.remove('hidden');
            });
            this.style.display = 'none';
        });
    }
});


//hamburger

function toggleMenu() {
  var navbar = document.querySelector('.navbar');
  navbar.classList.toggle('show');
}