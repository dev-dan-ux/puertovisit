// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Inquiry page only
const form = document.getElementById('inquiryForm');
if (form) {
  const status = document.getElementById('formStatus');

  // Pre-select the tour when coming from "Book this package" (inquiry.html?tour=Day+Escape)
  const tour = new URLSearchParams(location.search).get('tour');
  if (tour) document.getElementById('tour').value = tour;

  // Prevent past dates
  document.getElementById('date').min = new Date().toISOString().split('T')[0];

  // Validate, then open the visitor's email app with the details filled in
  form.addEventListener('submit', e => {
    e.preventDefault();
    let ok = true;
    ['name', 'email', 'tour', 'date', 'guests'].forEach(id => {
      const f = document.getElementById(id);
      const valid = f.checkValidity() && f.value.trim() !== '';
      f.classList.toggle('bad', !valid);
      if (!valid) ok = false;
    });
    if (!ok) {
      status.textContent = 'Please complete the highlighted fields.';
      return;
    }
    const d = Object.fromEntries(new FormData(form));
    const body = `Name: ${d.name}\nEmail: ${d.email}\nTour: ${d.tour}\nDate: ${d.date}\nGuests: ${d.guests}\n\n${d.message || ''}`;
    status.textContent = 'Thank you! Your email app will open so you can send the inquiry. We reply within 24 hours.';
    window.location.href = 'mailto:hello@galeraescapes.example?subject=' +
      encodeURIComponent('Inquiry: ' + d.tour) + '&body=' + encodeURIComponent(body);
    form.reset();
  });
}
