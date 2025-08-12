// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const mobileNav = document.getElementById('mobile-nav');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    mobileNav.hidden = expanded;
  });
}

// Intersection reveal
const io = new IntersectionObserver((entries)=>{
  for (const e of entries) if (e.isIntersecting) e.target.classList.add('is-visible');
},{threshold:0.2});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

// Reservation: prefill yacht from query
const params = new URLSearchParams(location.search);
const yacht = params.get('yacht');
if (yacht && document.getElementById('yachtField')) {
  document.getElementById('yachtField').value = yacht;
}

// Demo form handler
document.addEventListener('submit', (e)=>{
  const form = e.target.closest('form[action="#"]');
  if (!form) return;
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  alert('Demo only. Here is what would be sent:\n\n' + JSON.stringify(data, null, 2));
});
