// ===== HAVEN NO. 8 - LUXURY CONCIERGE WEBSITE =====
// JavaScript with 8-Timing System and Sophisticated Interactions

class MonogramController {
  constructor() {
    this.brand = document.querySelector('.brand');
    this.monogram = this.brand?.querySelector('svg');
    this.init();
  }

  init() {
    if (!this.brand || !this.monogram) return;
    
    // Add sophisticated hover animations
    this.brand.addEventListener('mouseenter', () => this.animateMonogram('enter'));
    this.brand.addEventListener('mouseleave', () => this.animateMonogram('leave'));
    
    // Add subtle breathing animation on page load
    setTimeout(() => {
      this.animateMonogram('breathe');
    }, 1000);
    
    // Check for prosperity moment on load
    this.checkProsperityMoment();
  }

  checkProsperityMoment() {
    const now = new Date();
    const isProsperityMoment = now.getHours() === 8 && now.getMinutes() === 8;
    
    if (isProsperityMoment) {
      this.activateProsperityState();
    }
  }

  activateProsperityState() {
    this.brand.classList.add('prosperity');
    const prosperityState = this.monogram.querySelector('#prosperityState');
    if (prosperityState) {
      prosperityState.style.opacity = '1';
    }
    
    // Remove prosperity state after 8 seconds
    setTimeout(() => {
      this.brand.classList.remove('prosperity');
      if (prosperityState) {
        prosperityState.style.opacity = '0';
      }
    }, 8000);
  }

  animateMonogram(state) {
    const hoverState = this.monogram.querySelector('#hoverState');
    const mainMonogram = this.monogram.querySelector('#monogram');
    
    if (!hoverState || !mainMonogram) return;
    
    switch(state) {
      case 'enter':
        // Reveal infinity curves
        hoverState.style.opacity = '1';
        hoverState.style.transition = 'opacity 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        // Subtle scale and rotation
        mainMonogram.style.transform = 'scale(1.05) rotate(2deg)';
        mainMonogram.style.transition = 'transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        break;
        
      case 'leave':
        // Hide infinity curves
        hoverState.style.opacity = '0';
        hoverState.style.transition = 'opacity 0.24s ease-out';
        
        // Return to normal
        mainMonogram.style.transform = 'scale(1) rotate(0deg)';
        mainMonogram.style.transition = 'transform 0.24s ease-out';
        break;
        
      case 'breathe':
        // Subtle breathing animation
        mainMonogram.style.transform = 'scale(1.02)';
        mainMonogram.style.transition = 'transform 0.48s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        
        setTimeout(() => {
          mainMonogram.style.transform = 'scale(1)';
          mainMonogram.style.transition = 'transform 0.48s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }, 480);
        break;
    }
  }
}

class HeaderController {
  constructor() {
    this.header = document.querySelector('.site-header');
    this.navToggle = document.querySelector('.nav-toggle');
    this.mobileNav = document.querySelector('#mobile-nav');
    this.lastScrollY = 0;
    this.scrollTimeout = null;
    this.init();
  }

  init() {
    if (!this.header) return;
    
    this.handleScroll();
    this.handleMobileNav();
    window.addEventListener('scroll', throttle(() => this.handleScroll(), 16));
  }

  handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      this.header.classList.add('scrolled');
    } else {
      this.header.classList.remove('scrolled');
    }
    
    // Add subtle parallax effect to header with debouncing
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        this.header.style.transform = 'translateY(-100%)';
      } else {
        this.header.style.transform = 'translateY(0)';
      }
      this.lastScrollY = currentScrollY;
    }, 100);
  }

  handleMobileNav() {
    if (!this.navToggle || !this.mobileNav) return;

    this.navToggle.addEventListener('click', () => {
      const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
      this.navToggle.setAttribute('aria-expanded', !isExpanded);
      this.mobileNav.hidden = isExpanded;
      this.mobileNav.classList.toggle('active');
    });
  }
}

class SmoothScroller {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

class RevealAnimations {
  constructor() {
    this.revealElements = document.querySelectorAll('.reveal');
    this.init();
  }

  init() {
    if (this.revealElements.length === 0) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          // Add staggered delay for multiple elements
          const index = Array.from(this.revealElements).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.08}s`;
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.revealElements.forEach(el => observer.observe(el));
  }
}

class FormHandler {
  constructor() {
    this.forms = document.querySelectorAll('form');
    this.init();
  }

  init() {
    this.forms.forEach(form => this.setupForm(form));
  }

  setupForm(form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });

    // Add floating labels and real-time validation
    this.setupFloatingLabels(form);
    this.setupRealTimeValidation(form);
  }

  setupFloatingLabels(form) {
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
      const label = input.previousElementSibling;
      if (label && label.tagName === 'SPAN') {
        // Create floating label effect
        input.addEventListener('focus', () => {
          label.style.transform = 'translateY(-20px) scale(0.8)';
          label.style.color = 'var(--champagne)';
        });
        
        input.addEventListener('blur', () => {
          if (!input.value) {
            label.style.transform = 'translateY(0) scale(1)';
            label.style.color = 'var(--sand)';
          }
        });
      }
    });
  }

  setupRealTimeValidation(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.validateField(input);
      });
    });
  }

  validateField(field) {
    const isValid = field.checkValidity();
    field.style.borderColor = isValid ? 'var(--champagne)' : 'rgba(245, 243, 240, 0.2)';
    
    if (isValid) {
      field.style.transform = 'translateY(-1px)';
      field.style.transition = 'all 0.24s ease';
    } else {
      field.style.transform = 'translateY(0)';
    }
  }

  handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission with 8-timing
    setTimeout(() => {
      // Check for 08:08 prosperity moment
      const now = new Date();
      const isProsperityMoment = now.getHours() === 8 && now.getMinutes() === 8;
      
      if (isProsperityMoment) {
        this.showNotification('Confirmed at 08:08. Your request has been received with prosperity.', 'prosperity');
        // Activate prosperity state on monogram
        const brand = document.querySelector('.brand');
        if (brand) {
          brand.classList.add('prosperity');
          setTimeout(() => brand.classList.remove('prosperity'), 8000);
        }
      } else {
        this.showNotification('Message sent successfully', 'success');
      }
      
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      
      // Reset floating labels
      const inputs = form.querySelectorAll('input, textarea, select');
      inputs.forEach(input => {
        const label = input.previousElementSibling;
        if (label && label.tagName === 'SPAN') {
          label.style.transform = 'translateY(0) scale(1)';
          label.style.color = 'var(--sand)';
        }
      });
    }, 800); // 8-timing: 0.8s
  }

  showNotification(message, type) {
    if (window.notificationSystem) {
      window.notificationSystem.showNotification(message, type);
    }
  }
}

class NotificationSystem {
  constructor() {
    this.notifications = [];
    this.init();
    window.notificationSystem = this;
  }

  init() {
    // Create notification container
    this.container = document.createElement('div');
    this.container.className = 'notification-container';
    this.container.style.cssText = `
      position: fixed;
      top: 100px;
      right: 32px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
      gap: 16px;
    `;
    document.body.appendChild(this.container);
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    
    // Determine colors based on type
    let bgColor, textColor;
    switch(type) {
      case 'prosperity':
        bgColor = 'var(--jade-8)';
        textColor = 'var(--sand)';
        break;
      case 'success':
        bgColor = 'var(--jade-8)';
        textColor = 'var(--sand)';
        break;
      default:
        bgColor = 'var(--champagne)';
        textColor = 'var(--ink)';
    }
    
    notification.style.cssText = `
      background: ${bgColor};
      color: ${textColor};
      padding: 16px 24px;
      border-radius: var(--radius-haven);
      box-shadow: var(--shadow-medium);
      transform: translateX(100%);
      transition: transform 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      font-weight: 300;
      font-size: 14px;
      letter-spacing: 0.05em;
    `;
    notification.textContent = message;
    
    this.container.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 24); // 8-timing: 0.024s
    
    // Add prosperity pulse for prosperity type
    if (type === 'prosperity') {
      notification.classList.add('prosperity-success');
    }
    
    // Auto remove after 4.8s (8-timing)
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (this.container.contains(notification)) {
          this.container.removeChild(notification);
        }
      }, 320); // 8-timing: 0.32s
    }, 4800);
  }
}

class CardInteractions {
  constructor() {
    this.cards = document.querySelectorAll('.card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      this.setupCardHover(card);
      this.setupCardClick(card);
    });
  }

  setupCardHover(card) {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
      card.style.transition = 'all 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.transition = 'all 0.24s ease-out';
    });
  }

  setupCardClick(card) {
    card.addEventListener('click', (e) => {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(212, 175, 55, 0.3);
        transform: scale(0);
        animation: ripple 0.48s linear;
        pointer-events: none;
      `;
      
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      card.appendChild(ripple);
      
      setTimeout(() => {
        if (card.contains(ripple)) {
          card.removeChild(ripple);
        }
      }, 480); // 8-timing: 0.48s
    });
  }
}

class InfinityDivider {
  constructor() {
    this.dividers = document.querySelectorAll('.infinity-divider');
    this.init();
  }

  init() {
    this.dividers.forEach(divider => {
      // Add SVG infinity divider
      const svg = document.createElement('img');
      svg.src = '/assets/infinity-divider.svg';
      svg.alt = '';
      svg.style.cssText = `
        width: 120px;
        height: 2px;
        transition: width 0.32s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      `;
      
      // Add error handling for missing SVG
      svg.onerror = () => {
        // Fallback to CSS-based divider
        divider.innerHTML = '<div style="width: 120px; height: 2px; background: linear-gradient(90deg, transparent, var(--champagne), transparent); border-radius: 1px;"></div>';
      };
      
      divider.appendChild(svg);
      
      // Add hover animation
      divider.addEventListener('mouseenter', () => {
        const dividerElement = divider.querySelector('img') || divider.querySelector('div');
        if (dividerElement) {
          dividerElement.style.width = '180px';
        }
      });
      
      divider.addEventListener('mouseleave', () => {
        const dividerElement = divider.querySelector('img') || divider.querySelector('div');
        if (dividerElement) {
          dividerElement.style.width = '120px';
        }
      });
    });
  }
}

class HoverUnderlineSystem {
  constructor() {
    this.init();
  }

  init() {
    // Add hover underline to navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.classList.add('hover-underline');
    });

    // Add hover underline to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
      btn.classList.add('hover-underline');
    });

    // Add hover underline to footer links
    const footerLinks = document.querySelectorAll('.footer-inner a');
    footerLinks.forEach(link => {
      link.classList.add('hover-underline');
    });
  }
}

class LoadingAnimation {
  constructor() {
    this.loader = document.querySelector('.loading-screen');
    this.init();
  }

  init() {
    if (!this.loader) return;
    
    // Hide loader after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.hideLoader();
      }, 800); // 8-timing: 0.8s
    });
  }

  hideLoader() {
    this.loader.style.opacity = '0';
    this.loader.style.transition = 'opacity 0.48s ease-out';
    
    setTimeout(() => {
      this.loader.style.display = 'none';
    }, 480); // 8-timing: 0.48s
  }
}

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupLazyLoading();
    this.setupScrollOptimization();
    this.setupIntersectionObserver();
    this.setupImageOptimization();
  }

  setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    if (images.length === 0) return;
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  setupScrollOptimization() {
    let ticking = false;
    
    const updateOnScroll = () => {
      // Optimize scroll-based animations
      ticking = false;
    };
    
    const requestTick = () => {
      if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', requestTick, { passive: true });
  }

  setupIntersectionObserver() {
    // Optimize all intersection observers
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    // Create a shared observer for better performance
    const sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe elements that need intersection detection
    document.querySelectorAll('.card, .timeline-item').forEach(el => {
      sharedObserver.observe(el);
    });
  }

  setupImageOptimization() {
    // Add error handling for images
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', () => {
        // Add fallback styling for broken images
        img.style.background = 'rgba(245, 243, 240, 0.1)';
        img.style.border = '1px solid rgba(245, 243, 240, 0.2)';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.minHeight = '200px';
        img.style.color = 'var(--pearl)';
        img.style.fontSize = 'var(--text-sm)';
        img.alt = 'Image not available';
      });
    });
  }
}

// Enhanced utility functions with 8-timing
function debounce(func, wait = 320) { // 8-timing: 0.32s
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit = 240) { // 8-timing: 0.24s
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Initialize all controllers when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize controllers with 8-timing
  setTimeout(() => new MonogramController(), 24); // 0.024s
  setTimeout(() => new HeaderController(), 48); // 0.048s
  setTimeout(() => new SmoothScroller(), 72); // 0.072s
  setTimeout(() => new RevealAnimations(), 96); // 0.096s
  setTimeout(() => new FormHandler(), 120); // 0.12s
  setTimeout(() => new NotificationSystem(), 144); // 0.144s
  setTimeout(() => new CardInteractions(), 168); // 0.168s
  setTimeout(() => new InfinityDivider(), 192); // 0.192s
  setTimeout(() => new HoverUnderlineSystem(), 216); // 0.216s
  setTimeout(() => new LoadingAnimation(), 240); // 0.24s
  setTimeout(() => new PerformanceOptimizer(), 264); // 0.264s
});

// Global utility functions
window.HavenNo8 = {
  showNotification: (message, type) => {
    if (window.notificationSystem) {
      window.notificationSystem.showNotification(message, type);
    }
  },
  
  debounce,
  throttle,
  
  // 8-timing utility
  timing: {
    fast: 240,
    smooth: 320,
    slow: 480,
    luxury: 640
  }
};

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

document.head.appendChild(style);

// Console branding
console.log(`
%cHAVEN No. 8%c
%cLuxury Concierge Services%c
%cSeamless access to singular moments.%c

`, 
'color: #d4af37; font-size: 24px; font-weight: bold; font-family: serif;',
'color: #f5f3f0; font-size: 14px;',
'color: #4a7c59; font-size: 16px; font-weight: 300;',
'color: #f5f3f0; font-size: 14px;',
'color: #fafafa; font-size: 12px; font-style: italic;'
);
