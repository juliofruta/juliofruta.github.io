# juliofruta.github.io

Landing page for **Julio** 🍉, with an email waitlist.

| Env  | Trigger            | URL                                   | Emails go to             |
|------|--------------------|---------------------------------------|--------------------------|
| prod | push to `master`   | https://juliofruta.pages.dev (+ https://juliofruta.github.io) | `juliofruta-emails-prod` |
| dev  | push to `dev`      | https://dev.juliofruta.pages.dev      | `juliofruta-emails-dev`  |
| PR   | pull request #N    | https://pr-N.juliofruta.pages.dev     | `juliofruta-emails-dev`  |

- `index.html`: the landing page. `resume.html`: the resume.
- `functions/api/subscribe.js`: Cloudflare Pages Function that saves emails to D1.
- `migrations/`: D1 schema, applied by CI.
- `.github/workflows/deploy.yml`: deploys every env. Needs the `CLOUDFLARE_API_TOKEN` repo secret.

## Local

```sh
./scripts/build.sh
npx wrangler d1 migrations apply juliofruta-emails-dev --local
npx wrangler pages dev
```

## See the emails

```sh
./scripts/emails.sh prod   # or: dev
```
