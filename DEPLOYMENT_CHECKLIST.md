# Vercel Deployment Checklist ✅

## Pre-Deployment Checklist

### ✅ Configuration Files
- [x] `vercel.json` - Configured with proper build command and routes
- [x] `package.json` - Has `vercel-build` script and `postinstall` hook
- [x] `tsconfig.json` - Properly configured for ESM compilation
- [x] `api/index.js` - Vercel serverless function entry point ready
- [x] `.gitignore` - Excludes unnecessary files
- [x] `.vercelignore` - Excludes development files from deployment
- [x] `prisma/schema.prisma` - Binary targets configured for Vercel

### ✅ Code Quality
- [x] All routes use `.js` extensions in imports (ESM compatible)
- [x] Error handling middleware properly configured
- [x] 404 handler in place
- [x] CORS configured
- [x] Routes load from `dist/routes` (compiled output)

### ⚠️ Environment Variables (Set in Vercel Dashboard)
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `DIRECT_URL` - Direct database connection (optional but recommended)
- [ ] `NODE_ENV` - Set to `production` (optional)

### ⚠️ Database Setup
- [ ] Database migrations run (if needed)
- [ ] Database accessible from Vercel IPs
- [ ] SSL enabled (`?sslmode=require` in connection string)

## Build Process Verification

The build process will:
1. ✅ Run `npm install`
2. ✅ Run `prisma generate` (via postinstall)
3. ✅ Run `tsc` to compile TypeScript
4. ✅ Deploy `api/index.js` as serverless function

## Testing After Deployment

1. **Health Check**: `GET https://your-domain.vercel.app/`
   - Should return: `{ message: "HR ERP Backend is LIVE on Vercel!", ... }`

2. **API Routes**: Test a few endpoints:
   - `POST /api/v1/auth/login`
   - `GET /api/v1/superadmin/companies` (with auth)

3. **Error Handling**: Test 404:
   - `GET /api/v1/nonexistent` - Should return 404 JSON

## Common Issues & Solutions

### Issue: Build fails with "Cannot find module"
**Solution**: Ensure all imports use `.js` extensions

### Issue: Routes not loading
**Solution**: 
- Check build logs to verify `dist/routes` was created
- Verify TypeScript compilation succeeded
- Check function logs in Vercel dashboard

### Issue: Database connection fails
**Solution**:
- Verify `DATABASE_URL` is set correctly
- Ensure database allows connections from Vercel
- Check SSL is enabled in connection string

### Issue: Prisma Client not found
**Solution**:
- Verify `prisma generate` runs during build
- Check `postinstall` script in package.json
- Ensure Prisma schema is valid

## Quick Deploy Commands

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (from backend directory)
cd backend
vercel

# Deploy to production
vercel --prod
```

## File Structure After Build

```
backend/
├── api/
│   └── index.js          # Entry point (deployed)
├── dist/                 # Compiled TypeScript
│   ├── routes/           # Compiled routes
│   ├── lib/              # Compiled utilities
│   └── middleware/       # Compiled middleware
├── prisma/
│   └── schema.prisma     # Database schema
└── node_modules/         # Dependencies
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)
- [Express on Vercel](https://vercel.com/docs/functions/serverless-functions/runtimes/node-js)

---

**Status**: ✅ Backend is 100% ready for Vercel deployment!

