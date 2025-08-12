// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.98)';
        header.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Reservation form handling
const reservationForm = document.querySelector('.reservation-form');
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const destination = formData.get('destination');
        const guests = formData.get('guests');
        const startDate = formData.get('start-date');
        const duration = formData.get('duration');
        const message = formData.get('message');
        
        // Basic validation
        if (!name || !email || !destination || !guests || !startDate || !duration) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        if (guests < 1 || guests > 20) {
            showNotification('Number of guests must be between 1 and 20.', 'error');
            return;
        }
        
        if (duration < 1 || duration > 30) {
            showNotification('Duration must be between 1 and 30 days.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Processing your luxury yacht request...', 'info');
        
        // Simulate API call
        setTimeout(() => {
            showNotification('Request submitted successfully! Our luxury yacht specialists will contact you within 24 hours.', 'success');
            this.reset();
        }, 3000);
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 1.5rem 2rem;
        border-radius: 8px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 450px;
        border-left: 4px solid ${type === 'success' ? '#45a049' : type === 'error' ? '#da190b' : '#1976d2'};
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 400);
    });
    
    // Auto remove after 6 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 400);
        }
    }, 6000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.destination-card, .experience-card, .yacht-card, .about-text, .contact-info, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2500) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h4');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.3;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: 'LUXURY YACHTING';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #d4af37;
        font-size: 2rem;
        font-weight: 700;
        font-family: 'Playfair Display', serif;
        letter-spacing: 4px;
        z-index: 10000;
    }
`;
document.head.appendChild(loadingStyles);

// Destination card hover effects
document.querySelectorAll('.destination-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Experience card hover effects
document.querySelectorAll('.experience-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.03)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Yacht card hover effects
document.querySelectorAll('.yacht-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth reveal animations for sections
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    revealObserver.observe(section);
});

// Add reveal animation CSS
const revealStyles = document.createElement('style');
revealStyles.textContent = `
    section {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 1s ease, transform 1s ease;
    }
    
    section.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero {
        opacity: 1;
        transform: none;
    }
`;
document.head.appendChild(revealStyles);

// Date picker enhancement for reservation form
const startDateInput = document.getElementById('start-date');
if (startDateInput) {
    const today = new Date();
    const minDate = new Date(today.getTime() + (30 * 24 * 60 * 60 * 1000)); // 30 days from now
    startDateInput.min = minDate.toISOString().split('T')[0];
    
    startDateInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        const maxDate = new Date(selectedDate.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year from selected date
        this.max = maxDate.toISOString().split('T')[0];
    });
}

// Dynamic pricing calculation (simplified)
function calculateEstimatedPrice(guests, duration, destination) {
    const basePrice = 5000; // Base price per day
    const guestMultiplier = Math.max(1, guests / 8); // Price increases with more guests
    const durationDiscount = duration > 7 ? 0.9 : 1; // 10% discount for 7+ days
    const destinationMultiplier = {
        'mediterranean': 1.2,
        'caribbean': 1.1,
        'french-riviera': 1.3
    }[destination] || 1;
    
    return Math.round(basePrice * guestMultiplier * duration * durationDiscount * destinationMultiplier);
}

// Add price estimation to reservation form
const guestsInput = document.getElementById('guests');
const durationInput = document.getElementById('duration');
const destinationSelect = document.getElementById('destination');

function updatePriceEstimate() {
    if (guestsInput && durationInput && destinationSelect) {
        const guests = parseInt(guestsInput.value) || 0;
        const duration = parseInt(durationInput.value) || 0;
        const destination = destinationSelect.value;
        
        if (guests > 0 && duration > 0 && destination) {
            const estimatedPrice = calculateEstimatedPrice(guests, duration, destination);
            showNotification(`Estimated price: $${estimatedPrice.toLocaleString()} USD`, 'info');
        }
    }
}

if (guestsInput && durationInput && destinationSelect) {
    guestsInput.addEventListener('change', updatePriceEstimate);
    durationInput.addEventListener('change', updatePriceEstimate);
    destinationSelect.addEventListener('change', updatePriceEstimate);
}

// Add some luxury touches
console.log('Luxury Yachting website loaded successfully! 🛥️✨');
