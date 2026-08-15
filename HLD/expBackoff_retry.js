let count = 0;
function fn() {
  count++;
  console.log("Attempt:", count);
  if (count < 3) throw new Error("Failed!");
  return "Success!";
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function retry(fn, retries) {
  let attempt = 0;
  while (attempt <= retries) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === retries) throw error;
      const delay = Math.pow(2, attempt) * 1000;
      await wait(delay);
      attempt++;
    }
  }
}

async function main() {
  const result = await retry(fn, 3);
  console.log(result);  // "Success!"
}

main();
