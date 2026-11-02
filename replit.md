# Running this project

This imported project uses Node.js 20, Express, and a single HTML client. Keep its existing stack and structure.

- Click Run to start the `Start application` workflow.
- The workflow runs `PORT=5000 npm start`; Express serves the client and `/api/*` Discord proxy on the same origin.
- For a manual start, use `PORT=5000 npm start`. Without `PORT`, the server defaults to 3000.
- Dependencies are tracked in `package.json` and `package-lock.json`.

## Authentication and limitations

No server-side secrets or database are required to start the app. `SESSION_SECRET` is not used by this project.

Discord requests require a valid token entered in the client. Prefer a dedicated bot token with only the permissions needed. Never paste tokens into chat, source files, or logs. The imported client saves tokens in browser local storage; Disconnect removes the saved token. Personal user tokens violate Discord's terms, as the client warns.

The login page and unauthenticated proxy behavior can be verified without credentials. Authenticated Discord operations require separate verification with an authorized bot. The imported attachment uploader is incomplete: it sends multipart data to `/api/upload`, but the server has no dedicated Discord upload implementation.

Only the HTML client is served publicly; the project directory is not exposed as static content.
