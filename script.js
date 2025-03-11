// DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const themeToggle = document.getElementById('theme-toggle');
const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
const mobileNavLinks = document.querySelectorAll('#mobile-nav a');
const contactForm = document.getElementById('contactForm');
const currentYearSpan = document.getElementById('current-year');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Check for saved theme preference or use system preference
function getThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Apply theme
function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.classList.add('dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        document.documentElement.classList.remove('dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme
applyTheme(getThemePreference());

// Toggle theme
function toggleTheme() {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
}

// Event Listeners
themeToggle.addEventListener('click', toggleTheme);
mobileThemeToggle.addEventListener('click', toggleTheme);

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const isOpen = mobileNav.classList.contains('active');
    mobileMenuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    mobileMenuBtn.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when a link is clicked
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form submission (for demonstration - would need backend integration)
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formValues = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Form submitted with values:', formValues);
        
        // Show success message (for demo purposes)
        alert('Thanks for your message! This is a demo form - in a real implementation, your message would be sent to the server.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('section:not(#hero)').forEach(section => {
    section.classList.add('observe-me');
    observer.observe(section);
});

// Add animation class for observed elements
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .observe-me {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
`);