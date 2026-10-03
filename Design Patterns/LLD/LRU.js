//O(1)
class LRUCache {
    constructor(capacity) {
      this.capacity = capacity;
      this.cache = new Map(); // Map preserves insertion order
    }
  
    get(key) {
      if (!this.cache.has(key)) return -1;
      
      // Get the value
      const value = this.cache.get(key);
      // Delete and re-add to make it most recently used
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
  
    put(key, value) {
      // If key exists, delete it first
      if (this.cache.has(key)) {
        this.cache.delete(key);
      }
      // Add the new key-value pair
      this.cache.set(key, value);
      // If capacity exceeded, remove the least recently used (first item)
      if (this.cache.size > this.capacity) {
        const firstKey = this.cache.keys().next().value;
        this.cache.delete(firstKey);
      }
    }
  }
  
  // Usage example
  const cache = new LRUCache(2); // Capacity of 2
  
  cache.put(1, 1);
  cache.put(2, 2);
  console.log(cache.get(1));    // Returns 1
  cache.put(3, 3);             // Evicts key 2
  console.log(cache.get(2));    // Returns -1 (not found)
  cache.put(4, 4);             // Evicts key 1
  console.log(cache.get(1));    // Returns -1 (not found)
  console.log(cache.get(3));    // Returns 3
  console.log(cache.get(4));    // Returns 4

//-----------------------------------------------------------------------------
// ┌─────────────────────────────────┐
// │   LRUEviction   FIFOEviction    │  ← Strategy Pattern
// │   evict(cache)  evict(cache)    │    (pluggable eviction)
// └─────────────────────────────────┘
//               ▲ injected
//               │
// ┌─────────────────────────────────┐
// │            Cache                 │
// │─────────────────────────────────│
// │ capacity                         │
// │ cache : Map                      │
// │ evictionStrategy                 │
// │─────────────────────────────────│
// │ get(key)   → O(1)                │
// │ put(key)   → O(1)                │
// └─────────────────────────────────┘

/// ─────────────────────────────────────────────
// LRU EVICTION STRATEGY
// ─────────────────────────────────────────────

// class LRUEvictionStrategy {
//   constructor() {
//     this.order = new Map();
//   }

//   onGet(key) {
//     // Recently accessed → move to end
//     this.order.delete(key);
//     this.order.set(key, true);
//   }

//   onPut(key) {
//     // Recently inserted/updated → move to end
//     this.order.delete(key);
//     this.order.set(key, true);
//   }

//   evict() {
//     // First key = least recently used
//     const key = this.order.keys().next().value;
//     this.order.delete(key);
//     return key;
//   }

//   remove(key) {
//     this.order.delete(key);
//   }
// }


// // ─────────────────────────────────────────────
// // FIFO EVICTION STRATEGY
// // ─────────────────────────────────────────────

// class FIFOEvictionStrategy {
//   constructor() {
//     this.order = new Map();
//   }

//   onGet(key) {
//     // Access does NOT change FIFO order
//   }

//   onPut(key) {
//     // Only remember first insertion
//     if (!this.order.has(key)) {
//       this.order.set(key, true);
//     }
//   }

//   evict() {
//     // First key = oldest inserted
//     const key = this.order.keys().next().value;
//     this.order.delete(key);
//     return key;
//   }

//   remove(key) {
//     this.order.delete(key);
//   }
// }


// // ─────────────────────────────────────────────
// // LFU EVICTION STRATEGY
// // ─────────────────────────────────────────────

// class LFUEvictionStrategy {
//   constructor() {
//     this.frequency = new Map();
//     this.order = new Map();
//   }

//   onGet(key) {
//     this.frequency.set(
//       key,
//       this.frequency.get(key) + 1
//     );
//   }

//   onPut(key) {
//     if (!this.frequency.has(key)) {
//       this.frequency.set(key, 1);
//       this.order.set(key, true);
//     }
//   }

//   evict() {
//     let lfuKey = null;
//     let minFrequency = Infinity;

//     for (const key of this.frequency.keys()) {
//       const freq = this.frequency.get(key);

//       if (freq < minFrequency) {
//         minFrequency = freq;
//         lfuKey = key;
//       }
//     }

//     this.frequency.delete(lfuKey);
//     this.order.delete(lfuKey);

//     return lfuKey;
//   }

//   remove(key) {
//     this.frequency.delete(key);
//     this.order.delete(key);
//   }
// }


// // ─────────────────────────────────────────────
// // CACHE
// // ─────────────────────────────────────────────

// class Cache {
//   constructor(capacity, evictionStrategy) {
//     this.capacity = capacity;
//     this.cache = new Map();
//     this.evictionStrategy = evictionStrategy;
//   }

//   get(key) {
//     if (!this.cache.has(key)) {
//       return -1;
//     }

//     const value = this.cache.get(key);

//     this.evictionStrategy.onGet(key);

//     return value;
//   }

//   put(key, value) {
//     this.cache.set(key, value);

//     this.evictionStrategy.onPut(key);

//     if (this.cache.size > this.capacity) {
//       const keyToEvict = this.evictionStrategy.evict();

//       this.cache.delete(keyToEvict);
//     }
//   }

//   remove(key) {
//     if (!this.cache.has(key)) {
//       return;
//     }

//     this.cache.delete(key);
//     this.evictionStrategy.remove(key);
//   }

//   print() {
//     console.log([...this.cache.entries()]);
//   }
// }


// // ─────────────────────────────────────────────
// // LRU TEST
// // ─────────────────────────────────────────────

// console.log("----- LRU -----");

// const lruCache = new Cache(
//   2,
//   new LRUEvictionStrategy()
// );

// lruCache.put(1, 1);
// lruCache.put(2, 2);

// console.log(lruCache.get(1)); // 1

// lruCache.put(3, 3); // evicts 2

// console.log(lruCache.get(2)); // -1
// console.log(lruCache.get(1)); // 1
// console.log(lruCache.get(3)); // 3


// // ─────────────────────────────────────────────
// // FIFO TEST
// // ─────────────────────────────────────────────

// console.log("----- FIFO -----");

// const fifoCache = new Cache(
//   2,
//   new FIFOEvictionStrategy()
// );

// fifoCache.put(1, 1);
// fifoCache.put(2, 2);

// console.log(fifoCache.get(1)); // 1

// fifoCache.put(3, 3); // evicts 1

// console.log(fifoCache.get(1)); // -1
// console.log(fifoCache.get(2)); // 2
// console.log(fifoCache.get(3)); // 3


// // ─────────────────────────────────────────────
// // LFU TEST
// // ─────────────────────────────────────────────

// console.log("----- LFU -----");

// const lfuCache = new Cache(
//   2,
//   new LFUEvictionStrategy()
// );

// lfuCache.put(1, 1);
// lfuCache.put(2, 2);

// console.log(lfuCache.get(1)); // 1
// console.log(lfuCache.get(1)); // 1

// // Frequency:
// // 1 → 3
// // 2 → 1

// lfuCache.put(3, 3); // evicts 2

// console.log(lfuCache.get(2)); // -1
// console.log(lfuCache.get(1)); // 1
// console.log(lfuCache.get(3)); // 3