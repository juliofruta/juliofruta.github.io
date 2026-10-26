#!/bin/sh
# Lists saved emails. Usage: scripts/emails.sh [prod|dev]   (default: prod)
set -e
case "${1:-prod}" in
  prod) DB=juliofruta-emails-prod ;;
  dev)  DB=juliofruta-emails-dev ;;
  *) echo "usage: $0 [prod|dev]" >&2; exit 1 ;;
esac
npx wrangler d1 execute "$DB" --remote \
  --command "SELECT email, source, country, created_at FROM subscribers ORDER BY created_at DESC"
