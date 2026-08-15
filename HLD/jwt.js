const SECRET = 'secret123';

// 1. ISSUE — on login
function issueToken(userId, role) {
  const payload = { userId, role, exp: Date.now() + 900000 };
  const signature = sign(payload, SECRET);
  return { payload, signature };
}

// 2. VERIFY — on every request
function verifyToken(token) {
  const expected = sign(token.payload, SECRET);
  if (expected !== token.signature) throw new Error('Invalid');
  if (token.payload.exp < Date.now()) throw new Error('Expired');
  return token.payload;
}

// 3. SIGN — HMAC helper
function sign(data, secret) {
  return require('crypto')
    .createHmac('sha256', secret)
    .update(JSON.stringify(data))
    .digest('hex');
}

// TEST
const token = issueToken('u1', 'admin');
console.log(verifyToken(token)); // { userId: 'u1', role: 'admin' }
