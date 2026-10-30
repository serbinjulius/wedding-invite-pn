const weddingDate = new Date("2026-11-10T17:00:00");

function updateCountdown() {
    const now = new Date();
    const diff = weddingDate - now;
    console.log(diff);
}

updateCountdown();
