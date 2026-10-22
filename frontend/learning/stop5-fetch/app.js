// =============================================================
// STOP 5 — FETCH + ASYNC  (calling an API from the browser)
// =============================================================
// fetch() is the browser's built-in way to call an API.
// It returns a Promise — something that will resolve later.
// async/await makes Promises look like normal synchronous code.
//
// Pattern you'll use in EVERY problem that touches an API:
//
//   async function loadData() {
//     try {
//       const res  = await fetch("url");   // wait for response
//       const data = await res.json();     // wait for body parse
//       // now use data
//     } catch (err) {
//       // handle error (network down, API failed, etc.)
//     }
//   }
//
// We'll use this free public API for practice:
//   https://jsonplaceholder.typicode.com/users
//   Returns an array of 10 fake users.
// =============================================================

const loadBtn = document.querySelector("#load-btn");
const status  = document.querySelector("#status");
const list    = document.querySelector("#list");


async function loadUsers() {
  status.textContent = "Loading...";   // show loading state
  list.innerHTML = "";

  try {
    const res   = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos = await res.json();    // parse JSON body → JS array

    status.textContent = `Loaded ${todos.length} tasks`;
    let users = {};

    for (const todo of todos) {
      if(!users[todo.userId]){
        users[todo.userId] = [];
      }
      users[todo.userId].push(todo)
    }

    console.log('User ---- > ', users)

    for(let user in users){
      console.log(users[user])
      const li = document.createElement("li");
      li.textContent = `User ${user}: ${users[user].length} todos`;
      list.append(li);
    }

  } catch (err) {
    status.textContent = "Error loading users. Try again.";
    console.error(err);
  }
}


loadBtn.addEventListener("click", loadUsers);


// =============================================================
// YOUR TURN
// =============================================================
// The Atlassian problem uses this API:
//   https://jsonplaceholder.typicode.com/todos
//   Returns 200 todos. Each todo looks like:
//   { userId: 1, id: 1, title: "...", completed: true/false }
//
// TASK: When the button is clicked, fetch todos and show
//       how many todos each userId has. Like:
//
//   User 1: 20 todos
//   User 2: 20 todos
//   ...
//
// HINT: after fetching, you need to GROUP todos by userId.
//   Use an object as a map:  { 1: [...], 2: [...] }
//
//   const groups = {};
//   for (const todo of todos) {
//     if (!groups[todo.userId]) groups[todo.userId] = [];
//     groups[todo.userId].push(todo);
//   }
//
// Then loop Object.entries(groups) to render each group.
// Change the fetch URL to the todos endpoint.
// =============================================================
