# Get Started with Neon

Neon is a serverless PostgreSQL platform that gives you a free tier, automatic scaling, and built‑in connection pooling. Follow the steps below to provision a Neon database and connect it to this project's email logging backend.

## 1. Create a Neon project

1. Go to [https://console.neon.tech](https://console.neon.tech) and sign up (GitHub, Google, or email).
2. Click **Create project**.
3. Choose a region close to your app/users.
4. Give the database a name (e.g., `proto-email`) and keep the default branch (`main`).
5. Click **Create project**. Neon automatically provisions:
   - A **database** (default name: `neondb`)
   - A **database user** (default: `neondb_owner`)
   - A **password** (shown once—download the `.txt` file or copy it)
   - A **host** endpoint for the branch (e.g., `ep-grand-meme-123456.ap-southeast-1.aws.neon.tech`)

## 2. Grab the connection string

On the project dashboard:

1. Click **Connect** → **Connection string** → **psql / General**.
2. Copy the URI; it looks like:
   ```
   postgresql://neondb_owner:YOUR_PASSWORD@ep-grand-meme-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
3. Keep `sslmode=require` (Neon insists on TLS; don’t remove it).

## 3. Configure the backend

1. In the repo root, copy the sample env file if you haven’t already:
   ```bash
   cd server
   cp .env.example .env   # only if .env doesn’t exist
   ```
2. Edit `server/.env`:
   ```env
   DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@ep-grand-meme-123456.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   PGSSLMODE=require
   ```
   - Do **not** set `PGSSLMODE=disable`. The `server/db.js` helper automatically enables TLS when `PGSSLMODE` is anything other than `disable`.
3. Keep your SMTP settings unchanged; only the DB variables are new.

## 4. Verify the connection

1. From `server/`, install dependencies and start the API:
   ```bash
   npm install
   npm run dev
   ```
2. On startup you should see:
   - `✅ Connected to PostgreSQL`
   - `🗄️  email_logs table is ready`
3. If you don’t see those messages:
   - Re-check the password (Neon passwords often include special characters; keep them URL‑encoded if necessary).
   - Make sure your firewall/VPN allows outbound connections.
   - Confirm the branch host matches the one in the connection string (`Connect` modal shows the branch you’re on).

## 5. Optional: use the pooled connection

Neon offers a pooled endpoint that reduces cold-start times. In the **Connection** dialog choose **Connection string → Connection pooling** and copy the URI (host usually ends with `pooler`). Replace `DATABASE_URL` with the pooled URI if you expect many short-lived connections.

## 6. Next steps

- Run `curl http://localhost:5000/api/email-logs` (with the server running) to confirm data is stored.
- Invite teammates to Neon via **Project settings → Members** if they need their own credentials.
- Consider creating a **separate branch** (e.g., `staging`) for non-production testing; each branch gets its own connection string. Update `DATABASE_URL` accordingly when you switch environments.

That’s it—your email logging API now persists data in a managed Neon PostgreSQL instance.

