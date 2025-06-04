// Debounce utility to avoid running filter too frequently
function debounce(func, delay = 300) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

// Filter card elements based on search input
function filterCards() {
  const input = document.getElementById('searchInput');
  if (!input) return;

  const cards = document.querySelectorAll('.id-card, .card');
  const query = input.value.trim().toLowerCase();

  cards.forEach(card => {
    const text = card.textContent.trim().toLowerCase();
    card.style.display = text.includes(query) ? 'block' : 'none';
  });
}

// Trigger navigation to section page
function openPage(section) {
  if (!section || typeof section !== 'string') return;

  const targetPage = `${section}.html`;

  if (window.confirm(`Navigate to "${section}"?`)) {
    window.location.href = targetPage;
  }
}

// Speak function for JARVIS voice
function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  }
}

// DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(filterCards, 300));
  }

  // Speak greeting only once per browser tab session
  if (!sessionStorage.getItem('jarvisGreeted')) {
    speak("Hello Master. I am JARVIS, your voice assistant.");
    sessionStorage.setItem('jarvisGreeted', 'true');
  }

  // Theme switcher logic
  const switcher = document.getElementById('themeSwitcher');
  const link = document.getElementById('themeStylesheet');

  if (switcher && link) {
    const saved = localStorage.getItem('selectedTheme') || 'futuristic';

    // Apply saved theme
    link.href = saved === 'futuristic' ? 'style.css' : saved + '.css';
    switcher.value = saved;

    switcher.addEventListener('change', function () {
      const selected = this.value;
      link.href = selected === 'futuristic' ? 'style.css' : selected + '.css';
      localStorage.setItem('selectedTheme', selected);
    });
  }
});
