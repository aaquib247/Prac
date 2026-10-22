
const state = {
    columns: {
        todo: ['Task 1', 'Task 2', 'Task 3'],
        inProgress: ['Task 4'],
        done: []
    }
}

const boardEl = document.querySelector("#board");

function render() {
    for (let col in state.columns) {
        let cardList = document.querySelector(`[data-col="${col}"] .card-list`);
        cardList.innerHTML = "";

        for (let task of state.columns[col]) {
            const card = document.createElement("div");
            card.className = "card";
            card.textContent = task;
            card.dataset.col = col;
            card.dataset.task = task;
            card.draggable = true;
            cardList.append(card);
        }
    }
}

boardEl.addEventListener("dragstart", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;
    e.dataTransfer.setData("task", card.dataset.task);
    e.dataTransfer.setData("col", card.dataset.col);
});

document.querySelectorAll(".column").forEach(col => {
    col.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    col.addEventListener("drop", (e) => {
        const task = e.dataTransfer.getData("task");
        const fromCol = e.dataTransfer.getData("col");
        const toCol = col.dataset.col;

        if (fromCol === toCol) return;

        state.columns[fromCol] = state.columns[fromCol].filter(t => t !== task);
        state.columns[toCol].push(task);
        render();
    });
});

render();


//Above is Event Delegation and below is direct listner on each card.

// const state = {
//     columns: {
//         todo: ['Task 1', 'Task 2', 'Task 3'],
//         inProgress: ['Task 4'],
//         done: []
//     }
// }


// function render() {

//     for (let col in state.columns) {
//         let cardList = document.querySelector(`[data-col="${col}"] .card-list`);
//         cardList.innerHTML = "";

//         for (let task of state.columns[col]) {
//             const card = document.createElement("div");
//             card.className = "card";
//             card.textContent = task;
//             card.dataset.col = col;
//             card.dataset.task = task
//             card.draggable = "true"

//             card.addEventListener("dragstart", (e) => {
//                 e.dataTransfer.setData("task", card.dataset.task);
//                 e.dataTransfer.setData("col", card.dataset.col);
//             });

//             cardList.append(card)
//         }
//     }
// }

// document.querySelectorAll(".column").forEach(col => {
//     col.addEventListener("dragover", (e) => {
//         e.preventDefault();
//     });

//     col.addEventListener("drop", (e) => {
//         const task = e.dataTransfer.getData("task");
//         const fromCol = e.dataTransfer.getData("col");
//         const toCol = col.dataset.col;

//         if (fromCol === toCol) return;

//         state.columns[fromCol] = state.columns[fromCol].filter(t => t !== task);
//         state.columns[toCol].push(task);
//         render();
//     });
// });


// render()
