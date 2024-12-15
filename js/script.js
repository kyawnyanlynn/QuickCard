let currentSlideIndex = 0; // Initialize the current slide index

function showSlide(index) {
    const buttons = document.querySelectorAll('.mainFeatures__buttons-container__buttons');
    const slides = document.querySelectorAll('.mainFeatures-container__slides-container__slide');
    slides.forEach((slide, idx) => {
        slide.classList.remove('active'); // Remove active class from all slides
        if (idx === index) {
            slide.classList.add('active');
        }
    });
    buttons.forEach((button, idx) => {
        button.classList.remove('selected-button');
        if (idx === index) {
            button.classList.add('selected-button');
        }
    });
}

showSlide(currentSlideIndex);
setInterval(() => {
    currentSlideIndex = (currentSlideIndex + 1) % document.querySelectorAll('.mainFeatures-container__slides-container__slide').length;
    showSlide(currentSlideIndex);
}, 5000);

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