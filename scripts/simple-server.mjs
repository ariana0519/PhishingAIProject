#!/usr/bin/env node
/**
 * Simple server for phishing sim + dashboard. No Vite, no Base44.
 * Serves public/ and proxies /backend to localhost:8080.
 * Run: node scripts/simple-server.mjs
 * Then open: http://localhost:5173/phishing-sim.html
 */
import http from 'http';
import { createReadStream } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const ROOT = join(__dirname, '..', 'public');
const PORT = 5173;
const BACKEND = 'http://localhost:8080';

const MIMES = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.png': 'image/png', '.ico': 'image/x-icon', '.svg': 'image/svg+xml' };

function streamBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  if (req.url?.startsWith('/backend')) {
    const path = req.url.replace(/^\/backend/, '');
    const body = req.method !== 'GET' && req.method !== 'HEAD' ? await streamBody(req) : undefined;
    const proxy = await fetch(BACKEND + path, {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: body && body.length ? body.toString() : undefined,
    });
    const text = await proxy.text();
    res.writeHead(proxy.status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
    res.end(text);
    return;
  }
  let file = req.url === '/' ? 'phishing-sim.html' : req.url.split('?')[0].replace(/^\//, '');
  const full = join(ROOT, file || 'phishing-sim.html');
  createReadStream(full)
    .on('error', () => {
      res.writeHead(404);
      res.end('Not found');
    })
    .on('open', () => {
      const mime = MIMES[extname(file)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': mime });
    })
    .pipe(res);
});

server.listen(PORT, () => {
  console.log('');
  console.log('  PhishShield sim server running');
  console.log('  http://localhost:' + PORT + '/phishing-sim.html');
  console.log('  http://localhost:' + PORT + '/dashboard.html');
  console.log('  http://localhost:' + PORT + '/wireframes.html');
  console.log('  http://localhost:' + PORT + '/test-events.html');
  console.log('');
  console.log('  Backend must be running on port 8080.');
  console.log('');
});
