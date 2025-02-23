class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.counter = 0;
    this.buckets = new Array(this.capacity).fill([]);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find((item) => item.key === key);

    if (item) {
      item.value = value;
    } else {
      bucket.push({ key, value });
      this.counter++;
    }

    this.grow();
  }

  get(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find((item) => item.key === key);

    return item ? item.value : null;
  }

  has(key) {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find((item) => item.key === key);

    return item ? true : false;
  }

  remove(key) {
    if (!this.has(key)) return false;

    const index = this.hash(key);
    const bucket = this.buckets[index];
    const item = bucket.find((item) => item.key === key);

    const bucketIndex = bucket.indexOf(item);
    bucket.splice(bucketIndex, 1);
    this.counter--;

    this.shrink();

    return true;
  }

  length() {
    return this.counter;
  }

  clear() {
    this.buckets = new Array(this.capacity).fill([]);
    this.counter = 0;
  }

  keys() {
    return this.buckets.reduce((acc, bucket) => {
      return acc.concat(bucket.map((item) => item.key));
    }, []);
  }

  values() {
    return this.buckets.reduce((acc, bucket) => {
      return acc.concat(bucket.map((item) => item.value));
    }, []);
  }

  entries() {
    return this.buckets.reduce((acc, bucket) => {
      return acc.concat(bucket.map((item) => [item.key, item.value]));
    }, []);
  }

  grow() {
    if (this.counter / this.capacity > this.loadFactor) {
      const entries = this.entries();
      this.capacity *= 2;
      this.clear();

      entries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }

  shrink() {
    if (
      this.capacity > 16 &&
      this.counter / (this.capacity / 2) <= this.loadFactor
    ) {
      const entries = this.entries();
      this.capacity /= 2;
      this.clear();

      entries.forEach((entry) => {
        this.set(entry[0], entry[1]);
      });
    }
  }
}

export default HashMap;
