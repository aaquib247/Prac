// ============================================================
// COOKIE CONSENT BANNER — canonical version to memorize
// ============================================================
// Show a banner ONLY on the first visit. Once the user picks
// Accept or Reject, save the choice in localStorage and never
// show it again (until storage is cleared).
//
// KEY IDEA: localStorage persists across page reloads. On load,
// check if a choice already exists → if yes, stay hidden.
// ============================================================

const STORAGE_KEY = "cookieConsent";   // the localStorage key

const bannerEl = document.querySelector("#banner")
const acceptEl = document.querySelector("#accept")
const rejectEl = document.querySelector("#reject")
const resultEl = document.querySelector("#result")

// decide on page load whether to show the banner
function init() {
    const choice = localStorage.getItem(STORAGE_KEY);  // null if never chosen
    if (choice) {
        // already decided on a previous visit → keep banner hidden
        resultEl.textContent = `You previously chose: ${choice}`;
        bannerEl.classList.add("hidden");
    } else {
        // first visit → show the banner
        bannerEl.classList.remove("hidden");
    }
}

// save the choice and hide the banner
function choose(value) {
    localStorage.setItem(STORAGE_KEY, value);   // persist across reloads
    bannerEl.classList.add("hidden");
    resultEl.textContent = `You chose: ${value}`;
}

acceptEl.addEventListener("click", () => choose("accepted"))
rejectEl.addEventListener("click", () => choose("rejected"))

init()   // run the check on load
