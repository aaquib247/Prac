class URLShortener {

  constructor(serverId) {
    this.serverId = serverId;  // unique per server
    this.counter = 0;
    this.map = new Map();      // shortCode → longUrl
  }

  shorten(longUrl) {
    // generate unique ID
    const id = `${this.serverId}${Date.now()}${this.counter++}`;
    
    // base62 encode
    const shortCode = this.toBase62(id);
    
    // store
    this.map.set(shortCode, longUrl);
    
    return `short.ly/${shortCode}`;
  }

  redirect(shortCode) {
    const longUrl = this.map.get(shortCode);
    if (!longUrl) return '404 Not Found';
    return longUrl; // 302 redirect
  }

  toBase62(num) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    num = parseInt(num);
    while (num > 0) {
      result = chars[num % 62] + result;
      num = Math.floor(num / 62);
    }
    return result || '0';
  }
}

// test
const shortener = new URLShortener('S1'); // S1 = server 1

const short = shortener.shorten('https://google.com/very/long/url');
console.log(short);                        // short.ly/xxxxx

console.log(shortener.redirect('xxxxx')); // https://google.com/...
