class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.size = 0;

    this.keyToVal = new Map();    // key -> value
    this.keyToFreq = new Map();   // key -> frequency
    this.freqToKeys = new Map();  // frequency -> ordered set of keys
    this.minFreq = 0;
  }

  get(key) {
    if (!this.keyToVal.has(key)) return -1;

    // Increase frequency
    this._increaseFreq(key);
    return this.keyToVal.get(key);
  }

  put(key, value) {
    if (this.capacity === 0) return;

    if (this.keyToVal.has(key)) {
      this.keyToVal.set(key, value);
      this._increaseFreq(key);
      return;
    }

    // Evict if needed
    if (this.size >= this.capacity) {
      const keys = this.freqToKeys.get(this.minFreq);
      const lfuKey = keys.keys().next().value; // Least recently used among least freq
      keys.delete(lfuKey);
      if (keys.size === 0) this.freqToKeys.delete(this.minFreq);

      this.keyToVal.delete(lfuKey);
      this.keyToFreq.delete(lfuKey);
      this.size--;
    }

    // Add new key
    this.keyToVal.set(key, value);
    this.keyToFreq.set(key, 1);
    if (!this.freqToKeys.has(1)) this.freqToKeys.set(1, new Set());
    this.freqToKeys.get(1).add(key);
    this.minFreq = 1;
    this.size++;
  }

  _increaseFreq(key) {
    const freq = this.keyToFreq.get(key);
    const newFreq = freq + 1;
    this.keyToFreq.set(key, newFreq);

    // Remove key from old freq group
    const keys = this.freqToKeys.get(freq);
    keys.delete(key);
    if (keys.size === 0) {
      this.freqToKeys.delete(freq);
      if (this.minFreq === freq) {
        this.minFreq++;
      }
    }

    // Add key to new freq group
    if (!this.freqToKeys.has(newFreq)) this.freqToKeys.set(newFreq, new Set());
    this.freqToKeys.get(newFreq).add(key);
  }
}


const cache = new LFUCache(2);

cache.put(1, 1);         // {1:1}
cache.put(2, 2);         // {1:1, 2:2}
console.log(cache.get(1)); // 1 → frequency of 1 becomes 2
cache.put(3, 3);         // Evicts key 2 (freq=1), inserts key 3
console.log(cache.get(2)); // -1 (evicted)
console.log(cache.get(3)); // 3 → freq becomes 2
cache.put(4, 4);         // Evicts key 1 (freq=2), inserts 4
console.log(cache.get(1)); // -1 (evicted)
console.log(cache.get(3)); // 3
console.log(cache.get(4)); // 4

// | Operation | Time | Space |
// | --------- | ---- | ----- |
// | `get`     | O(1) | O(n)  |
// | `put`     | O(1) | O(n)  |
