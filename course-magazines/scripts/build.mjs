import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const siteRoot = resolve(projectRoot, "..");
const courses = {
  myofascial: {
    entry: resolve(projectRoot, "src/courses/myofascial/main.tsx"),
    outdir: resolve(siteRoot, "myofascial-magazine"),
    title: "肌膜覺察與動作探索｜喬馨身體空間",
    description: "從肌膜的連續性出發，探索力量、動作與整體身體回應。",
  },
};

const requested = process.argv[2];
const selected = requested ? [[requested, courses[requested]]] : Object.entries(courses);
if (selected.some(([, course]) => !course)) throw new Error(`Unknown course magazine: ${requested}`);

for (const [name, course] of selected) {
  const assetsDir = resolve(course.outdir, "assets");
  await rm(assetsDir, { recursive: true, force: true });
  await mkdir(assetsDir, { recursive: true });
  let css = "";
  const bundle = await rollup({
    input: course.entry,
    plugins: [
      replace({ preventAssignment: true, "process.env.NODE_ENV": JSON.stringify("production") }),
      {
        name: "course-magazine-css",
        async load(id) {
          if (!id.endsWith(".css")) return null;
          css += `${await readFile(id, "utf8")}\n`;
          return "export default undefined;";
        },
      },
      nodeResolve({ browser: true }),
      commonjs(),
      typescript({ jsx: "react-jsx", target: "ES2022", module: "ESNext", sourceMap: true }),
    ],
    onwarn(warning, warn) {
      if (warning.code !== "MODULE_LEVEL_DIRECTIVE") warn(warning);
    },
  });
  await bundle.write({ file: resolve(assetsDir, "index.js"), format: "es", sourcemap: true });
  await bundle.close();
  await writeFile(resolve(assetsDir, "index.css"), css);
  await writeFile(resolve(course.outdir, "index.html"), `<!doctype html>\n<html lang="zh-Hant">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>${course.title}</title>\n    <meta name="description" content="${course.description}" />\n    <script type="module" src="./assets/index.js"></script>\n    <link rel="stylesheet" href="./assets/index.css" />\n  </head>\n  <body>\n    <div id="root"></div>\n  </body>\n</html>\n`);
  console.log(`Built ${name} -> ${course.outdir}`);
}
