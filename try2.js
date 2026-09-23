async function processItem(url) {
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

async function processBatch(items, batchSize, processFn) {
    const results = [];

    for (let i = 0; i < items.length; i += batchSize) {
        const batch = items.slice(i, i + batchSize);

        console.log("Starting batch:", batch);

        const batchResults = await Promise.all(
            batch.map(item => processFn(item))
        );

        results.push(...batchResults);

        console.log("Finished batch");
    }

    return results;
}

async function main() {
    const items = [
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/posts/2",
        "https://jsonplaceholder.typicode.com/posts/3",
        "https://jsonplaceholder.typicode.com/posts/4",
        "https://jsonplaceholder.typicode.com/posts/5",
        "https://jsonplaceholder.typicode.com/posts/6"
    ];

    const results = await processBatch(items, 2, processItem);

    console.log(results);
}

main();
