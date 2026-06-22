#!/usr/bin/env node

import { homedir } from "node:os";

const DIRECT_TOOLS = ["Edit", "Write", "MultiEdit"];

const COMMAND_PATTERNS = [
  "*>{target}*",
  "*> {target}*",
  "*>>{target}*",
  "*>> {target}*",
  "*>|{target}*",
  "*>| {target}*",
  "*tee *{target}*",
  "*sed *-i*{target}*",
  "*perl *-pi*{target}*",
  "*ruby *-pi*{target}*",
  "*cp *{target}*",
  "*mv *{target}*",
  "*install *{target}*",
  "*rsync *{target}*",
  "*dd *of={target}*",
  "*truncate *{target}*",
  "*touch *{target}*",
  "*chmod *{target}*",
  "*chown *{target}*",
  "*jq *{target}*",
  "*node *{target}*",
  "*npm *{target}*",
  "*npx *{target}*",
  "*pnpm *{target}*",
  "*yarn *{target}*",
  "*bun *{target}*",
  "*deno *{target}*",
  "*python *{target}*",
  "*python3 *{target}*",
  "*ruby *{target}*",
  "*perl *{target}*",
  "*php *{target}*",
  "*sh *{target}*",
  "*bash *{target}*",
  "*zsh *{target}*",
  "*fish *{target}*",
  "*ed *{target}*",
  "*ex *{target}*",
  "*vi *{target}*",
  "*vim *{target}*",
  "*nano *{target}*",
];

const USAGE = `Usage:
  node scripts/generate-agent-permission-denies.mjs [options]

Options:
  --preset <name>     claude-settings, claude-user-settings, claude-project-settings, none
                      Default: claude-settings
  --target <glob>     Add a protected path glob. May be repeated.
  --home <path>       Absolute home path for default user-setting targets.
                      Default: current OS home directory
  --format <format>   object, array. Default: object
  --compact           Print compact JSON.
  --help              Show this help.

Examples:
  node scripts/generate-agent-permission-denies.mjs --preset claude-user-settings
  node scripts/generate-agent-permission-denies.mjs --preset none --target '~/.claude/settings*'
`;

function parseArgs(argv) {
  const options = {
    preset: "claude-settings",
    targets: [],
    home: homedir(),
    format: "object",
    compact: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === "--help" || arg === "-h") {
      process.stdout.write(USAGE);
      process.exit(0);
    }

    if (arg === "--compact") {
      options.compact = true;
      continue;
    }

    if (arg === "--preset" || arg === "--target" || arg === "--home" || arg === "--format") {
      const value = argv[i + 1];
      if (!value) {
        throw new Error(`${arg} requires a value`);
      }
      i += 1;

      if (arg === "--preset") options.preset = value;
      if (arg === "--target") options.targets.push(value);
      if (arg === "--home") options.home = value.replace(/\/+$/, "");
      if (arg === "--format") options.format = value;
      continue;
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  if (!["claude-settings", "claude-user-settings", "claude-project-settings", "none"].includes(options.preset)) {
    throw new Error(`Unsupported preset: ${options.preset}`);
  }

  if (!["object", "array"].includes(options.format)) {
    throw new Error(`Unsupported format: ${options.format}`);
  }

  return options;
}

function presetTargets(preset, home) {
  const userTargets = [
    "~/.claude/settings*",
    "$HOME/.claude/settings*",
    "${HOME}/.claude/settings*",
    `${home}/.claude/settings*`,
  ];

  const projectTargets = [
    ".claude/settings*",
    "./.claude/settings*",
  ];

  if (preset === "claude-user-settings") return userTargets;
  if (preset === "claude-project-settings") return projectTargets;
  if (preset === "claude-settings") return [...userTargets, ...projectTargets];
  return [];
}

function unique(items) {
  return [...new Set(items)];
}

function generateDenyEntries(targets) {
  const entries = [];

  for (const target of targets) {
    const commandTarget = target.replace(/\*+$/, "");

    for (const tool of DIRECT_TOOLS) {
      entries.push(`${tool}(${target})`);
    }

    for (const pattern of COMMAND_PATTERNS) {
      entries.push(`Bash(${pattern.replaceAll("{target}", commandTarget)})`);
    }
  }

  return unique(entries);
}

try {
  const options = parseArgs(process.argv.slice(2));
  const targets = unique([...presetTargets(options.preset, options.home), ...options.targets]);
  const deny = generateDenyEntries(targets);
  const output = options.format === "array" ? deny : { permissions: { deny } };
  process.stdout.write(JSON.stringify(output, null, options.compact ? 0 : 2));
  process.stdout.write("\n");
} catch (error) {
  process.stderr.write(`${error.message}\n\n${USAGE}`);
  process.exit(1);
}
