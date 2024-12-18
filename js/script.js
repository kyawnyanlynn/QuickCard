let currentSlideIndex = 0;
window.addEventListener('load', function() {
    // Select the preloader element (only the one with the "preloader-text" class)
    const preloader = document.querySelector('.preloader');
    const preloaderText = document.querySelector('.preloader-text');

    // Fade out the preloader after the page loads
    preloaderText.style.animation = 'fadeOut 1s forwards';

    // Wait until the fade-out animation completes, then remove preloader
    preloader.addEventListener('animationend', function() {
        preloader.style.display = 'none'; // Hide preloader after animation
    });
});

document.addEventListener('scroll', function () {
    const images = document.querySelectorAll('.popup-func1__img-boxshadow, .popup-func__img-boxshadow-whitediv, .popup-icons-boxshadow, .popup-icons-boxshadow-whitediv');
    const windowHeight = window.innerHeight;

    images.forEach(image => {
        const imageTop = image.getBoundingClientRect().top;
        if (imageTop < windowHeight) {
            image.classList.add('visible');
        }
    });
});
document.querySelector('.header__nav').addEventListener('click', function(event) {
    // Check if the clicked element is an <a> tag and has a `data-target` attribute
    if (event.target.tagName === 'A' && event.target.dataset.target) {
        event.preventDefault(); // Prevent default anchor behavior
        
        // Get the target element using the `data-target` value
        const targetElement = document.querySelector(`.${event.target.dataset.target}`);
        
        if (targetElement) {
            // Scroll to the target element
            targetElement.scrollIntoView({
                behavior: 'smooth', // Smooth scrolling effect
                block: 'start'      // Align to the top of the viewport
            });
        }
    }
});
function showSlide(index) {
    const buttons = document.querySelectorAll('.mainFeatures__buttons-container__buttons');
    const slides = document.querySelectorAll('.mainFeatures-container__slides-container__slide');
    const buttonsContainer = document.querySelector('.mainFeatures-container__buttons-container');

    if (buttons.length === 0 || slides.length === 0) {
        console.error('Buttons or slides are missing.');
        return;
    }

    const currentButtonText = buttons[index].textContent;

    slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === index) {
            slide.classList.add('active');
        }
    });

    // Update button selection
    buttons.forEach((button, idx) => {
        button.classList.remove('selected-button');
        if (idx === index) {
            button.classList.add('selected-button');
        }
    });


    const h3 = document.createElement('h3');
    h3.textContent = currentButtonText;

    h3.className = 'mainFeatures__current-slide-heading';

    if (window.innerWidth <= 480) {
        const existingH3 = document.querySelector('.mainFeatures__current-slide-heading');
        if (existingH3) {
            existingH3.remove();
        }

        buttonsContainer.parentElement.insertBefore(h3, buttonsContainer);

        buttonsContainer.style.display = 'none';
    } else {
        buttonsContainer.style.display = 'flex';
        const existingH3 = document.querySelector('.mainFeatures__current-slide-heading');
        if (existingH3) {
            existingH3.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentSlideIndex);
});
window.addEventListener('resize', () => {
    showSlide(currentSlideIndex);
});

//自動で移動
setInterval(() => {
    const slidesLength = document.querySelectorAll('.mainFeatures-container__slides-container__slide').length;
    const buttonsLength = document.querySelectorAll('.mainFeatures__buttons-container__buttons').length;

    currentSlideIndex = (currentSlideIndex + 1) % Math.min(slidesLength, buttonsLength);

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
    const allImages = document.querySelectorAll('img[data-mobile-src]'); // Select all images with data-mobile-src
    const worriesImages = document.querySelector('.worries-container')?.querySelectorAll('img[data-mobile-src]'); // Images within worries-container

    //max-width: 480px (affect all images)
    if (window.matchMedia('(max-width: 480px)').matches) {
        allImages.forEach(img => {
            img.src = img.getAttribute('data-mobile-src'); // Switch to mobile src
        });
    }
    //max-width: 1024px (affect only worries-container images)
    else if (window.matchMedia('(max-width: 1024px)').matches) {
        if (worriesImages) {
            worriesImages.forEach(img => {
                img.src = img.getAttribute('data-mobile-src'); // Switch to mobile src for worries-container images
            });
        }
        // Revert other images to their default source
        allImages.forEach(img => {
            if (!img.closest('.worries-container')) { // Exclude worries-container images
                img.src = img.getAttribute('data-default-src');
            }
        });
    }
    else {
        allImages.forEach(img => {
            img.src = img.getAttribute('data-default-src');
        });
    }
}

window.addEventListener('load', updateImageSources);
window.addEventListener('resize', updateImageSources);
const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
});
// Close the menu and navigate when a link is clicked
offScreenMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A" && event.target.dataset.target) {
        event.preventDefault(); // Prevent default anchor behavior

        // Scroll to the target section
        const targetElement = document.querySelector(`.${event.target.dataset.target}`);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: "smooth", // Smooth scrolling
                block: "start", // Align to the top of the viewport
            });
        }

        // Close the hamburger menu
        hamMenu.classList.remove("active");
        offScreenMenu.classList.remove("active");
    }
});
//よくある質問
const faqs = document.querySelectorAll('.faq-container__question');

faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        faq.classList.toggle('active');
    })
})