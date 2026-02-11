/**
 * A utility function to generate a hash code for a string key.
 *
 * @param {string} key - The string key to hash.
 * @returns {number} The calculated hash code.
 */
function hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    const maxSafeInteger = 1000000007;
  
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % maxSafeInteger;
    }
  
    return hashCode;
  }
  
  class HashMap {
    /**
     * Initializes a new HashMap.
     * @param {number} initialCapacity - The starting size of the buckets array.
     * @param {number} loadFactor - The ratio of size to capacity that triggers resizing.
     */
    constructor(initialCapacity = 16, loadFactor = 0.75) {
      this.capacity = initialCapacity;
      this.loadFactor = loadFactor;
      this.buckets = new Array(this.capacity).fill(null);
      this.size = 0;
    }
  
    /**
     * Calculates the bucket index for a given key.
     * @param {string} key - The key to find the index for.
     * @returns {number} The index in the buckets array.
     */
    _getIndex(key) {
      const hashCode = hash(key);
      const index = hashCode % this.capacity;
      if (index < 0 || index >= this.capacity) {
        throw new Error("Hash index out of bounds");
      }
      return index;
    }
  
    /**
     * Finds the bucket and pair index for a given key.
     * @param {string} key - The key to search for.
     * @returns {{bucketIndex: number, pairIndex: number} | null} The indices if found, otherwise null.
     */
    _findEntry(key) {
      const bucketIndex = this._getIndex(key);
      const bucket = this.buckets[bucketIndex];
  
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          const [k, v] = bucket[i];
          if (k === key) {
            return { bucketIndex, pairIndex: i };
          }
        }
      }
      return null;
    }
  
    /**
     * Resizes the internal buckets array and rehashes all existing entries.
     */
    _growCapacity() {
      const oldEntries = this.entries();
  
      this.capacity *= 2;
      this.buckets = new Array(this.capacity).fill(null);
      this.size = 0;
  
      for (const [key, value] of oldEntries) {
        this.set(key, value, { skipGrowthCheck: true });
      }
      console.log(`--- Capacity grown to ${this.capacity} ---`);
    }
  
    /**
     * Sets a key-value pair in the hash map. Overwrites value if key exists.
     * Triggers capacity growth if load factor is exceeded.
     *
     * @param {string} key - The key to set.
     * @param {*} value - The value associated with the key.
     * @param {{skipGrowthCheck: boolean}} options - Internal options to skip growth check during resizing.
     */
    set(key, value, options = { skipGrowthCheck: false }) {
      if (!options.skipGrowthCheck && (this.size + 1) / this.capacity > this.loadFactor) {
        this._growCapacity();
      }
  
      const entry = this._findEntry(key);
  
      if (entry) {
        this.buckets[entry.bucketIndex][entry.pairIndex][1] = value;
      } else {
        const bucketIndex = this._getIndex(key);
        if (!this.buckets[bucketIndex]) {
          this.buckets[bucketIndex] = [];
        }
        this.buckets[bucketIndex].push([key, value]);
        this.size++;
      }
    }
  
    /**
     * Retrieves the value associated with the given key.
     * @param {string} key - The key to look up.
     * @returns {*} The value, or null if the key is not found.
     */
    get(key) {
      const entry = this._findEntry(key);
      return entry ? this.buckets[entry.bucketIndex][entry.pairIndex][1] : null;
    }
  
    /**
     * Checks if the key exists in the hash map.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key exists, false otherwise.
     */
    has(key) {
      return this._findEntry(key) !== null;
    }
  
    /**
     * Removes the entry associated with the given key.
     * @param {string} key - The key to remove.
     * @returns {boolean} True if the key was removed, false if not found.
     */
    remove(key) {
      const entry = this._findEntry(key);
  
      if (entry) {
        const { bucketIndex, pairIndex } = entry;
        this.buckets[bucketIndex].splice(pairIndex, 1);
        this.size--;
  
        if (this.buckets[bucketIndex].length === 0) {
          this.buckets[bucketIndex] = null;
        }
        return true;
      }
  
      return false;
    }
  
    /**
     * Returns the total number of stored keys (size).
     * @returns {number} The number of key-value pairs.
     */
    length() {
      return this.size;
    }
  
    /**
     * Removes all entries from the hash map.
     */
    clear() {
      this.buckets = new Array(this.capacity).fill(null);
      this.size = 0;
    }
  
    /**
     * Returns an array containing all keys.
     * @returns {string[]} An array of keys.
     */
    keys() {
      const allKeys = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [key, value] of bucket) {
            allKeys.push(key);
          }
        }
      }
      return allKeys;
    }
  
    /**
     * Returns an array containing all values.
     * @returns {*[]} An array of values.
     */
    values() {
      const allValues = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          for (const [key, value] of bucket) {
            allValues.push(value);
          }
        }
      }
      return allValues;
    }
  
    /**
     * Returns an array containing all [key, value] pairs.
     * @returns {Array<[string, *]>} An array of entries.
     */
    entries() {
      const allEntries = [];
      for (const bucket of this.buckets) {
        if (bucket) {
          allEntries.push(...bucket);
        }
      }
      return allEntries;
    }
  
    /**
     * Returns the current load level (size / capacity).
     * @returns {number} The current load factor calculation.
     */
    getLoadLevel() {
        return this.size / this.capacity;
    }
  }
  
  /**
   * HashSet class that behaves like a HashMap but only stores keys.
   */
  class HashSet {
      constructor(initialCapacity = 16, loadFactor = 0.75) {
          this.map = new HashMap(initialCapacity, loadFactor);
      }
  
      /**
       * Adds a key to the set.
       * @param {string} key - The key to add.
       */
      add(key) {
          this.map.set(key, true);
      }
  
      /**
       * Checks if a key exists in the set.
       * @param {string} key - The key to check.
       * @returns {boolean} True if the key exists, false otherwise.
       */
      has(key) {
          return this.map.has(key);
      }
  
      /**
       * Removes a key from the set.
       * @param {string} key - The key to remove.
       * @returns {boolean} True if the key was removed, false if not found.
       */
      remove(key) {
          return this.map.remove(key);
      }
  
      /**
       * Returns the number of keys in the set.
       * @returns {number} The size of the set.
       */
      length() {
          return this.map.length();
      }
  
      /**
       * Removes all keys from the set.
       */
      clear() {
          this.map.clear();
      }
  
      /**
       * Returns an array containing all the keys in the set.
       * @returns {string[]} An array of keys.
       */
      keys() {
          return this.map.keys();
      }
  
      /**
       * Returns the current load level (size / capacity) of the underlying map.
       * @returns {number} The current load factor calculation.
       */
      getLoadLevel() {
          return this.map.getLoadLevel();
      }
  }
  
  
  // --- Test Code ---
  
  console.log("--- Initializing HashMap ---");
  const testMap = new HashMap();
  console.log(`Initial Capacity: ${testMap.capacity}, Load Factor: ${testMap.loadFactor}`);
  
  
  const initialData = [
      ['apple', 'red'],
      ['banana', 'yellow'],
      ['carrot', 'orange'],
      ['dog', 'brown'],
      ['elephant', 'gray'],
      ['frog', 'green'],
      ['grape', 'purple'],
      ['hat', 'black'],
      ['ice cream', 'white'],
      ['jacket', 'blue'],
      ['kite', 'pink'],
      ['lion', 'golden']
  ];
  
  // Populate the hash map
  initialData.forEach(([key, value]) => {
      testMap.set(key, value);
  });
  
  console.log("\n--- After initial population (12 entries) ---");
  console.log(`Current Size: ${testMap.length()}`);
  console.log(`Current Capacity: ${testMap.capacity}`);
  console.log(`Current Load Level: ${testMap.getLoadLevel()}`);
  
  // Test overwriting
  console.log("\n--- Test Overwriting Existing Keys ---");
  testMap.set('apple', 'bright red');
  testMap.set('dog', 'dark brown');
  console.log(`Apple value: ${testMap.get('apple')}`);
  console.log(`New Size: ${testMap.length()}`);
  console.log(`New Capacity: ${testMap.capacity}`);
  
  // Test growth trigger
  console.log("\n--- Test Growth Trigger (Adding 'moon') ---");
  testMap.set('moon', 'silver');
  
  console.log(`New Size: ${testMap.length()}`);
  console.log(`New Capacity: ${testMap.capacity}`);
  console.log(`New Load Level: ${testMap.getLoadLevel().toFixed(2)}`);
  
  // Test overwriting after growth
  testMap.set('banana', 'pale yellow');
  console.log(`Banana value after rehash/overwrite: ${testMap.get('banana')}`);
  
  // Test other methods
  console.log("\n--- Testing Other Methods ---");
  console.log(`Has 'lion'? ${testMap.has('lion')}`);
  console.log(`Has 'zebra'? ${testMap.has('zebra')}`);
  console.log(`Get 'carrot': ${testMap.get('carrot')}`);
  console.log(`Remove 'frog': ${testMap.remove('frog')}`);
  console.log(`Remove 'frog' again: ${testMap.remove('frog')}`);
  console.log(`Length after removal: ${testMap.length()}`);
  console.log(`All Keys: ${testMap.keys().join(', ')}`);
  console.log(`All Values: ${testMap.values().join(', ')}`);
  console.log("All Entries:");
  console.log(testMap.entries());
  
  // Test clear
  testMap.clear();
  console.log(`\nLength after clear(): ${testMap.length()}`);
  
  // --- Extra Credit: HashSet Test ---
  console.log("\n--- Testing HashSet (Extra Credit) ---");
  const testSet = new HashSet();
  testSet.add('cat');
  testSet.add('dog');
  testSet.add('mouse');
  
  console.log(`Set Size: ${testSet.length()}`);
  console.log(`Set has 'dog'? ${testSet.has('dog')}`);
  console.log(`Set has 'bird'? ${testSet.has('bird')}`);
  console.log(`Set Keys: ${testSet.keys().join(', ')}`);
  console.log(`Remove 'mouse': ${testSet.remove('mouse')}`);
  console.log(`Set Size after removal: ${testSet.length()}`);
  testSet.clear();
  console.log(`Set Size after clear: ${testSet.length()}`);