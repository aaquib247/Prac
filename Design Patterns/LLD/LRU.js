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

//   // ── EVICTION STRATEGIES ──
// class LRUEviction {
//   evict(cache) {
//     const lruKey = cache.keys().next().value;
//     cache.delete(lruKey);
//   }
// }

// class FIFOEviction {
//   evict(cache) {
//     const firstKey = cache.keys().next().value;
//     cache.delete(firstKey);
//   }
// }

// // ── CACHE ──
// class Cache {
//   constructor(capacity, evictionStrategy) {
//     this.capacity = capacity;
//     this.cache = new Map();
//     this.evictionStrategy = evictionStrategy;
//   }

//   get(key) {
//     if (!this.cache.has(key)) return -1;
//     const value = this.cache.get(key);
//     this.cache.delete(key);
//     this.cache.set(key, value);    // move to MRU
//     return value;
//   }

//   put(key, value) {
//     if (this.cache.has(key)) this.cache.delete(key);
//     this.cache.set(key, value);
//     if (this.cache.size > this.capacity) {
//       this.evictionStrategy.evict(this.cache);  // delegate
//     }
//   }
// }

// // ── TEST ──
// const cache = new Cache(2, new LRUEviction());
// cache.put(1, 1);
// cache.put(2, 2);
// console.log(cache.get(1));   // 1
// cache.put(3, 3);             // evicts 2
// console.log(cache.get(2));   // -1
