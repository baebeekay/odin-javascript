 // --- DATA ---
 const slidesData = [
    { url: "https://placehold.co/900x400/1e40af/ffffff?text=Slide+1%3A+The+Start", alt: "Blue Sky" },
    { url: "https://placehold.co/900x400/059669/ffffff?text=Slide+2%3A+Green+Fields", alt: "Green Landscape" },
    { url: "https://placehold.co/900x400/9d174d/ffffff?text=Slide+3%3A+Deep+Red", alt: "Dark Red Sunset" },
    { url: "https://placehold.co/900x400/f59e0b/ffffff?text=Slide+4%3A+Golden+Hour", alt: "Orange Peaks" },
    { url: "https://placehold.co/900x400/4f46e5/ffffff?text=Slide+5%3A+Indigo+Tone", alt: "Indigo Night" }
];

// --- DOM Elements ---
const slidesWrapper = document.getElementById('slidesWrapper');
const dotsContainer = document.getElementById('dotsContainer');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// --- State ---
let currentSlide = 0;
const totalSlides = slidesData.length;
let autoAdvanceInterval;
const intervalTime = 5000; // 5 seconds

// --- Functions ---

/**
 * Renders the initial slide content and sets up the wrapper width.
 */
function initializeSlides() {
    // Set the width of the wrapper to accommodate all slides horizontally
    slidesWrapper.style.width = `${totalSlides * 100}%`;
    
    slidesData.forEach((slide, index) => {
        // Create the individual slide element
        const slideEl = document.createElement('div');
        slideEl.classList.add('w-full', 'h-full', 'flex-shrink-0', 'flex', 'items-center', 'justify-center');
        slideEl.style.width = `${100 / totalSlides}%`; // Each slide takes up its percentage of the total wrapper width

        // Create the image element
        const imgEl = document.createElement('img');
        imgEl.src = slide.url;
        imgEl.alt = slide.alt;
        imgEl.classList.add('object-cover', 'w-full', 'h-full');
        imgEl.setAttribute('loading', 'lazy'); // Good practice for performance

        slideEl.appendChild(imgEl);
        slidesWrapper.appendChild(slideEl);
        
        // Create the navigation dot
        const dotEl = document.createElement('button');
        dotEl.classList.add('w-3', 'h-3', 'rounded-full', 'bg-gray-300', 'transition-colors', 'duration-300');
        dotEl.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dotEl.addEventListener('click', () => showSlide(index));
        dotsContainer.appendChild(dotEl);
    });
}

/**
 * Updates the slide view by applying a CSS transform to the wrapper.
 * @param {number} index - The index of the slide to show.
 */
function showSlide(index) {
    // Calculate the new slide index, ensuring it wraps around
    if (index >= totalSlides) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = totalSlides - 1;
    } else {
        currentSlide = index;
    }

    // Calculate the required horizontal translation percentage
    const offset = -currentSlide * (100 / totalSlides);
    
    // Apply the transform to the wrapper
    slidesWrapper.style.transform = `translateX(${offset}%)`;
    
    updateDots();
    resetAutoAdvance();
}

/**
 * Advances to the next slide.
 */
function nextSlide() {
    showSlide(currentSlide + 1);
}

/**
 * Advances to the previous slide.
 */
function prevSlide() {
    showSlide(currentSlide - 1);
}

/**
 * Updates the navigation dots to highlight the current slide.
 */
function updateDots() {
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            // Active dot style: dark blue background
            dot.classList.remove('bg-gray-300');
            dot.classList.add('bg-indigo-600');
        } else {
            // Inactive dot style: light gray background
            dot.classList.remove('bg-indigo-600');
            dot.classList.add('bg-gray-300');
        }
    });
}

/**
 * Stops and restarts the automatic slide advancement timer.
 */
function resetAutoAdvance() {
    clearInterval(autoAdvanceInterval);
    autoAdvanceInterval = setInterval(nextSlide, intervalTime);
}


window.onload = function() {
    initializeSlides();
    showSlide(0);       // Initialize to the first slide
    
    // Set up event listeners for the navigation buttons
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Start the automatic rotation
    resetAutoAdvance();

  
    const carouselContainer = document.getElementById('carouselContainer');
    carouselContainer.addEventListener('mouseenter', () => clearInterval(autoAdvanceInterval));
    carouselContainer.addEventListener('mouseleave', resetAutoAdvance);
};