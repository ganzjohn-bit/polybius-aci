## Getting Started

Run `bin/setup` to install packages and create a `.env.local`.

Then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

You can then access the app pages:
- [http://localhost:3000](http://localhost:3000) will take you the app page where you can run queries.
- [http://localhost:3000/results](http://localhost:3000/results) will take you to the view for published results.

## Running Queries

By default, research queries are stubbed, to spare the dev the time and costs of making queries to the Claude API.

If you want to run real queries, either edit the `LIVE_REQUESTS` variable in `.env.local` to `true`, or run the dev server like so:

```
LIVE_REQUESTS=true npm run dev
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
