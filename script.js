// ==============================
// ELEMENTS
// ==============================
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popupOverlay = document.getElementById("popupOverlay");
const closePopup = document.getElementById("closePopup");
const buttonGroup = document.querySelector(".button-group");

// ==============================
// YES BUTTON -> SHOW POPUP
// ==============================
yesBtn.addEventListener("click", () => {
  popupOverlay.classList.add("active");
});

// Close popup button
closePopup.addEventListener("click", () => {
  popupOverlay.classList.remove("active");
});

// Close popup when clicking outside the popup box
popupOverlay.addEventListener("click", (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("active");
  }
});

// ==============================
// NO BUTTON -> RUN AWAY
// Funny interaction:
// When the mouse gets near the No button,
// move it to a random nearby position.
// ==============================
function moveNoButton() {
  // For mobile/touch devices, keep it usable and avoid annoying behavior
  if (window.innerWidth <= 768) return;

  const groupRect = buttonGroup.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = groupRect.width / 2;
  const maxY = 200;

  // Generate a random position within a reasonable range
  const randomX = (Math.random() - 0.5) * maxX * 1.5;
  const randomY = (Math.random() - 0.5) * maxY * 1.5;

  noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
}

// Move when mouse gets close
document.addEventListener("mousemove", (e) => {
  if (window.innerWidth <= 768) return;

  const rect = noBtn.getBoundingClientRect();
  const btnCenterX = rect.left + rect.width / 2;
  const btnCenterY = rect.top + rect.height / 2;

  const distanceX = e.clientX - btnCenterX;
  const distanceY = e.clientY - btnCenterY;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

  // Trigger movement when cursor is close
  if (distance < 110) {
    moveNoButton();
  }
});

// Extra hover protection
noBtn.addEventListener("mouseenter", moveNoButton);

// Reset button position on resize for better responsiveness
window.addEventListener("resize", () => {
  noBtn.style.transform = "translate(0, 0)";
});