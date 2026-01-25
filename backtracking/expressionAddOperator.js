// ============================================
// 282. Expression Add Operators (LC 282) - HARD
// Pattern: Backtracking with Math Evaluation
// TC: O(4^n) because at each digit we have 4 choices (+, -, *, no split)
// SC: O(n) for recursion stack and path string
// ============================================

var addOperators = function (num, target) {
    const result = [];

    function backtrack(index, path, value, lastOperand) {
        // BASE CASE: Reached end of string
        if (index === num.length) {
            if (value === target) {
                result.push(path);
            }
            return;
        }

        // TRY ALL POSSIBLE NUMBER SPLITS
        for (let i = index; i < num.length; i++) {
            // Extract current number
            const currentStr = num.slice(index, i + 1);
            const currentNum = parseInt(currentStr);

            // SKIP LEADING ZEROS (except "0" itself)
            if (currentStr.length > 1 && currentStr[0] === '0') {
                break;  // No point continuing with this prefix
            }

            if (index === 0) {
                // FIRST NUMBER: No operator before it
                backtrack(
                    i + 1,
                    currentStr,
                    currentNum,
                    currentNum
                );
            } else {
                // TRY EACH OPERATOR: +, -, *

                // ADDITION: value + currentNum
                backtrack(
                    i + 1,
                    path + '+' + currentStr,
                    value + currentNum,
                    currentNum
                );

                // SUBTRACTION: value - currentNum
                backtrack(
                    i + 1,
                    path + '-' + currentStr,
                    value - currentNum,
                    -currentNum // why negative? because lastOperand should reflect the sign
                );

                // MULTIPLICATION: Tricky!
                // Need to "undo" the last operation and redo with multiplication
                // value - lastOperand + (lastOperand * currentNum)
                backtrack(
                    i + 1,
                    path + '*' + currentStr,
                    value - lastOperand + (lastOperand * currentNum), 
                    lastOperand * currentNum
                );
            }
        }
    }

    backtrack(0, '', 0, 0);
    return result;
};

// ============================================
// WHY MULTIPLICATION IS TRICKY
// ============================================

console.log("\n" + "=".repeat(70));
console.log("WHY MULTIPLICATION IS TRICKY");
console.log("=".repeat(70));

console.log(`
Example: "2+3*4" should equal 14, not 20

Wrong approach:
  2 + 3 = 5
  5 * 4 = 20  ❌ (treated as (2+3)*4)

Correct approach:
  value = 2 + 3 = 5
  lastOperand = 3
  
  When we see '*4':
    1. Undo the last addition: 5 - 3 = 2
    2. Redo with multiplication: 2 + (3 * 4) = 2 + 12 = 14 ✓

Formula: value - lastOperand + (lastOperand * currentNum)
`);

// ============================================
// DRY RUN: "123", target = 6
// ============================================

console.log("\n" + "=".repeat(70));
console.log("DRY RUN: num = '123', target = 6");
console.log("=".repeat(70));

let num = "123";
let target = 6;

console.log("\nRecursion Tree (simplified):\n");

/*
                        ""
                         |
        ┌────────────────┼────────────────┐
        1                12               123
        |                |                 |
    ┌───┼───┐        ┌───┼───┐        check=123≠6 ✗
    +   -   *        +   -   *
    |   |   |        |   |   |
   1+2 1-2 1*2      12+3 ...

Expanding 1+2:
  1+2+3 = 6 ✓
  1+2-3 = 0 ✗
  1+2*3 = 7 ✗

Expanding 1*2:
  1*2+3 = 5 ✗
  1*2-3 = -1 ✗
  1*2*3 = 6 ✓
*/

console.log(`
Call 1: backtrack(0, "", 0, 0)
  No operator, try first number
  Options: "1", "12", "123"
  
Call 2: backtrack(1, "1", 1, 1)
  From "1", try operators with next numbers
  Options: "1+2", "1-2", "1*2"
  
Call 3: backtrack(2, "1+2", 3, 2)
  From "1+2" (value=3), try operators with "3"
  
  Try "1+2+3":
    value = 3 + 3 = 6 ✓
    index = 3 (end of string)
    value === target → Add to result!
  
  Try "1+2-3":
    value = 3 - 3 = 0 ≠ 6 ✗
  
  Try "1+2*3":
    value = 3 - 2 + (2 * 3) = 1 + 6 = 7 ≠ 6 ✗

Call 4: backtrack(2, "1*2", 2, 2)
  From "1*2" (value=2), try operators with "3"
  
  Try "1*2*3":
    value = 2 - 2 + (2 * 3) = 0 + 6 = 6 ✓
    Add to result!

... more branches ...

Final result: ["1+2+3", "1*2*3"]
`);

console.log("Actual result:", addOperators("123", 6));

// ============================================
// TEST CASES
// ============================================

console.log("\n" + "█".repeat(70));
console.log("TEST CASES");
console.log("█".repeat(70));

const testCases = [
    { num: "123", target: 6, expected: ["1+2+3", "1*2*3"] },
    { num: "232", target: 8, expected: ["2*3+2", "2+3*2"] },
    { num: "105", target: 5, expected: ["1*0+5", "10-5"] },
    { num: "00", target: 0, expected: ["0+0", "0-0", "0*0"] },
    { num: "3456237490", target: 9191, expected: [] },
];

testCases.forEach(({ num, target, expected }, i) => {
    const result = addOperators(num, target);
    console.log(`\nTest ${i + 1}:`);
    console.log(`  Input: num="${num}", target=${target}`);
    console.log(`  Output: [${result.join(', ')}]`);
    console.log(`  Expected: [${expected.join(', ')}]`);
    console.log(`  Match: ${JSON.stringify(result.sort()) === JSON.stringify(expected.sort()) ? '✓' : '✗'}`);
});

// ============================================
// DETAILED WALKTHROUGH: MULTIPLICATION
// ============================================

console.log("\n" + "🔍".repeat(35));
console.log("\nDETAILED: How Multiplication Works\n");

console.log("Example: Building '2+3*4'\n");

console.log("Step 1: Start with '2'");
console.log("  path = '2'");
console.log("  value = 2");
console.log("  lastOperand = 2\n");

console.log("Step 2: Add '+3'");
console.log("  path = '2+3'");
console.log("  value = 2 + 3 = 5");
console.log("  lastOperand = 3  ← Remember this!\n");

console.log("Step 3: Add '*4'");
console.log("  Current state: value=5, lastOperand=3");
console.log("  ");
console.log("  ❌ Wrong: 5 * 4 = 20");
console.log("  ");
console.log("  ✓ Correct approach:");
console.log("    1. Undo last addition: 5 - 3 = 2");
console.log("    2. Apply multiplication: 3 * 4 = 12");
console.log("    3. Add result: 2 + 12 = 14 ✓");
console.log("  ");
console.log("  Formula: value - lastOperand + (lastOperand * currentNum)");
console.log("           5    - 3           + (3           * 4)");
console.log("           = 2 + 12 = 14 ✓");
console.log("  ");
console.log("  New lastOperand = 3 * 4 = 12");
console.log("  (In case next operation is also multiplication)");

// ============================================
// LEADING ZEROS HANDLING
// ============================================

console.log("\n" + "💡".repeat(35));
console.log("\nLEADING ZEROS HANDLING\n");

console.log("Input: '105', target = 5\n");

console.log("Valid expressions:");
console.log("  '1*0+5' ✓ (1 is valid, 0 is valid, 5 is valid)");
console.log("  '10-5' ✓ (10 is valid, 5 is valid)\n");

console.log("Invalid expressions:");
console.log("  '1*05' ✗ ('05' has leading zero)");
console.log("  '105' ✗ (doesn't equal 5)\n");

console.log("Code check:");
console.log("  if (currentStr.length > 1 && currentStr[0] === '0') {");
console.log("    break;  // Skip '05', '056', etc.");
console.log("  }");
console.log("  ");
console.log("  But '0' alone is OK!");

// ============================================
// COMPLEXITY ANALYSIS
// ============================================

console.log("\n" + "⏱️ ".repeat(35));
console.log("\nCOMPLEXITY ANALYSIS\n");

console.log("TIME COMPLEXITY: O(4^n × n)");
console.log("─".repeat(70));
console.log(`
At each position, we have up to 4 choices:
  1. No split (continue current number)
  2. Split and add +
  3. Split and add -
  4. Split and add *

Depth of recursion: n (string length)
At each level: 4 branches (worst case)

Total nodes in tree: 4^n
At each node: O(n) for string operations (slice, concatenation)

Total: O(4^n × n)
`);

console.log("SPACE COMPLEXITY: O(n)");
console.log("─".repeat(70));
console.log(`
Recursion stack: O(n) depth
Path string: O(n) length
Result array: Not counted (output space)

Total: O(n)
`);

// ============================================
// EDGE CASES
// ============================================

console.log("\n" + "⚠️ ".repeat(35));
console.log("\nEDGE CASES\n");

console.log("1. Single digit:");
console.log("   '3', target=3 → ['3'] ✓\n");

console.log("2. All zeros:");
console.log("   '00', target=0 → ['0+0', '0-0', '0*0'] ✓\n");

console.log("3. Leading zeros:");
console.log("   '105' → '10-5' ✓, but NOT '1*05' ✗\n");

console.log("4. Large numbers:");
console.log("   Overflow? Use BigInt if needed\n");

console.log("5. No solution:");
console.log("   '123', target=100 → [] ✓");

// ============================================
// INTERVIEW TIPS
// ============================================

console.log("\n" + "💼 ".repeat(35));
console.log("\nINTERVIEW STRATEGY\n");

console.log("STEP 1: Clarify");
console.log("  'Can numbers have leading zeros?'");
console.log("  → NO (except '0' itself)\n");

console.log("STEP 2: Explain approach");
console.log("  'I'll use backtracking to try all combinations'");
console.log("  'The tricky part is multiplication precedence'\n");

console.log("STEP 3: Explain multiplication");
console.log("  'For multiplication, I need to undo the last operation'");
console.log("  Draw example: '2+3*4' on whiteboard\n");

console.log("STEP 4: Code");
console.log("  Start with structure, add details");
console.log("  Mention leading zero check\n");

console.log("STEP 5: Test");
console.log("  '123' → Show recursion tree");
console.log("  '105' → Show leading zero handling");

// ============================================
// ALTERNATIVE: WITH EVAL (NOT RECOMMENDED)
// ============================================

console.log("\n" + "⚠️  ALTERNATIVE APPROACH (Not Recommended)\n");

console.log(`
You COULD use eval() for simpler code:

function addOperatorsEval(num, target) {
    const result = [];
    
    function backtrack(index, path) {
        if (index === num.length) {
            if (eval(path) === target) {
                result.push(path);
            }
            return;
        }
        
        for (let i = index; i < num.length; i++) {
            const curr = num.slice(index, i + 1);
            if (curr.length > 1 && curr[0] === '0') break;
            
            if (index === 0) {
                backtrack(i + 1, curr);
            } else {
                backtrack(i + 1, path + '+' + curr);
                backtrack(i + 1, path + '-' + curr);
                backtrack(i + 1, path + '*' + curr);
            }
        }
    }
    
    backtrack(0, '');
    return result;
}

❌ Problems with eval():
  1. Security risk (if input not trusted)
  2. Performance (slower than direct calculation)
  3. Interviewers want to see YOU handle precedence

✅ Use the manual calculation approach shown above!
`);

console.log("\n" + "═".repeat(70));
console.log("This is a HARD problem - practice the multiplication logic! 💪");
console.log("═".repeat(70));