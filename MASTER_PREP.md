# Mother of All Preps — 6.5 YoE → Tier-1 SDE2/SSE

Target: Atlassian P40/P50 · Microsoft SSE/SDE2 · Amazon L5/L6 · Meta E5 · Apple ICT3 · Stripe · Razorpay

---

## Your Actual Coverage (corrected after full repo audit)

| Topic | Status | Actual files |
|---|---|---|
| Arrays / Two Pointer | ✅ Strong | 3Sum, 4Sum, Kadane, intervals, product, rotate |
| Sliding Window | ✅ Covered | subArrayProdLessThanK, Questions_SW_2P |
| Linked Lists | ✅ Covered | singly, interview questions, merge K ✅ |
| Trees / BST | ✅ Strong | BST, traversals, segment tree, vertical, top/bottom view |
| Graphs | ✅ Excellent | Dijkstra, Bellman-Ford, Kruskal, Prim, Union-Find, Topo Sort (BFS+DFS), Word Ladder I+II, Alien Dictionary, Account Merge, Pacific Atlantic |
| Heaps | ✅ Covered | kth largest, k frequent, merge K, median stream |
| Trie | ✅ Covered | implement, word search II |
| Backtracking | ✅ Strong | N-Queens, permutations, expression add operators, maze |
| Stack / Monotonic | ✅ Excellent | NGE, Histogram, Rain Water, Stock Span, LRU, LFU, Min Stack |
| Greedy | ⚠️ Partial | Jump Game I+II, Gas Station, Candy, Partition Labels |
| Sort | ✅ Covered | Merge, Quick, Bubble, Insertion, Selection |
| **DP — 1D/2D** | ✅ Strong | Climbing Stairs, House Robber, Ninja Training, Paint House, Unique Paths, Min Path Sum, Cherry Picks |
| **DP — Knapsack** | ✅ Strong | 0/1, Unbounded, LCS, Coin Change, Rod Cutting |
| **DP — Partition** | ✅ Advanced | MCM, Burst Balloons, Egg Drop, Palindrome Partition II |
| **DP — Stocks & LIS** | ✅ Excellent | All 6 stock variants, LIS O(n log n), Bitonic, String Chain |
| **DP — Hard** | ✅ Strong | Edit Distance, Wild Card Match, Maximal Square, Shortest Common Superseq |
| **Binary Search** | ✅ Strong | Koko, Aggressive Cows, Median 2 Arrays, Split Array, Min Days, Min Time |
| **Intervals** | ⚠️ Partial | Merge intervals, overlapping — missing Employee Free Time |
| LLD | ✅ Excellent | 15+ problems, all major patterns |
| HLD | ✅ Good | URL Shortener, Rate Limiter, Uber, Zomato, Webhooks |

---

## Real Gaps (small but targeted — fix these)

### 1. DP on Trees (2 problems — high frequency)
```
- Binary Tree Maximum Path Sum (LC 124) — Meta, Amazon
- House Robber III (LC 337) — DP + tree recursion
```

### 2. Sliding Window — Missing Key Patterns
```
- Minimum Window Substring (LC 76) — asked at Meta, Stripe, Amazon constantly
- Sliding Window Maximum (LC 239) — deque pattern, different from what you have
- Longest Subarray / Substring variants with HashMap
```

### 3. String DP — 3 gaps
```
- Word Break (LC 139) — Amazon, Microsoft
- Decode Ways (LC 91) — Amazon, Meta
- Interleaving String (LC 97) — Google, Stripe
```

### 4. Trees — 2 gaps
```
- Serialize / Deserialize Binary Tree (LC 297) — Microsoft, Amazon, Meta
- Construct BT from Preorder + Inorder (LC 105) — Amazon, Apple
```

### 5. Graph — 1 gap
```
- Critical Connections / Bridges (LC 1192) — Amazon AWS, Tarjan's algorithm
  (different from anything you have — articulation points)
```

### 6. Greedy — 2 gaps
```
- Meeting Rooms II (LC 253) — every company, use min-heap
- Task Scheduler (LC 621) — Amazon, Microsoft, Meta
```

### 7. Missing Sliding Window / Two-Pointer
```
- Copy List with Random Pointer (LC 138) — Amazon, Microsoft
- Find All Anagrams in String (LC 438) — Apple, Amazon
```

That's it. ~12 problems to close all gaps. Everything else in your repo is solid.

---

## The "I Don't Even Know This" Questions — What Companies Actually Ask

These are real, company-tagged questions that feel unfamiliar because they don't appear in generic prep lists. Most are variations of patterns you already know — the trick is recognizing the underlying pattern.

---

### Atlassian — What They Actually Ask

```
Standard (you have these):
- Course Schedule I & II (207, 210) ✅
- Clone Graph (133) ✅
- LRU Cache (146) ✅

The Unexpected:
- Design Hit Counter (LC 362) — sliding window on timestamps, ~20 min problem
  Pattern: circular buffer / queue with timestamps
  
- Moving Average from Data Stream (LC 346)
  Pattern: queue of fixed size, running sum
  
- Design Tic-Tac-Toe (LC 348)
  Pattern: rows/cols/diag counters, O(1) win check — NOT the full board scan
  
- Find First and Last Position of Element (LC 34)
  Pattern: binary search twice (left bound, right bound)
  
- Zigzag Level Order (LC 103)
  Pattern: BFS with deque/flag to reverse alternate levels
  
- Nested List Weight Sum (LC 339)
  Pattern: DFS/BFS on nested list — Jira subtask analogy
  
- Flatten Nested List Iterator (LC 341)
  Pattern: iterator design with stack — real design problem
  
- Meeting Rooms II (LC 253) — heap of end times, O(n log n)
```

---

### Microsoft — What They Actually Ask

```
Standard (you have these):
- LRU, Median Stream, Serialize/Deserialize BT

The Unexpected:
- Excel Sheet Column Title (LC 168) + Column Number (LC 171)
  Pattern: base-26 conversion with 1-indexed offset
  Note: They literally ask this because it's Excel
  
- Encode and Decode Strings (LC 271)
  Pattern: length-prefix encoding — not intuitive first time
  
- Find Duplicate Number (LC 287)
  Pattern: Floyd's cycle detection in array (treat as linked list)
  This is the "aha" — most people brute force it
  
- Range Sum Query - Mutable (LC 307)
  Pattern: Segment Tree / BIT (Binary Indexed Tree)
  
- Implement Rand10 Using Rand7 (LC 470)
  Pattern: rejection sampling — probability question disguised as algo
  
- Maximum Points on a Line (LC 149)
  Pattern: HashMap of slopes, GCD normalization — easy to mess up
  
- Falling Squares (LC 699)
  Pattern: interval overlap + coordinate compression
  
- Count of Range Sum (LC 327) — hard, but asked
  Pattern: merge sort variant
  
- Valid Number (LC 65)
  Pattern: pure string parsing — annoying, not algorithmic
  State machine approach is cleanest
```

---

### Amazon — What They Actually Ask

```
Standard (you have these):
- Top K Frequent ✅, Merge K Sorted ✅, K Closest ✅, Partition Labels ✅

The Unexpected:
- Reorder Data in Log Files (LC 937)
  Pattern: custom comparator sort — literally appears in Amazon OA
  Letters before digits, stable sort within letters
  
- Min Difficulty of Job Schedule (LC 1335)
  Pattern: DP with daily constraint — looks like scheduling, is DP
  
- Partition Array for Maximum Sum (LC 1043)
  Pattern: DP — partition into at most k-length subarrays
  
- Brick Wall (LC 554)
  Pattern: HashMap counting edge positions — O(n), looks hard
  
- Maximum Width Ramp (LC 962)
  Pattern: monotonic stack for index pairs
  
- Decode String (LC 394) — "3[a2[c]]" → "accaccacc"
  Pattern: stack-based parsing, asked at Amazon and Stripe
  
- Random Pick with Weight (LC 528)
  Pattern: prefix sum + binary search for weighted random
  
- Implement Magic Dictionary (LC 676)
  Pattern: Trie + wildcard / edit distance 1 check
  
- Find And Replace in String (LC 833)
  Pattern: sort by index descending, apply replacements backwards
  
- Shopping Offers (LC 638)
  Pattern: DFS + memoization — disguised knapsack
  
- Two Sum BSTs (LC 1214)
  Pattern: in-order traversal + two pointer on two BSTs
```

---

### Meta — What They Actually Ask (Speed Matters)

```
Standard (you have these):
- Expression Add Operators ✅, Word Ladder ✅, Alien Dictionary ✅

The Unexpected:
- Text Justification (LC 68) — HARD, Meta asks this
  Pattern: greedy word packing, distribute spaces evenly
  Most candidates fail the space distribution logic
  
- Minimum Remove to Make Valid Parentheses (LC 1249)
  Pattern: two-pass OR stack tracking indices
  
- Dot Product of Two Sparse Vectors (LC 1570)
  Pattern: store non-zero as HashMap, iterate smaller one
  
- Valid Word Abbreviation (LC 408)
  Pattern: two pointer — i on word, j on abbr, parse digits
  
- Move Zeroes (LC 283) — trivial but asked as warm-up
  Pattern: two pointer in-place
  
- Pow(x, n) (LC 50) — fast exponentiation
  Pattern: divide and conquer — handle negative n
  
- Random Pick Index (LC 398)
  Pattern: reservoir sampling — must know this concept
  
- Diagonal Traverse (LC 498)
  Pattern: direction flag + boundary condition — fiddly
  
- Max Consecutive Ones III (LC 1004)
  Pattern: sliding window with k flips
  
- Subarray Sum Equals K (LC 560) ✅ you likely have this
  Pattern: prefix sum + HashMap
  
- Merge Sorted Array (LC 88) — asked as warm-up at Meta
  Pattern: fill from end backwards
```

---

### Stripe — What They Actually Ask

```
Standard (you have these):
- Edit Distance ✅, Rate Limiter ✅, LRU ✅

The Unexpected:
- Basic Calculator II (LC 227) — "3+2*2" → 7
  Pattern: stack + operator precedence, no parentheses version
  
- Basic Calculator (LC 224) — with parentheses
  Pattern: stack for sign, recurse on '('
  
- Evaluate Reverse Polish Notation (LC 150)
  Pattern: stack — know all 4 operators + edge cases
  
- Design Underground System (LC 1396)
  Pattern: two HashMaps — checkin data + route averages
  Real-world API design problem disguised as algo
  
- Minimum Cost to Connect Sticks (LC 1167)
  Pattern: min-heap, always merge two smallest
  
- Count of Smaller Numbers After Self (LC 315) — hard
  Pattern: merge sort with index tracking OR BIT
  
- Largest Rectangle in Histogram (LC 84) ✅ you have this
  
- Longest Valid Parentheses (LC 32) ✅ you have this
```

---

### Apple — What They Actually Ask

```
The Unexpected:
- Number of Recent Calls (LC 933)
  Pattern: queue with sliding window — trim old entries
  
- Short Encoding of Words (LC 820)
  Pattern: reverse words, build Trie of reversed strings
  
- Maximum Level Sum of Binary Tree (LC 1161)
  Pattern: BFS level order + max tracking
  
- Linked List Components (LC 817)
  Pattern: HashSet of node values, count connected components
  
- Design Circular Queue (LC 622)
  Pattern: array + head/tail/size pointers — implement cleanly
  
- K-diff Pairs in Array (LC 532)
  Pattern: HashMap or two pointer with dedup handling
  
- Task Scheduler (LC 621)
  Pattern: max-heap + cooldown — greedy
  Key insight: (maxFreq - 1) * (n + 1) + countOfMaxFreq
```

---

### Razorpay — What They Actually Ask

```
Focus is more on system understanding and real scenarios:

DSA:
- Sliding Window: Max sum subarray of size k, longest substring with k distinct
- LRU Cache ✅
- Stock problems ✅
- Basic sorting and searching
- Design a simple HashMap from scratch

Real Scenario Questions (more common than pure DSA):
1. How does UPI work end-to-end? Walk through a payment.
2. How do you handle a double charge? (idempotency)
3. If a payment is in "pending" state for 2 hours, what do you do?
4. How would you build a retry mechanism for failed webhooks?
5. How do you detect duplicate transactions?
6. Design the data model for a multi-currency wallet.
```

---

## Pattern Recognition: Why These Feel "Unknown"

Most unfamiliar questions are one of these disguises:

```
Looks unfamiliar        | Actual pattern
------------------------|------------------------------------------
Log file sorting        | Custom comparator + stable sort
Hit counter             | Sliding window on time
Sparse vector dot prod  | HashMap intersection
Weighted random pick    | Prefix sum + binary search
Decode string           | Stack-based expression parsing
Underground system      | Two HashMaps (aggregate pattern)
Excel column title      | Base-26 with off-by-one
Find duplicate (no extra space) | Floyd's cycle detection
Magic dictionary        | Trie + edit distance 1
Brick wall              | Count gaps with HashMap
```

**The fix:** when you see an unfamiliar problem, ask yourself:
1. What data structure fits the "I need fast X" requirement?
2. Is there a hidden sorting / ordering that simplifies it?
3. Is this a known pattern (DP, graph, two pointer) in disguise?

---

### Atlassian (SDE2 / P40–P50)
Focus: Medium problems, graph traversal (dependency graphs = Jira), intervals
```
- Course Schedule I & II (LC 207, 210) — topological sort, direct Jira analogy
- Task Scheduler (LC 621)
- Merge Intervals (LC 56) — sprint/roadmap analogy
- Clone Graph (LC 133) — you already have this ✅
- Number of Connected Components (LC 323)
- Find if Path Exists in Graph (LC 1971)
- Design LRU Cache (LC 146) — always asked
- Implement Trie (LC 208) — search autocomplete (Confluence)
- Word Search II (LC 212) — you have this ✅
```

### Microsoft (SSE / SDE2)
Focus: Arrays, Strings, Trees, OOP design
```
- Serialize and Deserialize Binary Tree (LC 297)
- Design HashMap (LC 706)
- Excel Sheet Column Number (LC 171) — literally MS Excel
- Number of Islands (LC 200)
- Longest Substring Without Repeating Characters (LC 3)
- Reverse Words in a String (LC 151)
- Regular Expression Matching (LC 10) — DP
- Evaluate Division (LC 399) — graph
- Meeting Rooms II (LC 253)
- Maximum Frequency Stack (LC 895)
- Find Median from Data Stream (LC 295)
```

### Amazon (L5 / L6)
Focus: Arrays, Trees, Graphs, DP. Bar raiser = open-ended + tradeoffs
```
- Top K Frequent Elements (LC 347) — you have this ✅
- Merge K Sorted Lists (LC 23) — you have this ✅
- K Closest Points to Origin (LC 973) — you have this ✅
- LRU Cache (LC 146) — MUST know cold
- Reorder Data in Log Files (LC 937) — Amazon literal question
- Critical Connections in Network (LC 1192) — AWS
- Course Schedule (LC 207, 210) — dependency resolution
- Robot Bounded in Circle (LC 1041)
- Number of Visible People in Queue (LC 1944) — monotonic stack
- Split Array Largest Sum (LC 410) — binary search on answer
- Longest Palindromic Substring (LC 5) — you have this ✅
- Partition Labels (LC 763) — you have this ✅
- Trapping Rain Water (LC 42) — asked constantly
```

### Meta / Facebook (E5)
Focus: Hard DSA — graphs, trees, recursion, DP. Speed matters.
```
- Clone Graph (LC 133) ✅
- Word Ladder (LC 127) — BFS, very Meta
- Accounts Merge (LC 721) — Union Find
- Find Critical and Pseudo-Critical Edges (LC 1489)
- Expression Add Operators (LC 282) — you have this ✅
- Binary Tree Maximum Path Sum (LC 124)
- Diameter of Binary Tree (LC 543)
- Subarray Sum Equals K (LC 560)
- Minimum Window Substring (LC 76)
- Alien Dictionary (LC 269) — topological sort
- Read N Characters Given Read4 II (LC 158)
- Random Pick with Weight (LC 528)
- Dot Product of Two Sparse Vectors (LC 1570)
```

### Apple (ICT3)
Focus: Clean code, OOP, algorithms. No tricks — fundamentals deep.
```
- Valid Parentheses (LC 20)
- Implement Stack using Queues (LC 225)
- Design Circular Queue (LC 622)
- Maximum Subarray (Kadane's) ✅
- Rotate Image (LC 48)
- Spiral Matrix (LC 54)
- Find All Anagrams in String (LC 438)
- Course Schedule (LC 207)
- Pacific Atlantic Water Flow (LC 417)
- Word Search (LC 79)
```

### Stripe
Focus: Real-world problems — concurrency, distributed systems, API design, DP
```
- Edit Distance (LC 72) — directly asked
- Longest Common Subsequence (LC 1143)
- Design a Rate Limiter (you have this in HLD ✅)
- Implement Queue using Stacks (LC 232)
- LRU Cache (LC 146)
- Design Twitter (LC 355)
- Task Scheduler (LC 621)
- Sliding Window Maximum (LC 239)
- Unique Paths (LC 62)
```

### Razorpay
Focus: Medium DSA, payment system design, distributed transactions
```
- Design Payment System (HLD)
- Two Sum, 3Sum ✅
- Group Anagrams ✅
- Valid Parentheses
- LRU Cache
- Rate Limiter ✅
- Design Notification System
```

---

## LLD — Company-Specific Questions

You already have: Parking Lot ✅, Elevator ✅, BMS ✅, ATM ✅, Splitwise ✅, Snake & Ladder ✅, Vending Machine ✅, Uber ✅, Amazon Locker ✅

### Still Missing — Build These

```
Atlassian:
- Design Jira (Issues, Sprints, Boards, Epics, Comments, Watchers)
- Design Confluence Page (versioning, nested pages, permissions)
- Design a Notification System (email/push/slack with preferences)
- Design a Workflow Engine (state machine — issue lifecycle)

Microsoft:
- Design Excel (cells, formulas, dependencies — observer pattern)
- Design VS Code Plugin System (extensibility)
- Design a Collaborative Document Editor (conflict resolution)
- Design Calendar (recurring events, invites, conflicts)

Amazon:
- Design Amazon Locker ✅
- Design Order Management System ✅
- Design Inventory Management with reservations
- Design a Delivery Routing System
- Design a Review and Rating System

Meta:
- Design Facebook Newsfeed (producer-consumer, fanout)
- Design Instagram (posts, follow, feed, stories)
- Design a Messaging App like WhatsApp (group chat, read receipts)
- Design Like/Reaction System (counters at scale)

Apple:
- Design App Store (reviews, versioning, downloads)
- Design iCloud file sync (conflict resolution, delta sync)
- Design Music Player (playlist, shuffle, queue)

Stripe:
- Design a Payment Gateway
- Design a Billing/Subscription system (recurring charges)
- Design a Fraud Detection pipeline (rules engine)
- Design a Webhook Delivery System ✅ (you have this)

Razorpay:
- Design UPI payment flow (end to end)
- Design a Refund Management System
- Design a Settlement Engine
```

### LLD Patterns You Must Nail (with examples in your codebase)

```
1. Strategy Pattern     → Payment methods (card/UPI/wallet)
2. Observer Pattern     → Notifications, event systems ✅
3. Factory Pattern      → Creating different notification types ✅
4. Decorator Pattern    → Add features to objects (logging, caching) ✅
5. Singleton            → DB connection, config ✅
6. Command Pattern      → Undo/redo (text editor, Excel)
7. State Pattern        → Order lifecycle, Elevator ✅
8. Chain of Responsibility → Approval workflows, middleware ✅
9. Builder Pattern      → Complex object construction (QueryBuilder, DocumentBuilder)
10. Composite Pattern   → File system, organizational hierarchy
```

---

## HLD — Company-Specific Systems

You already have: URL Shortener ✅, Rate Limiter ✅, Uber ✅, Zomato ✅, Real-time systems ✅

### Still Missing — These Are Must-Haves in 2026

```
Atlassian:
- Design Jira at scale (multi-tenant SaaS, project isolation)
- Design a Real-Time Collaboration System (Operational Transform / CRDT)
- Design a Search System (full-text search over documents)
- Design an Audit Log System (append-only, compliance)

Microsoft:
- Design Azure Blob Storage / S3-like Object Store
- Design a Distributed Cache (Redis-like)
- Design OneDrive / Dropbox (file sync, conflict resolution)
- Design a CI/CD Pipeline System

Amazon:
- Design Amazon S3 (object storage, consistency, replication)
- Design Amazon SQS (message queue, delivery guarantees)
- Design Amazon DynamoDB (key-value + document, partition tolerance)
- Design a Recommendation System
- Design a Flash Sale / Deal of the Day System

Meta:
- Design Facebook News Feed (read-heavy, social graph, fanout)
- Design Instagram (photo upload, CDN, feed generation)
- Design WhatsApp (message delivery guarantees, end-to-end)
- Design a Live Video Streaming system
- Design Social Graph (friend suggestions, 6 degrees)

Apple:
- Design App Store (search, reviews, versioning, downloads at scale)
- Design iCloud (sync protocol, conflict resolution, delta uploads)
- Design Push Notification Service (APNs-like)

Stripe:
- Design a Payment Processing System (idempotency keys, at-least-once delivery)
- Design a Fraud Detection System (real-time ML pipeline)
- Design a Global Distributed Ledger (double-entry bookkeeping at scale)
- Design a Webhook Delivery System with retries ✅

Razorpay:
- Design a UPI Payment System (NPCI integration, PSP, bank adapter)
- Design a Real-time Settlement Engine
- Design a Payment Reconciliation System
```

### HLD Template (use this for every problem)

```
1. Requirements (5 min)
   - Functional: What does it do?
   - Non-functional: Scale? Latency? Availability? Consistency?
   - Estimate: DAU, QPS, Storage, Bandwidth

2. High-Level Design (10 min)
   - Core entities + APIs
   - Basic flow end-to-end
   - Draw the boxes: Client → LB → Service → DB/Cache

3. Deep Dive (15 min)
   - Pick the hardest part and go deep
   - Trade-offs: SQL vs NoSQL, push vs pull, sync vs async
   - Bottlenecks and how you'd solve them

4. Scale & Reliability (5 min)
   - Sharding strategy
   - Replication
   - Failover
   - Monitoring/alerting
```

### HLD Concepts You Must Be Fluent In

```
Storage:
- SQL (ACID, indexing, sharding)
- NoSQL: document (MongoDB), key-value (Redis/DynamoDB), wide-column (Cassandra), graph (Neo4j)
- When to use each — know the CAP theorem cold
- Consistent hashing — where/why

Caching:
- Cache-aside, write-through, write-back, read-through
- Cache eviction: LRU, LFU, TTL
- Cache stampede + solutions (mutex, probabilistic early expiry)

Messaging:
- Kafka: topics, partitions, consumer groups, at-least-once vs exactly-once
- When to use queue vs pub-sub
- Backpressure

APIs:
- REST vs gRPC vs GraphQL — trade-offs at scale
- Idempotency keys (critical for Stripe/payments)
- API versioning strategies
- Rate limiting: token bucket, leaky bucket, sliding window ✅

Distributed Systems:
- CAP Theorem — Consistency vs Availability
- Eventual consistency + conflict resolution (CRDT, vector clocks)
- Leader election (Raft, Paxos conceptually)
- Distributed transactions: 2PC, Saga pattern
- Circuit breaker + bulkhead (resilience patterns)

Search:
- Inverted index
- Elasticsearch internals
- Typeahead/autocomplete (Trie + top-K)

Real-time:
- WebSockets vs SSE vs Long Polling
- Pub/Sub at scale
- Presence system (who's online)
```

---

## Behavioral — Per Company

### Amazon — Leadership Principles (Every Round Has This)
Prepare 2 stories per LP. Most asked:

```
1. Customer Obsession — "Tell me about a time you went above and beyond for a customer"
2. Ownership — "Tell me about a time you took on something outside your scope"
3. Invent & Simplify — "Tell me about a time you simplified a complex process"
4. Bias for Action — "Tell me about a time you made a decision with incomplete information"
5. Deliver Results — "Tell me about your most impactful project"
6. Dive Deep — "Tell me about a time you used data to solve a problem"
7. Disagree and Commit — "Tell me about a time you disagreed with your team/manager"
8. Hire and Develop the Best — "Tell me about mentoring someone"
```
Structure: STAR (Situation, Task, Action, Result — quantify the result)

### Meta
```
- Why Meta?
- Impact at scale — everything must have numbers (users, %, latency)
- "Tell me about a project where you had to make trade-offs"
- "How do you handle disagreement with your tech lead?"
- "Most technically complex project you led"
```

### Atlassian
```
- Values: Open company, no bullshit, play as a team, be the change, build with heart
- "Tell me about a time you gave difficult feedback"
- "Describe a project where you collaborated across teams"
- "How do you handle ambiguity?"
```

### Microsoft
```
- Growth mindset — "Tell me about a mistake and what you learned"
- "How do you stay current with technology?"
- "Describe a time you had to learn something fast"
```

### Stripe
```
- Very technical behavioral — they want specifics
- "Walk me through the last system you designed"
- "How do you ensure reliability in distributed systems?"
- "Tell me about a production incident and how you resolved it"
```

---

## 16-Week Study Plan

### Weeks 1–3: Close DP Gap (Critical)
- Week 1: 1D DP (20 problems)
- Week 2: 2D DP + DP on strings (20 problems)
- Week 3: DP on trees + interval DP (15 problems)

### Weeks 4–5: Binary Search + Monotonic Stack
- All binary search on answer patterns
- Monotonic stack: rain water, histogram, span

### Week 6: Review all existing topics (timed)
- 2 problems/day from each weak area
- Aim: solve any medium in < 20 min

### Weeks 7–8: LLD Deep Dive
- Build: Jira (Atlassian) + Payment Gateway (Stripe) + News Feed (Meta)
- Focus: extensibility, SOLID, design patterns in code

### Weeks 9–10: HLD Deep Dive
- Design per company: 2 systems/week
- Practice talking through the template out loud (record yourself)

### Weeks 11–12: Company-Specific Mock
- Atlassian mock (full 4 rounds)
- Amazon mock (DSA + LLD + HLD + 3x behavioral)
- Meta mock (2x DSA rounds + system design)

### Weeks 13–14: Behavioral Stories
- Write out 8 Amazon LP stories
- Prepare 5 Stripe technical behavioral answers
- Record yourself — timing and clarity matter

### Weeks 15–16: Full Mock Interviews
- LeetCode timed contests
- Pramp / interviewing.io sessions
- Review all HLD systems with a friend

---

## Daily Routine (2026 Job Market Reality)

```
Morning (1.5h):
- 1 LeetCode medium (timed: 25 min)
- If fails: 10 min understand, code clean solution

Evening (1.5h):
- Rotate: LLD one day → HLD next day → Behavioral next day
- Write/speak your solution, not just code it

Weekend (3h each day):
- 1 full mock interview session (DSA + design)
- Review: what went wrong, what can be faster
```

---

## Most Commonly Asked LeetCode (by frequency 2024–2026)

```
Rank | Problem                              | Companies
-----|--------------------------------------|---------------------------
1    | LRU Cache (146)                      | ALL
2    | Merge K Sorted Lists (23)            | ALL ✅ (you have this)
3    | Word Ladder (127)                    | Meta, Google
4    | Trapping Rain Water (42)             | Amazon, Microsoft, Meta
5    | Serialize/Deserialize BT (297)       | Microsoft, Amazon
6    | Minimum Window Substring (76)        | Meta, Stripe
7    | Copy List with Random Pointer (138)  | Amazon, Microsoft
8    | Find Median from Data Stream (295)   | Amazon, Microsoft
9    | Largest Rectangle in Histogram (84)  | Amazon, Meta
10   | Design Twitter (355)                 | Stripe, Meta
11   | Edit Distance (72)                   | Stripe ← literally asked
12   | Alien Dictionary (269)               | Meta, Atlassian
13   | Meeting Rooms II (253)               | Microsoft, Amazon
14   | Partition Equal Subset Sum (416)     | Amazon, Apple
15   | Critical Connections (1192)          | Amazon AWS
```

---

## Real Scenario Questions (Senior Level 6.5 YoE)

These are discussion-based. No single right answer — trade-offs matter.

```
1. Your service handles 10k RPS. You need to add full-text search.
   Walk me through how you'd add it without downtime.

2. You have a hot partition in DynamoDB. What happened, and how do you fix it?

3. How would you implement exactly-once payment processing across
   a distributed system? (Stripe/Razorpay)

4. Your microservice is causing cascading failures. What patterns
   do you apply immediately vs long-term?

5. How would you migrate a 500M row SQL table without downtime?

6. You need to implement global rate limiting across 50 service instances.
   How do you do it? What are the trade-offs?

7. Design a system that detects duplicate/fraudulent transactions
   in real time at 50k TPS.

8. How would you implement a feature flag system for 100M users
   with A/B testing capability?

9. Your daily job queue has 1M items but only 100k complete.
   How do you debug and fix this?

10. How do you handle schema migrations in a zero-downtime deployment?
    (expand-contract pattern)
```

---

## Quick Reference — When to Use What

```
Pattern               | When to use
----------------------|---------------------------------------------
Sliding Window        | Subarray/substring with constraint
Two Pointer           | Sorted array, palindrome, pair sum
Binary Search         | Sorted data or "minimize the maximum"
BFS                   | Shortest path (unweighted), level order
DFS                   | Connected components, path existence, backtracking
Topological Sort      | Dependency ordering (course schedule, build order)
Union Find            | Connected components, cycle detection (undirected)
Heap/Priority Queue   | Top K, merge K sorted, median stream
Monotonic Stack       | Next greater/smaller, histogram, rain water
DP                    | Optimization with overlapping subproblems
Trie                  | Prefix search, autocomplete, word dict
Backtracking          | Permutations, combinations, constraint satisfaction
Greedy                | Local optimal → global optimal (intervals, scheduling)
```

---

Good luck. The market is brutal in 2026 — but most candidates quit on DP and HLD.
Those two gaps closed = top 10% of applicants.
