#!/usr/bin/env bash
# install.sh — symlink commands and templates into ~/.claude/
#
# Run once after cloning. Re-run after adding new commands or stacks.
# Updates existing symlinks in place; skips files it didn't create.

set -euo pipefail

REPO="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CLAUDE="$HOME/.claude"

green()  { printf '\033[0;32m%s\033[0m\n' "$*"; }
yellow() { printf '\033[0;33m%s\033[0m\n' "$*"; }
bold()   { printf '\033[1m%s\033[0m\n' "$*"; }

bold "Installing project-standards into $CLAUDE"
echo ""

mkdir -p "$CLAUDE/commands" "$CLAUDE/templates"

link() {
  local src="$1" dst="$2" label="$3"
  if [ -L "$dst" ]; then
    rm "$dst" && ln -s "$src" "$dst"
    green "  updated  $label"
  elif [ -e "$dst" ]; then
    yellow "  skipped  $label  (exists, not a symlink — manage manually)"
  else
    ln -s "$src" "$dst"
    green "  linked   $label"
  fi
}

# Commands — symlink each .md file individually so project-specific commands coexist
echo "Commands:"
for src in "$REPO/commands/"*.md; do
  [ -f "$src" ] || continue
  name="$(basename "$src")"
  link "$src" "$CLAUDE/commands/$name" "$name"
done

echo ""

# Templates — symlink each stack directory individually so other stacks can coexist
echo "Templates:"
for src in "$REPO/templates/"/*/; do
  [ -d "$src" ] || continue
  name="$(basename "$src")"
  link "$src" "$CLAUDE/templates/$name" "$name/"
done

echo ""
bold "Done."
echo "  To update later: cd $(basename "$REPO") && git pull && ./install.sh"
