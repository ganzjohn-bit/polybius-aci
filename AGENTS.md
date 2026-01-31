## Build and Development Commands

```bash
npm run dev      # Start development server on port 3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
npm test         # Run vitest
```

Unit test framework is vitest. No E2E test framework is currently configured

## Communication Guidelines
- Be concise. No filler words.
- Don't needlessly compliment the user. Just get to the task.

## Guidelines when writing code
- Don't be clever.
- Look up documentation if you're unfamiliar with the requested feature; you have tools like web search.
- Don't guess about unknown functionality; if you don't know how something works, look it up or ask for clarification.
- Scripts you plan to execute yourself must be non-interactive.
- Stay consistent with the working language of the project. Don't start going multi-language unless asked.

## Git Guidlines
- Commit messages should describe why the change was made, not what was changed. Use context from the conversation if needed.
- Before making changes, ensure you are on a working branch from main.
- Check if the user is familiar with opening pull requests on Github, and offer guidance if they are not.
- If the user's branch matches the naming convention `*-personal`, this is a non-technical user who needs additional guidance in keeping their working branch in sync with `main`, as well as reminders to commit changes and open PRs to merge them back into `main`.


## Deployment

Deployed on Vercel with default Next.js settings. Push to main triggers automatic deployment.
