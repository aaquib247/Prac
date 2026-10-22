// GOAL: when the button is clicked, change its text to "Clicked!"
//
// Steps (you write the code):
//   1. Select the button (id is "my-btn") and store it in a const.
//   2. addEventListener for "click".
//   3. Inside the handler, change the button's textContent to "Clicked!".
//
// Write your code below this line, then open index.html and click.

const btn = document.querySelector("#my-btn");
btn.addEventListener("click",() => {
    btn.textContent = "Clicked!"
});
