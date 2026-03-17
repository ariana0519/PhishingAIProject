#!/usr/bin/env node
/**
 * Exports routeSearch flowcharts to PNG using mermaid-cli.
 * Run: node scripts/export-flowcharts-png.mjs
 * Requires: npx @mermaid-js/mermaid-cli (downloads automatically)
 */
import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const docs = join(root, 'docs');
const figures = join(root, 'figures');

const charts = [
  { src: 'routeSearch-main.mmd', out: 'routeSearch-main.png' },
  { src: 'routeSearch-mapping.mmd', out: 'routeSearch-mapping.png' }
];

async function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: 'inherit', shell: true });
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`Exit ${code}`))));
  });
}

async function main() {
  console.log('Exporting flowcharts to PNG via mermaid-cli...\n');
  for (const { src, out } of charts) {
    const inp = join(docs, src);
    const outPath = join(figures, out);
    console.log(`  ${src} -> ${out}`);
    await run('npx', ['@mermaid-js/mermaid-cli', '-i', inp, '-o', outPath, '-b', 'white', '-s', '2']);
  }
  console.log('\nDone. PNGs saved to figures/');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
