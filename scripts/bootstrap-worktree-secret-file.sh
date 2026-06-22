#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<'USAGE'
Usage:
  bootstrap-worktree-secret-file.sh --source PATH [--dest RELPATH] [--force] [--dry-run]

Copies a secret-bearing local file into the current Git worktree without
printing its contents.

Defaults:
  --dest .env.local
  --mode 600

Safety rules:
  - Must run inside a Git worktree.
  - Destination must be a relative path inside the current worktree.
  - Destination must be ignored by Git.
  - Destination must not be tracked.
  - Destination is not overwritten unless --force is passed.
  - Source must be a non-empty regular file.

Examples:
  scripts/bootstrap-worktree-secret-file.sh --source /path/to/main/.env.local
  scripts/bootstrap-worktree-secret-file.sh --source /path/to/main/.env.local --dest .env.local --force
USAGE
}

source_path=""
dest_rel=".env.local"
mode="600"
force=0
dry_run=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --source)
      source_path="${2:-}"
      if [[ -z "$source_path" ]]; then
        echo "error: --source requires a path" >&2
        exit 2
      fi
      shift 2
      ;;
    --dest)
      dest_rel="${2:-}"
      if [[ -z "$dest_rel" ]]; then
        echo "error: --dest requires a relative path" >&2
        exit 2
      fi
      shift 2
      ;;
    --mode)
      mode="${2:-}"
      if [[ ! "$mode" =~ ^[0-7]{3,4}$ ]]; then
        echo "error: --mode must be an octal mode such as 600" >&2
        exit 2
      fi
      shift 2
      ;;
    --force)
      force=1
      shift
      ;;
    --dry-run)
      dry_run=1
      shift
      ;;
    --help|-h)
      usage
      exit 0
      ;;
    *)
      echo "error: unknown argument: $1" >&2
      usage >&2
      exit 2
      ;;
  esac
done

if [[ -z "$source_path" ]]; then
  echo "error: --source is required" >&2
  usage >&2
  exit 2
fi

repo_root="$(git rev-parse --show-toplevel 2>/dev/null || true)"
if [[ -z "$repo_root" ]]; then
  echo "error: must run inside a Git worktree" >&2
  exit 1
fi

case "$dest_rel" in
  /*)
    echo "error: --dest must be relative to the current worktree" >&2
    exit 1
    ;;
  *..*)
    echo "error: --dest must not contain '..'" >&2
    exit 1
    ;;
esac

dest_rel="${dest_rel#./}"
dest_abs="$repo_root/$dest_rel"
dest_dir="$(dirname "$dest_abs")"

if [[ ! -f "$source_path" ]]; then
  echo "error: source is not a regular file: $source_path" >&2
  exit 1
fi

if [[ ! -s "$source_path" ]]; then
  echo "error: source is empty; refusing to propagate an empty secret file" >&2
  exit 1
fi

source_dir="$(cd "$(dirname "$source_path")" && pwd -P)"
source_base="$(basename "$source_path")"
source_abs="$source_dir/$source_base"

if [[ -e "$dest_abs" ]]; then
  dest_dir_real="$(cd "$dest_dir" && pwd -P)"
  dest_abs_real="$dest_dir_real/$(basename "$dest_abs")"

  if [[ "$source_abs" == "$dest_abs_real" || "$source_abs" -ef "$dest_abs" ]]; then
    echo "error: source and destination are the same file" >&2
    exit 1
  fi
fi

if git -C "$repo_root" ls-files --error-unmatch -- "$dest_rel" >/dev/null 2>&1; then
  echo "error: destination is tracked by Git: $dest_rel" >&2
  exit 1
fi

if ! git -C "$repo_root" check-ignore -q -- "$dest_rel"; then
  echo "error: destination is not ignored by Git: $dest_rel" >&2
  echo "add an ignore rule before bootstrapping local secrets" >&2
  exit 1
fi

if [[ -e "$dest_abs" && "$force" -ne 1 ]]; then
  echo "error: destination already exists: $dest_rel" >&2
  echo "rerun with --force to replace it" >&2
  exit 1
fi

mkdir -p "$dest_dir"

if [[ "$dry_run" -eq 1 ]]; then
  echo "dry-run: would install secret-bearing file to $dest_rel"
  echo "dry-run: contents were not displayed"
  exit 0
fi

tmp_path="$(mktemp "$dest_abs.tmp.XXXXXX")"
cleanup() {
  rm -f "$tmp_path"
}
trap cleanup EXIT

cp "$source_abs" "$tmp_path"
chmod "$mode" "$tmp_path"
mv "$tmp_path" "$dest_abs"
trap - EXIT

if ! git -C "$repo_root" check-ignore -q -- "$dest_rel"; then
  echo "error: destination lost ignored status after write: $dest_rel" >&2
  exit 1
fi

echo "installed secret-bearing file to $dest_rel"
echo "contents were not displayed"
