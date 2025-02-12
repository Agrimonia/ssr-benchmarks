import { createSSRApp } from 'vue';
import { renderToString } from 'vue/server-renderer';
import { writeFileSync } from 'fs';
import nodeStdev from 'node-stdev';

import App from './components/App.vue';

const methodName = "vue3-ssr";

const createApp = () => createSSRApp(App);

const warmUpV8 = async () => {
  console.info("Warming up...");

  for (let i = 0; i < 20; i += 1) {
    await renderToString(createApp());
  }

  console.info("Finished warming up!");
};

const benchmark = async () => {
  let time = [];

  for (let i = 0; i < 30; i += 1) {
    const start = process.hrtime();

    // this renders around 64472 divs
    const markup = await renderToString(createApp());

    time.push(process.hrtime(start));

    writeFileSync("./dist/test.html", markup);
  }

  console.info("================ RESULT ================");
  const durations = time.map(t => (t[0] + t[1] / 1e9) * 1e3);

  durations.forEach((d, i) => {
    console.info(`Run ${i} took `, d, "ms");
  });

  console.info("================ SUMMARY ================");
  console.info(`[${methodName}]`);
  console.info(
    "Average is:",
    durations.reduce((a, b) => a + b) / durations.length,
    "ms"
  );
  console.info("Stdev is:", nodeStdev.population(durations), "ms");

  writeFileSync(
    "./dist/result.json",
    JSON.stringify({
      name: methodName,
      average: durations.reduce((a, b) => a + b) / durations.length,
      stdev: nodeStdev.population(durations)
    })
  );
};

(async () => {
  await warmUpV8();
  await benchmark();
})();
