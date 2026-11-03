// The invitation date is interpreted in the visitor's local time.
const weddingDate = new Date(2026, 11, 13, 11, 45, 0);

const countdownFields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};

function updateCountdown() {
  const remaining = weddingDate.getTime() - Date.now();

  if (remaining <= 0) {
    Object.values(countdownFields).forEach((field) => {
      if (field) field.textContent = "0";
    });
    const heading = document.querySelector(".countdown h2");
    if (heading) heading.textContent = "The celebration is here!";
    return;
  }

  const seconds = Math.floor(remaining / 1000);
  const values = {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60
  };

  Object.entries(values).forEach(([unit, value]) => {
    if (countdownFields[unit]) countdownFields[unit].textContent = String(value).padStart(2, "0");
  });
}

updateCountdown();
const countdownInterval = window.setInterval(() => {
  updateCountdown();
  if (Date.now() >= weddingDate.getTime()) window.clearInterval(countdownInterval);
}, 1000);

// Reveal sections as they enter the viewport, with a graceful fallback.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

// Open the envelope by click, Enter, or Space.
const envelope = document.getElementById("envelope");
let invitationOpened = false;

function openInvitation() {
  if (invitationOpened || !envelope) return;
  invitationOpened = true;
  envelope.classList.add("open");
  envelope.setAttribute("aria-label", "Wedding invitation opened");

  window.setTimeout(() => {
    envelope.classList.add("done");
    document.body.classList.remove("lock");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 1900);

  window.setTimeout(() => envelope.remove(), 3000);
}

if (envelope) {
  envelope.addEventListener("click", openInvitation);
  envelope.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openInvitation();
    }
  });
}






