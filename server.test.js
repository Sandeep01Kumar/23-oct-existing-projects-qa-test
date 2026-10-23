const { test, after } = require('node:test');
const assert = require('node:assert/strict');

require('./server.js');

const SERVER_URL = 'http://127.0.0.1:3000';
const EXPECTED_BODY = 'Hello, World!\n';

// Case 1: a GET to "/" returns status 200 and the exact body.
test('GET / returns status 200 and the exact body', async () => {
  const res = await fetch(`${SERVER_URL}/`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(await res.text(), EXPECTED_BODY);
});

// Case 2: a POST to an unmatched path returns the same status and body.
test('POST to an unmatched path returns the same status and body', async () => {
  const res = await fetch(`${SERVER_URL}/no-such-route`, { method: 'POST' });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(await res.text(), EXPECTED_BODY);
});

// server.js exports nothing, so the socket cannot be closed: end the run after the results are reported.
after(async () => {
  await new Promise((resolve) => setImmediate(resolve));
  process.exit(0);
});
