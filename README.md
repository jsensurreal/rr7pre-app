# Welcome to React Router!

This is a template for React Router v7 pre-release.

- 📖 [React Router docs](https://reactrouter.com/dev)

## Development

Run the dev server:

```shellscript
npm run dev
```

## Deployment

First, build your app for production:

```sh
npm run build
```

Then run the app in production mode:

```sh
npm start
```

Now you'll need to pick a host to deploy it to.

### DIY

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

- `build/server`
- `build/client`

## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

## UI Components

This template also comes with [ShadCN UI](https://ui.shadcn.com/) already configured. See website for a list of available components and instructions on how to install them.

## Routes

Routes are configured using React Router 7's new route config (https://reactrouter.com/dev/guides/start/routing) within /app/routes.ts.

### Sample route

See users.tsx for an example of a loader(GET)/action(POST) route for searching users.

URL path is http://localhost:5173/users

URL search uses the search= param, http://localhost:5173/users?search=art

## Database

A SQLite database (dev.db) is configured for data persistence. See /app/services/sqliteService.ts.