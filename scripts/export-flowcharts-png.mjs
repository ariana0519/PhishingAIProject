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
  { src: 'routeSearch-mapping.mmd', out: 'routeSearch-mapping.png' },
  { src: 'methodology-iid-cycle.mmd', out: 'fig_3_1_iid_cycle.png' },
  { src: 'methodology-increments.mmd', out: 'fig_3_2_increments.png' },
  { src: 'methodology-selection.mmd', out: 'fig_3_3_methodology_selection.png' },
  { src: 'black-box-testing.mmd', out: 'fig_6_1_black_box_testing.png' },
  { src: 'ch6-fig-6-2-network-validation.mmd', out: 'fig_6_2_network_validation.png' },

  { src: 'ch5-fig-5-1-implementation-flow.mmd', out: 'fig_5_1_implementation_flow.png' },
  { src: 'ch5-fig-5-2-project-structure.mmd', out: 'fig_5_2_project_structure.png' },

  { src: 'design-requirements-template.mmd', out: 'fig_4_4_requirements_template.png' },
  { src: 'design-requirements-template-adjusted.mmd', out: 'fig_4_5_requirements_template_adjusted.png' },
  { src: 'design-fr-example.mmd', out: 'fig_4_6_fr_example.png' },
  { src: 'design-nfr-example.mmd', out: 'fig_4_7_nfr_example.png' },
  { src: 'design-uml-class-diagram.mmd', out: 'fig_4_8_class_diagram.png' },
  { src: 'design-erd.mmd', out: 'fig_4_9_erd.png' },

  { src: 'table-2-1-requirements.mmd', out: 'table_2_1_requirements.png', width: 1500, height: 330, scale: 2 },

  { src: 'ch2-fig-2-1-behaviour-capture.mmd', out: 'fig_2_1_behaviour_capture.png' },
  { src: 'ch2-fig-2-2-attack-flow.mmd', out: 'fig_2_2_attack_flow.png' },
  { src: 'ch2-fig-2-3-accuracy-vs-efficiency.mmd', out: 'fig_2_3_accuracy_efficiency.png' },
  { src: 'ch2-fig-2-4-research-gaps.mmd', out: 'fig_2_4_research_gaps.png' },
  { src: 'ch2-fig-2-5-preload-model.mmd', out: 'fig_2_5_preload_model.png' },
  { src: 'ch2-fig-2-6-static-vs-behavioural.mmd', out: 'fig_2_6_static_vs_behavioural.png' },
  { src: 'ch2-fig-2-7-behavioural-studies-map.mmd', out: 'fig_2_7_behavioural_studies.png' },
  { src: 'ch2-fig-2-8-detection-methods.mmd', out: 'fig_2_8_detection_methods.png' },
  { src: 'ch2-fig-2-9-detection-timing.mmd', out: 'fig_2_9_detection_timing.png' },
  { src: 'ch2-fig-2-10-emerging-trends.mmd', out: 'fig_2_10_emerging_trends.png' }
];

async function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: 'inherit', shell: true });
    proc.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`Exit ${code}`))));
  });
}

async function main() {
  console.log('Exporting flowcharts to PNG via mermaid-cli...\n');
  for (const { src, out, width, height, scale } of charts) {
    const inp = join(docs, src);
    const outPath = join(figures, out);
    console.log(`  ${src} -> ${out}`);
    const args = ['@mermaid-js/mermaid-cli', '-i', inp, '-o', outPath, '-b', 'white', '-s', String(scale ?? 2)];
    if (width) args.push('-w', String(width));
    if (height) args.push('-H', String(height));
    await run('npx', args);
  }
  console.log('\nDone. PNGs saved to figures/');
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
