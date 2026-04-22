#!/usr/bin/env node
/**
 * swagger-jsdoc declara glob@7; con override npm a veces deja node_modules/swagger-jsdoc/node_modules/glob
 * y `require('glob')` desde ahí no expone globSync (API v13). Borramos el anidado para forzar el glob raíz.
 */
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const root = path.join(__dirname, "..");
const nestedGlob = path.join(
  root,
  "node_modules",
  "swagger-jsdoc",
  "node_modules",
  "glob"
);

try {
  fs.rmSync(nestedGlob, { recursive: true, force: true });
} catch {
  /* ignore */
}

execSync("npx patch-package", { stdio: "inherit", cwd: root });
