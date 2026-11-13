# Chat Microfrontend POC

A small Next.js App Router host that consumes a reusable chat widget package from an npm-workspaces monorepo. Conversations are loaded from local JSON. Sending a message updates client-side state only; no API or database is connected.

## Structure

```text
chat-microfrontend-poc/
├── apps/
│   └── web/                 # Next.js host application
│       ├── app/
│       └── next.config.ts
├── packages/
│   └── chat-widget/         # Reusable chat microfrontend package
│       ├── data/conversations.json
│       └── src/
├── amplify.yml
└── package.json
```

## Run locally

Requires Node.js 20.9+ (recommended: Node 22) and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build locally

```bash
npm run build
npm run start
```

## Deploy to AWS Amplify

1. Push this repository to GitHub, GitLab, Bitbucket, or another supported Git provider.
2. In AWS Amplify, choose **New app → Host web app** and connect the repository.
3. Set the monorepo app root to `apps/web` if prompted. Keep `amplify.yml` at the repository root.
4. Confirm the build configuration uses the included `amplify.yml` and deploy the `main` branch.
5. Amplify will build the host app and publish the Next.js output.

If Amplify's build UI asks for a build command, use the repository-root `amplify.yml` rather than running `npm install` from `apps/web`; the widget package is a workspace dependency.

## Microfrontend integration options

This POC uses a **package-based microfrontend**: the host imports `ChatWidget` from `@poc/chat-widget`. This gives the UI its own package boundary and lets it be reused by another React/Next.js host in the same monorepo.

For a separately deployed runtime microfrontend, the next step would be to publish the widget as a versioned package or deploy it as a standalone app and embed it through an iframe/custom-element contract. This POC intentionally avoids that extra infrastructure.

## Current limitations

- JSON is static seed data; changes are held in browser memory and reset on refresh.
- Sending a message appends it to the selected conversation; it does not call an agent or backend.
- Authentication, authorization, file uploads, streaming, persistence, and real-time updates are not included.
