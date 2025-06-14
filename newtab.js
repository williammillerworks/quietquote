const DEBUG = true;
let currentDateOffset = 0;
let currentLanguage = 'en';

async function loadQuotesDatabase() {
  try {
    const response = await fetch("public/quotes-database.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to load quotes database:", error);
    return [
      {
        id: 1,
        text: "Learn how to learn from those who disagree with you",
        source: "68 Bits of Unsolicited Advice",
        author: "Kevin Kelly",
        url: "https://www.youtube.com/watch?v=Zz70rcguxwk",
        authorUrl: "https://kk.org/",
        text_ko: "당신과 의견이 다른 사람에게서 배우는 법을 익히세요"
      }
    ];
  }
}

function getDateWithOffset(offset) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d;
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getQuoteIndex(dayOfYear, length) {
  return dayOfYear % length;
}

function getQuoteText(quote, language) {
  if (language === 'ko' && quote.text_ko) {
    return quote.text_ko;
  }
  return quote.text;
}

function renderQuote(quote, date, index, total) {
  const quoteElement = document.getElementById("quote");
  const sourceElement = document.getElementById("source");
  
  // Add transitioning class for smooth animation
  quoteElement.classList.add('transitioning');
  sourceElement.classList.add('transitioning');
  
  setTimeout(() => {
    const quoteText = getQuoteText(quote, currentLanguage);
    quoteElement.textContent = `"${quoteText}"`;
    sourceElement.innerHTML =
      `from <a href="${quote.url}" target="_blank" rel="noopener noreferrer">${quote.source}</a> by ` +
      `<a href="${quote.authorUrl}" target="_blank" rel="noopener noreferrer">${quote.author}</a>`;

    document.getElementById("date").textContent = date.toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric"
    });

    // Remove transitioning class
    quoteElement.classList.remove('transitioning');
    sourceElement.classList.remove('transitioning');
  }, 200);

  if (DEBUG) {
    const debugPanel = document.getElementById("debug-panel");
    if (debugPanel) {
      debugPanel.innerHTML = `
        <div style="margin-bottom: 0.5rem;">
          <button id="prev-date">←</button>
          <button id="next-date">→</button>
        </div>
        <div class="label">Language:</div>
        <div class="value">${currentLanguage}</div>
        <div class="label">Day of Year:</div>
        <div class="value">${getDayOfYear(date)}</div>
        <div class="label">Quote Index:</div>
        <div class="value">${index}</div>
        <div class="label">Quote:</div>
        <div class="value">${getQuoteText(quote, currentLanguage)}</div>
        <div class="label">Author:</div>
        <div class="value">${quote.author}</div>
        <div class="label">Source:</div>
        <div class="value">${quote.source}</div>
        <div class="label">Total Quotes:</div>
        <div class="value">${total}</div>
      `;

      document.getElementById("prev-date").addEventListener("click", () => updateOffset(-1));
      document.getElementById("next-date").addEventListener("click", () => updateOffset(1));
    }
  }
}

function initLanguageSelector() {
  const languageButton = document.getElementById('language-button');
  const languageDropdown = document.getElementById('language-dropdown');
  const languageOptions = document.querySelectorAll('.language-option');
  
  // Toggle dropdown
  languageButton.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = languageDropdown.classList.contains('show');
    
    if (isOpen) {
      closeLanguageDropdown();
    } else {
      openLanguageDropdown();
    }
  });
  
  // Handle language selection
  languageOptions.forEach(option => {
    option.addEventListener('click', (e) => {
      e.stopPropagation();
      const selectedLang = option.dataset.lang;
      const selectedText = option.textContent.trim();
      
      // Update current language
      currentLanguage = selectedLang;
      
      // Update button text
      languageButton.querySelector('.language-text').textContent = selectedText;
      
      // Update selected state
      languageOptions.forEach(opt => opt.classList.remove('selected'));
      option.classList.add('selected');
      
      // Close dropdown
      closeLanguageDropdown();
      
      // Re-render current quote with new language
      updateOffset(0);
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => {
    closeLanguageDropdown();
  });
  
  // Prevent dropdown from closing when clicking inside it
  languageDropdown.addEventListener('click', (e) => {
    e.stopPropagation();
  });
}

function openLanguageDropdown() {
  const languageButton = document.getElementById('language-button');
  const languageDropdown = document.getElementById('language-dropdown');
  
  languageButton.classList.add('active');
  languageDropdown.classList.add('show');
}

function closeLanguageDropdown() {
  const languageButton = document.getElementById('language-button');
  const languageDropdown = document.getElementById('language-dropdown');
  
  languageButton.classList.remove('active');
  languageDropdown.classList.remove('show');
}

let quotes = [];

async function initQuote() {
  quotes = await loadQuotesDatabase();
  console.log(`Loaded ${quotes.length} quotes`); // Debug log
  initLanguageSelector();
  updateOffset(0);
}

function updateOffset(offsetDelta) {
  currentDateOffset += offsetDelta;
  const date = getDateWithOffset(currentDateOffset);
  const dayOfYear = getDayOfYear(date);
  const index = getQuoteIndex(dayOfYear, quotes.length);
  const quote = quotes[index];
  renderQuote(quote, date, index, quotes.length);
}

window.addEventListener("DOMContentLoaded", initQuote);