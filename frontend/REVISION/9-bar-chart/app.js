// ============================================================
// BAR / VELOCITY CHART — canonical version to memorize
// ============================================================
// Turn a data array into bars. The ONE idea: each bar's height
// is a PROPORTION of the tallest value.
//     height = (value / max) * chartHeight
// So the biggest value fills the chart, others scale relative to it.
// ============================================================

// data: label + value per bar
const data = [
    { label: "Sprint 1", value: 30 },
    { label: "Sprint 2", value: 45 },
    { label: "Sprint 3", value: 20 },
    { label: "Sprint 4", value: 50 },
    { label: "Sprint 5", value: 38 }
]

const chartEl = document.querySelector("#chart")
const CHART_HEIGHT = 300;   // px — must match the #chart height in CSS (minus padding)

function render() {
    chartEl.innerHTML = "";

    // guard: empty data → show a message, don't divide by zero
    if (data.length === 0) {
        chartEl.textContent = "No data";
        return;
    }

    // the tallest value — everything scales relative to this
    const max = Math.max(...data.map(d => d.value));

    for (let d of data) {
        // a wrapper so we can stack: value number, the bar, the label
        let wrap = document.createElement("div");
        wrap.className = "bar-wrap";

        let valueEl = document.createElement("div");
        valueEl.className = "bar-value";
        valueEl.textContent = d.value;

        let bar = document.createElement("div");
        bar.className = "bar";
        // THE KEY LINE: height as a proportion of the max
        let h = max === 0 ? 0 : (d.value / max) * CHART_HEIGHT;
        bar.style.height = h + "px";
        bar.title = `${d.label}: ${d.value}`;   // simple hover tooltip

        let labelEl = document.createElement("div");
        labelEl.className = "bar-label";
        labelEl.textContent = d.label;

        wrap.append(valueEl, bar, labelEl);
        chartEl.append(wrap);
    }
}

render()
