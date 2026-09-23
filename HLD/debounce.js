function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  }
}

// Usage
const search = debounce((query) => {
  console.log("Searching:", query);
}, 300);

search("a");    // cancelled
search("ab");   // cancelled
search("abc");  // fires after 300ms ✅
