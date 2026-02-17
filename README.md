## Getting Started

Run `bin/setup` to install packages and create a `.env.local`.

Then run the development server:

```bash
npm run dev
```

You can then access the app pages:
- [http://localhost:3000](http://localhost:3000) will take you the app page where you can run queries.
- [http://localhost:3000/results](http://localhost:3000/results) will take you to the view for published results.

## Authentication

A GitHub account is required for login, which is needed to access certain features, even in development and preview environments.

On production, there is an additional requirement of explicitly allowlisting emails permitted for login via environment variable:

```
AUTH_ALLOWED_EMAILS="jurgen@example.com,hannah@example.com"
```

## Running Queries

By default, LLM-powered research queries are stubbed, to spare the dev the time and costs of making queries to the Claude API.

If you want to run real queries, either edit the `LIVE_REQUESTS` variable in `.env.local` to `true`, or run the dev server like so:

```
LIVE_REQUESTS=true npm run dev
```
