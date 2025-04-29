# Discuss BP

This is a Next.js project that allows users to create and participate in discussions by creating
topics and posts. It integrates with GitHub for authentication and uses Prisma for database
management with PostgreSQL.

## Getting Started

Before running the development server, follow these steps:

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies

Make sure to install the required dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root of your project and add the following configuration:

```env
# GitHub OAuth app (see below for how to obtain these keys)
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# Secret for encrypting sessions
AUTH_SECRET=""

# Local connection to Postgres
DATABASE_URL="postgresql://postgres@localhost:5432/postgres?schema=public"

# Trust localhost for authentication
AUTH_TRUST_HOST=true
```

To obtain `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET`, follow these steps:

1. Go to [GitHub Developer Settings](https://github.com/settings/developers).
2. Create a new OAuth App:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
3. Copy the generated `CLIENT_ID` and `CLIENT_SECRET` into your `.env.local` file.

### 4. Set Up Local Database

Make sure you have Docker installed, then run the following command to start a PostgreSQL container:

```bash
npm run start:db
```

This will start a PostgreSQL database running on port 5432 with a `trust` authentication method.

### 5. Run Migrations and Prisma Client Generation

To run the Prisma migrations and generate the Prisma client, run the following commands:

```bash
npm run prisma:migrate:local
```

Optionally, if you just need to regenerate the Prisma client (if the schema hasn’t changed), run:

```bash
npm run prisma:generate:local
```

### 6. Start the Development Server

Run the following command to start the development server:

```bash
npm run dev
```

Now, open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the
file.

## Scripts

Here are some useful commands:

- **Start Development Server**: `npm run dev`
- **Build for Production**: `npm run build`
- **Start Production Server**: `npm run start`
- **Lint the Code**: `npm run lint`
- **Run Local Database** (Postgres in Docker): `npm run start:db`
- **Run Prisma Migrations**: `npm run prisma:migrate:local`
- **Generate Prisma Client**: `npm run prisma:generate:local`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback
and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.

Check out our
[Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying)
for more details.
