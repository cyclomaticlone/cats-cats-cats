# Cats Cats Cats

Fullstack demo project with a back-end that fetches from 3rd party API (thecatapi.com) and a front-end in React.

## Requirements

- Node v18 - We use the global Fetch API in the back-end API routes, which isn't in earlier versions of Node.

## Secrets

Some queries on thecatapi.com require an API key. This is configured in .env.local. A sample is provided in `.env.sample`.

## Tech Choices

### Next.js

Next.js is one of the most popular React-based frameworks today. Key reasons it was selected for this project:

- Serverless API functions let us build our API easily (And if we outgrow it it's easy enough to migrate to a Node-express based solution)
- File-system based routing makes it easy and predictable to find source files that correspond to a page route in the app (No more configuring react-router!)
- Easy deployment on Vercel
- First-class TypeScript support
- It's compiler is extremely fast, allowing for a good deceloper experience when developing.

Some features not currently used in the app, but may be useful in the future:

- Image Optimization
- Authentication
- Nested Layouts (new in Next 13)
- Next has first-class support for SSR (server side rendering) and SSG (static site generation)

### Tailwind CSS

Tailwind's utility-first approach lets us style our UI in a fast and maintainable way, while its theming functionality allows for design customisation and consistency.

### React-Query

React-Query is a best-in-class library that helps us fetch data. It provides easy-to-use abstractions for getting the data, loading state, and any potential errors from API calls, while having a powerful, customiserable cache. There is also a browser Devtools extension to help with debugging as the app gets more complex.

### Downshift

Downshift is a headless component that gives us abstractions to build an flexible, accessible (WAI-ARIA compliant) dropdown component, while allowing us the folly customise the UI.

## API Routes

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/cat/random](http://localhost:3000/api/cat/random). This endpoint can be edited in `pages/api/cat/random.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

### Available routes

GET `api/cat/random` - Gets a random cat from thecatapi.com

GET `api/cat/breeds` - Gets the list of cat breeds from thecatapi.com

GET `api/cat/breeds/:breed_id` - Gets 6 cats of breed: `breed_id` from thecatapi.com

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the site.
