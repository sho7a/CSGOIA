import path from "path";
import fs from "fs";
import { Compiler } from "webpack";

export default class Plugin {
  apply(compiler: Compiler) {
    compiler.hooks.done.tap("Plugin", () => {
      const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), "manifest.json"), "utf-8"));
      manifest.version = process.env.npm_package_version;
      fs.writeFileSync(path.join(process.cwd(), "build", "manifest.json"), JSON.stringify(manifest));
    });
  }
}