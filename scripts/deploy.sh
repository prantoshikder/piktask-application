#!/usr/bin/env bash
#
# Deploys the Next.js build to the piktask droplet.
#
# IMPORTANT: this is not a drop-in replacement for the old CRA deploy. The CRA
# build was a folder of static files that nginx could serve directly; this app
# server-renders, so the droplet must run a Node process and nginx must reverse
# proxy to it.
#
# On the server, once:
#   - install Node 20+
#   - install a process manager, e.g. `npm i -g pm2`
#   - point the nginx server block for piktask.com at http://127.0.0.1:3000
#
set -euo pipefail

HOST="${DEPLOY_HOST:-root@174.138.30.55}"
DEST="${DEPLOY_PATH:-/var/www/piktask}"

if [ ! -d .next/standalone ]; then
  echo "error: .next/standalone missing - run 'next build' first (output: 'standalone')." >&2
  exit 1
fi

echo "==> shipping standalone server to ${HOST}:${DEST}"

# The standalone output does not include static assets or public/; they must be
# copied alongside it.
rsync -az --delete .next/standalone/ "${HOST}:${DEST}/"
rsync -az --delete .next/static/     "${HOST}:${DEST}/.next/static/"
rsync -az --delete public/           "${HOST}:${DEST}/public/"

echo "==> restarting app"
ssh "${HOST}" "cd ${DEST} && pm2 restart piktask || pm2 start server.js --name piktask"

echo "==> done"
