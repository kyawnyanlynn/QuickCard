let currentSlideIndex = 0; // Initialize the current slide index

function showSlide(index) {
    const buttons = document.querySelectorAll('.mainFeatures__buttons-container__buttons');
    const slides = document.querySelectorAll('.mainFeatures-container__slides-container__slide');
    const buttonsContainer = document.querySelector('.mainFeatures-container__buttons-container');

    // Ensure the index is valid (within the range of buttons and slides)
    if (buttons.length === 0 || slides.length === 0) {
        console.error('Buttons or slides are missing.');
        return; // Exit if there are no buttons or slides
    }

    // Get the text of the current button (this corresponds to the current slide)
    const currentButtonText = buttons[index].textContent;

    // Log the current button text (for testing)
    console.log('Current Button Text:', currentButtonText);

    // Update the slides visibility
    slides.forEach((slide, idx) => {
        slide.classList.remove('active'); // Remove active class from all slides
        if (idx === index) {
            slide.classList.add('active'); // Add active class to the current slide
        }
    });

    // Update button selection
    buttons.forEach((button, idx) => {
        button.classList.remove('selected-button'); // Remove selection from all buttons
        if (idx === index) {
            button.classList.add('selected-button'); // Add selection to the current button
        }
    });

    // Create a new <h3> element and set its text content to the current button text
    const h3 = document.createElement('h3');
    h3.textContent = currentButtonText;

    // Optional: Add some styles or class to the <h3> element (for styling purposes)
    h3.className = 'mainFeatures__current-slide-heading';

    // Check for the media query (max-width: 480px) to replace buttons with h3
    if (window.innerWidth <= 480) {
        // First, remove the existing <h3> element if it exists
        const existingH3 = document.querySelector('.mainFeatures__current-slide-heading');
        if (existingH3) {
            existingH3.remove();
        }

        // Replace the buttons container with the <h3> element above the images
        buttonsContainer.parentElement.insertBefore(h3, buttonsContainer);

        // Optionally hide the buttons container
        buttonsContainer.style.display = 'none';
    } else {
        // If not in mobile view, make sure the buttons container is visible
        buttonsContainer.style.display = 'flex';

        // Remove the h3 element if it exists (for desktop view)
        const existingH3 = document.querySelector('.mainFeatures__current-slide-heading');
        if (existingH3) {
            existingH3.remove();
        }
    }
}

// Initialize the slider
showSlide(currentSlideIndex);

// Automatically change slides every 5 seconds
setInterval(() => {
    const slidesLength = document.querySelectorAll('.mainFeatures-container__slides-container__slide').length;
    const buttonsLength = document.querySelectorAll('.mainFeatures__buttons-container__buttons').length;

    // Ensure the index wraps within the valid range
    currentSlideIndex = (currentSlideIndex + 1) % Math.min(slidesLength, buttonsLength);

    // Show the new slide
    showSlide(currentSlideIndex);
}, 5000);

//function for slide buttons
function nextSlide() {
    currentSlideIndex = (currentSlideIndex + 1) % document.querySelectorAll('.mainFeatures-container__slides-container__slide').length;
    showSlide(currentSlideIndex);
}

// Function for navigating to the previous slide
function prevSlide() {
    currentSlideIndex = (currentSlideIndex - 1 + document.querySelectorAll('.mainFeatures-container__slides-container__slide').length) % document.querySelectorAll('.mainFeatures-container__slides-container__slide').length;
    showSlide(currentSlideIndex);
}
document.querySelector('.next-slide').addEventListener('click', nextSlide);
document.querySelector('.prev-slide').addEventListener('click', prevSlide);
//写真変更
function updateImageSources() {
    const images = document.querySelectorAll('img[data-mobile-src]');
    images.forEach(img => {
        if (window.matchMedia('(max-width: 480px)').matches) {
            // Use the mobile version
            img.src = img.getAttribute('data-mobile-src');
        } else {
            // Revert to the original version
            img.src = img.getAttribute('data-default-src');
        }
    });
}

// Call the function on page load
updateImageSources();

// Add event listener for screen resize
window.addEventListener('resize', updateImageSources);
const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

//よくある質問
const faqs = document.querySelectorAll('.faq-container__question');

faqs.forEach(faq =>{
    faq.addEventListener("click", ()=>{
        faq.classList.toggle('active');
    })
})