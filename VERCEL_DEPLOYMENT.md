# Vercel Deployment Guide

This backend is fully configured and ready for Vercel deployment.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Database**: PostgreSQL database (recommended: Vercel Postgres, Neon, or Supabase)
3. **Environment Variables**: Set up required environment variables in Vercel

## Required Environment Variables

Set these in your Vercel project settings (Settings → Environment Variables):

### Database Configuration
- `DATABASE_URL` - PostgreSQL connection string (required)
  - Format: `postgresql://user:password@host:port/database?sslmode=require`
- `DIRECT_URL` - Direct database connection (for migrations, optional but recommended)
  - Format: `postgresql://user:password@host:port/database?sslmode=require`

### Example Environment Variables
```
DATABASE_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
DIRECT_URL=postgresql://user:pass@host:5432/dbname?sslmode=require
NODE_ENV=production
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to backend directory:
   ```bash
   cd backend
   ```

4. Deploy:
   ```bash
   vercel
   ```

5. Follow the prompts to link your project or create a new one.

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Framework Preset**: Other
   - **Build Command**: `npm run vercel-build`
   - **Output Directory**: `.` (leave default)
   - **Install Command**: `npm install`
5. Add environment variables in project settings
6. Deploy

## Build Process

Vercel will automatically:
1. Run `npm install` to install dependencies
2. Run `npm run vercel-build` which:
   - Generates Prisma Client (`prisma generate`)
   - Compiles TypeScript to JavaScript (`tsc`)
3. Deploy the serverless function at `api/index.js`

## Project Structure

```
backend/
├── api/
│   └── index.js          # Vercel serverless function entry point
├── src/
│   ├── routes/           # Route handlers (TypeScript)
│   ├── lib/              # Utilities (Prisma client, etc.)
│   └── middleware/       # Express middleware
├── prisma/
│   └── schema.prisma     # Database schema
├── dist/                 # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── vercel.json           # Vercel configuration
```

## API Endpoints

All API endpoints are prefixed with `/api/v1`:

- Health Check: `GET /`
- Authentication: `/api/v1/auth/login`, `/api/v1/auth/register`
- Super Admin: `/api/v1/superadmin/companies/*`
- Company Routes: `/api/v1/company/*`
  - Employees: `/api/v1/company/employees/*`
  - Attendance: `/api/v1/company/attendance/*`
  - Leaves: `/api/v1/company/leaves/*`
  - Payroll: `/api/v1/company/payroll/*`
  - And more...

## Troubleshooting

### Build Fails

1. **Prisma Client Generation Error**:
   - Ensure `DATABASE_URL` is set correctly
   - Check Prisma schema syntax
   - Verify database connection

2. **TypeScript Compilation Error**:
   - Check `tsconfig.json` configuration
   - Ensure all imports use `.js` extensions for ESM

3. **Module Not Found**:
   - Verify all dependencies are in `package.json`
   - Check that imports use correct paths

### Runtime Errors

1. **Routes Not Loading**:
   - Check build logs to see if routes compiled successfully
   - Verify `dist/routes` directory exists after build
   - Check console logs in Vercel function logs

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is correct
   - Check database allows connections from Vercel IPs
   - Ensure SSL is enabled (`?sslmode=require`)

3. **CORS Issues**:
   - Update CORS configuration in `api/index.js` if needed
   - Add your frontend domain to allowed origins

## Database Migrations

To run migrations on Vercel:

1. Use Vercel CLI:
   ```bash
   vercel env pull .env.local
   npx prisma migrate deploy
   ```

2. Or use a migration service/script in your deployment pipeline

## Monitoring

- View function logs in Vercel Dashboard → Your Project → Functions
- Monitor performance in Vercel Analytics
- Set up error tracking (e.g., Sentry) for production

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] CORS configured for frontend domain
- [ ] Error tracking set up
- [ ] Monitoring configured
- [ ] API endpoints tested
- [ ] Performance optimized

## Support

For issues specific to:
- **Vercel**: Check [Vercel Documentation](https://vercel.com/docs)
- **Prisma**: Check [Prisma Documentation](https://www.prisma.io/docs)
- **Express**: Check [Express Documentation](https://expressjs.com/)

