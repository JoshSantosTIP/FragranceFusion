// Sticky Navbar on Scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Newsletter Subscription Form Validation
document.querySelector('.newsletter-button').addEventListener('click', (e) => {
  e.preventDefault();
  const emailInput = document.querySelector('.newsletter-input');
  const email = emailInput.value.trim();

  if (validateEmail(email)) {
    alert('Thank you for subscribing to our newsletter!');
    emailInput.value = ''; // Clear the input field
  } else {
    alert('Please enter a valid email address.');
  }
});

// Email Validation Function
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}