# Daniel Desalew Portfolio

A portfolio site built with React and Vite, with an Express API backed by Neon PostgreSQL.

## Requirements

- Node.js 20 or later
- A Neon PostgreSQL project

## Local development

1. Install dependencies:

   ```sh
   cd client && npm install
   cd ../server && npm install
   ```

2. Copy `server/.env.example` to `server/.env`. Create a Neon project, then set
   `DATABASE_URL` to its pooled connection string (it must use SSL), along with
   `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD`. Generate a unique JWT
   secret with:

   ```sh
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

   Email settings are optional; without them, contact messages are saved to
   PostgreSQL without email notifications.

3. Copy `client/.env.example` to `client/.env`. The default API URL works for
   local development.

4. Start the API with `npm run dev --prefix server` and the frontend with
   `npm run dev --prefix client` in separate terminals.

The frontend runs at `http://localhost:5173`; the API runs at
`http://localhost:5000`.

## Deploy the frontend to Vercel

1. Import the repository into Vercel and set **Root Directory** to `client`.
2. Use `npm run build` as the build command and `dist` as the output directory.
3. Set `VITE_API_URL` to the deployed API base URL, including `/api`, for
   example `https://your-api.onrender.com/api`.
4. Deploy. `client/vercel.json` routes client-side pages back to the React app.

## Deploy the API to Render

1. Create a Web Service for this repository and set **Root Directory** to
   `server`.
2. Use `npm install` as the build command and `npm start` as the start command.
3. Add these environment variables in Render:

   - `NODE_ENV=production`
   - `DATABASE_URL`: your Neon PostgreSQL pooled connection string with SSL
   - `JWT_SECRET`: a unique, long random secret
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD`: the admin login credentials
   - `CLIENT_URL`: the exact Vercel site origin, such as
     `https://your-portfolio.vercel.app` (no trailing slash). Multiple allowed
     origins can be comma-separated.
   - `EMAIL_USER` and `EMAIL_PASS` (optional): Gmail address and app password
     for contact-message notifications

4. After the API deploys, set Vercel's `VITE_API_URL` to the Render API URL
   ending in `/api`, then redeploy the frontend.
5. Verify the API is healthy at `https://your-api.onrender.com/api/health`.

The API creates its tables on startup. The seed command replaces all projects,
skills, and profile data, so do not run `npm run seed` against a production
database. Contact messages are preserved by the seed command. Manage production
portfolio content through the admin interface instead.

Switching from MongoDB does not transfer existing data. Export and migrate any
MongoDB records you need before deploying with the Neon connection string.
