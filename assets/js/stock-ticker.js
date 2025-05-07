// Optional: duplicate content for seamless loop (can skip if not needed)
document.addEventListener("DOMContentLoaded", () => {
    const ticker = document.querySelector('.ticker-track');
    const clone = ticker.cloneNode(true);
    ticker.parentElement.appendChild(clone);
  });