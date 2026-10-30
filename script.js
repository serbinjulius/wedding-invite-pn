const weddingDate = new Date("2026-11-10T17:00:00");

function updateCountdown() {
    const now  = new Date();
    const diff = weddingDate - now;

    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const seconds = Math.floor(diff / 1000) % 60;
    console.log(days, hours, minutes, seconds);
}

updateCountdown();
