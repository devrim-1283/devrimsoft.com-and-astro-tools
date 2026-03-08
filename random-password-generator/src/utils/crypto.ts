// ── Password Generation ──

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
const AMBIGUOUS = '0OIl1';

export const DEFAULT_SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

export interface PasswordOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  customSymbols: string;
  excludeAmbiguous: boolean;
}

export function generatePassword(opts: PasswordOptions): string {
  let charset = '';
  const required: string[] = [];

  if (opts.uppercase) {
    const chars = opts.excludeAmbiguous
      ? UPPERCASE.split('').filter((c) => !AMBIGUOUS.includes(c)).join('')
      : UPPERCASE;
    charset += chars;
    required.push(chars);
  }
  if (opts.lowercase) {
    const chars = opts.excludeAmbiguous
      ? LOWERCASE.split('').filter((c) => !AMBIGUOUS.includes(c)).join('')
      : LOWERCASE;
    charset += chars;
    required.push(chars);
  }
  if (opts.numbers) {
    const chars = opts.excludeAmbiguous
      ? NUMBERS.split('').filter((c) => !AMBIGUOUS.includes(c)).join('')
      : NUMBERS;
    charset += chars;
    required.push(chars);
  }
  if (opts.symbols) {
    const syms = opts.customSymbols || DEFAULT_SYMBOLS;
    charset += syms;
    required.push(syms);
  }

  if (charset.length === 0) return '';

  const array = new Uint32Array(opts.length);
  crypto.getRandomValues(array);

  const result = Array.from(array).map((n) => charset[n % charset.length]);

  // Ensure at least one char from each required set
  for (let i = 0; i < required.length && i < opts.length; i++) {
    const rnd = new Uint32Array(1);
    crypto.getRandomValues(rnd);
    result[i] = required[i][rnd[0] % required[i].length];
  }

  // Shuffle with Fisher-Yates
  for (let i = result.length - 1; i > 0; i--) {
    const rnd = new Uint32Array(1);
    crypto.getRandomValues(rnd);
    const j = rnd[0] % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.join('');
}

// ── Password Strength ──

export interface StrengthResult {
  score: number; // 0-4
  entropy: number;
  charsetSize: number;
  crackTime: string;
}

export function analyzeStrength(password: string): StrengthResult {
  if (!password) return { score: 0, entropy: 0, charsetSize: 0, crackTime: '' };

  let charsetSize = 0;
  if (/[a-z]/.test(password)) charsetSize += 26;
  if (/[A-Z]/.test(password)) charsetSize += 26;
  if (/[0-9]/.test(password)) charsetSize += 10;
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32;

  const entropy = password.length * Math.log2(Math.max(charsetSize, 1));

  // Crack time estimation (10 billion guesses/sec)
  const guesses = Math.pow(2, entropy);
  const seconds = guesses / 1e10;
  const crackTime = formatCrackTime(seconds);

  let score = 0;
  if (entropy >= 25) score = 1;
  if (entropy >= 40) score = 2;
  if (entropy >= 60) score = 3;
  if (entropy >= 80) score = 4;

  // Penalize common patterns
  if (/^[a-z]+$/i.test(password) || /^[0-9]+$/.test(password)) {
    score = Math.max(0, score - 1);
  }
  if (/(.)\1{2,}/.test(password)) {
    score = Math.max(0, score - 1);
  }
  if (password.length < 8) {
    score = Math.min(score, 1);
  }

  return { score, entropy: Math.round(entropy * 10) / 10, charsetSize, crackTime };
}

function formatCrackTime(seconds: number): string {
  if (seconds < 1) return '< 1 second';
  if (seconds < 60) return `${Math.round(seconds)} seconds`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
  if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
  if (seconds < 31536000) return `${Math.round(seconds / 86400)} days`;
  if (seconds < 31536000 * 1000) return `${Math.round(seconds / 31536000)} years`;
  if (seconds < 31536000 * 1e6) return `${Math.round(seconds / 31536000 / 1000)}K years`;
  if (seconds < 31536000 * 1e9) return `${Math.round(seconds / 31536000 / 1e6)}M years`;
  return `${(seconds / 31536000 / 1e9).toExponential(1)} billion years`;
}

// ── Hashing ──

export async function generateHash(text: string, algorithm: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  if (algorithm === 'MD5') {
    return md5(text);
  }

  const algoMap: Record<string, string> = {
    'SHA-1': 'SHA-1',
    'SHA-256': 'SHA-256',
    'SHA-512': 'SHA-512',
  };

  const hashBuffer = await crypto.subtle.digest(algoMap[algorithm], data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

// Minimal MD5 implementation
function md5(str: string): string {
  function md5cycle(x: number[], k: number[]) {
    let a = x[0], b = x[1], c = x[2], d = x[3];
    a = ff(a, b, c, d, k[0], 7, -680876936);  d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);   b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);   d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);  b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);   d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);      b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);  d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
    a = gg(a, b, c, d, k[1], 5, -165796510);   d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);  b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);   d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);  b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);  b = gg(b, c, d, a, k[12], 20, -1926607734);
    a = hh(a, b, c, d, k[5], 4, -378558);      d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);  d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);  b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);   d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);  b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);   d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);  b = hh(b, c, d, a, k[2], 23, -995338651);
    a = ii(a, b, c, d, k[0], 6, -198630844);   d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905); b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);  d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);   b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);   d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380); b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);   d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);   b = ii(b, c, d, a, k[9], 21, -343485551);
    x[0] = add32(a, x[0]); x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
  }
  function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
    a = add32(add32(a, q), add32(x, t));
    return add32((a << s) | (a >>> (32 - s)), b);
  }
  function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & c) | (~b & d), a, b, x, s, t);
  }
  function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn((b & d) | (c & ~d), a, b, x, s, t);
  }
  function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }
  function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }
  function add32(a: number, b: number) {
    return (a + b) & 0xffffffff;
  }
  function md5blk(s: string) {
    const md5blks: number[] = [];
    for (let i = 0; i < 64; i += 4) {
      md5blks[i >> 2] =
        s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) +
        (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }
  function rhex(n: number) {
    const hexChr = '0123456789abcdef';
    let s = '';
    for (let j = 0; j < 4; j++) {
      s += hexChr.charAt((n >> (j * 8 + 4)) & 0x0f) + hexChr.charAt((n >> (j * 8)) & 0x0f);
    }
    return s;
  }

  let n = str.length;
  let state = [1732584193, -271733879, -1732584194, 271733878];
  let i: number;
  for (i = 64; i <= n; i += 64) {
    md5cycle(state, md5blk(str.substring(i - 64, i)));
  }
  str = str.substring(i - 64);
  const tail = new Array(16).fill(0);
  for (i = 0; i < str.length; i++) {
    tail[i >> 2] |= str.charCodeAt(i) << ((i % 4) << 3);
  }
  tail[i >> 2] |= 0x80 << ((i % 4) << 3);
  if (i > 55) {
    md5cycle(state, tail);
    tail.fill(0);
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state.map(rhex).join('');
}

// ── JWT ──

function base64urlEncode(str: string): string {
  return btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export type JWTAlgorithm = 'HS256' | 'HS384' | 'HS512';

const ALG_HASH_MAP: Record<JWTAlgorithm, string> = {
  HS256: 'SHA-256',
  HS384: 'SHA-384',
  HS512: 'SHA-512',
};

export async function generateJWT(
  headerJson: string,
  payloadJson: string,
  secret: string,
  algorithm: JWTAlgorithm = 'HS256'
): Promise<string> {
  const header = base64urlEncode(headerJson);
  const payload = base64urlEncode(payloadJson);
  const signingInput = `${header}.${payload}`;

  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const hashName = ALG_HASH_MAP[algorithm];
  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: hashName },
    false,
    ['sign']
  );

  const signatureBuffer = await crypto.subtle.sign('HMAC', key, encoder.encode(signingInput));
  const signatureArray = Array.from(new Uint8Array(signatureBuffer));
  const signature = btoa(String.fromCharCode(...signatureArray))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  return `${signingInput}.${signature}`;
}

export function generateRandomSecret(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Token Generation ──

export function generateUUID(): string {
  return crypto.randomUUID();
}

export function generateHexToken(bytes: number): string {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function generateBase64Token(bytes: number): string {
  const array = new Uint8Array(bytes);
  crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array));
}

export function generateApiKey(): string {
  const prefix = 'sk';
  const token = generateHexToken(24);
  return `${prefix}_${token}`;
}

export function generateCSRFToken(): string {
  return generateHexToken(32);
}

export function generateSecretKey(): string {
  return generateBase64Token(32);
}
