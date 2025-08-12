// ===== HAVEN NO. 8 - LUXURY YACHTING WEBSITE =====

// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');

if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
  });
}

// Intersection Observer for reveal animations
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
    }
  }
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Header background on scroll with refined transitions
window.addEventListener('scroll', () => {
  const header = document.querySelector('.site-header');
  if (header) {
    if (window.scrollY > 100) {
      header.style.background = 'rgba(10, 10, 10, 0.98)';
      header.style.borderBottom = '1px solid rgba(212, 175, 55, 0.2)';
    } else {
      header.style.background = 'rgba(10, 10, 10, 0.95)';
      header.style.borderBottom = '1px solid rgba(245, 243, 240, 0.1)';
    }
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

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 80;
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Sophisticated form handling
const reservationForm = document.querySelector('.form');
if (reservationForm) {
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());
    
    // Enhanced validation
    const requiredFields = ['name', 'email'];
    const missingFields = requiredFields.filter(field => !data[field]);
    
    if (missingFields.length > 0) {
      showNotification('Please complete all required fields.', 'error');
      return;
    }
    
    if (!isValidEmail(data.email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Simulate sophisticated form submission
    showNotification('Crafting your sanctuary experience...', 'info');
    
    // Simulate API call with refined timing
    setTimeout(() => {
      showNotification('Your request has been received. Our experience curators will contact you within 24 hours.', 'success');
      this.reset();
    }, 3000);
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Refined notification system
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
  
  // Enhanced styling with brand colors
  const colors = {
    success: { bg: '#4a7c59', border: '#3d6b4a' }, // Jade 8
    error: '#d32f2f',
    info: '#1976d2'
  };
  
  const color = colors[type] || colors.info;
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${typeof color === 'object' ? color.bg : color};
    color: white;
    padding: 1.5rem 2rem;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    max-width: 450px;
    border-left: 4px solid ${typeof color === 'object' ? color.border : color};
    font-family: 'Inter', sans-serif;
    font-weight: 300;
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

// Refined parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.2; // More subtle movement
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Sophisticated loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Enhanced loading state with brand messaging
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
    content: 'HAVEN No. 8';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #d4af37;
    font-size: 2rem;
    font-weight: 300;
    font-family: 'Playfair Display', serif;
    letter-spacing: 0.2em;
    z-index: 10000;
  }
  
  /* Infinity loading animation */
  body:not(.loaded)::before {
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 40px;
    border: 2px solid rgba(212, 175, 55, 0.3);
    border-top: 2px solid #d4af37;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    z-index: 10001;
  }
  
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;
document.head.appendChild(loadingStyles);

// Refined card hover effects
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-4px) scale(1.01)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Reservation: prefill yacht from query parameters
const params = new URLSearchParams(location.search);
const yacht = params.get('yacht');
if (yacht && document.getElementById('yachtField')) {
  document.getElementById('yachtField').value = yacht;
}

// Sophisticated form handler for forms without action
document.addEventListener('submit', (e) => {
  const form = e.target.closest('form[action="#"]');
  if (!form) return;
  
  // Don't prevent default if it's a reservation form (handled above)
  if (form.classList.contains('form')) return;
  
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  showNotification('Demo mode. Form data: ' + JSON.stringify(data, null, 2), 'info');
});

// Enhanced counter animation for statistics
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
      if (statNumber) {
        const target = parseInt(statNumber.textContent);
        animateCounter(statNumber, target);
        statsObserver.unobserve(entry.target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
  statsObserver.observe(stat);
});

// Enhanced pricing calculation with brand sophistication
function calculateEstimatedPrice(guests, duration, destination) {
  const basePrice = 8000; // Elevated base price for luxury positioning
  const guestMultiplier = Math.max(1, guests / 8); // Price increases with more guests
  const durationDiscount = duration > 7 ? 0.9 : 1; // 10% discount for 7+ days
  const destinationMultiplier = {
    'mediterranean': 1.3,
    'caribbean': 1.2,
    'french-riviera': 1.4,
    'dubai': 1.5
  }[destination] || 1;
  
  return Math.round(basePrice * guestMultiplier * duration * durationDiscount * destinationMultiplier);
}

// Add price estimation to reservation forms
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
      showNotification(`Estimated investment: $${estimatedPrice.toLocaleString()} USD`, 'info');
    }
  }
}

if (guestsInput && durationInput && destinationSelect) {
  guestsInput.addEventListener('change', updatePriceEstimate);
  durationInput.addEventListener('change', updatePriceEstimate);
  destinationSelect.addEventListener('change', updatePriceEstimate);
}

// Enhanced date picker for reservation forms
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

// Sophisticated FAQ accordion functionality
document.querySelectorAll('.faq').forEach(faq => {
  const summary = faq.querySelector('summary');
  if (summary) {
    summary.addEventListener('click', (e) => {
      e.preventDefault();
      faq.toggleAttribute('open');
    });
  }
});

// Enhanced reveal animations for sections
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

// Refined reveal animation CSS
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

// Infinity divider animation
document.querySelectorAll('.infinity-divider').forEach(divider => {
  const line = divider.querySelector('::before');
  if (line) {
    divider.addEventListener('mouseenter', () => {
      divider.style.transform = 'scaleX(1.1)';
    });
    
    divider.addEventListener('mouseleave', () => {
      divider.style.transform = 'scaleX(1)';
    });
  }
});

// Sophisticated console log
console.log('Haven No. 8 - A private world, impeccably arranged 🛥️✨');
