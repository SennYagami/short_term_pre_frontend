# Short-Term Crypto Signal Engine — Frontend

A high-end product landing page built with Next.js. It communicates the system's 30-second prediction capability, professional signal stack, and skill installation flow.

## Tech Stack
- Next.js (App Router)
- React 18
- TypeScript

## Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`.

## Build

```bash
npm run build
npm run start
```

## Railway Deploy

1. Set the **service root** to `/workspace/frontend`.
2. Build command:

```bash
npm install && npm run build
```

3. Start command:

```bash
npm run start
```

4. Railway provides `PORT` automatically; Next.js uses it by default.

## Notes
- This frontend is static-only and does not call the backend directly.
- The backend API base URL is referenced inside the product copy for installation guidance.
