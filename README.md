# HR ERP System Backend

Backend API for HR ERP System, fully configured and ready for Vercel deployment.

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Generate Prisma Client
npx prisma generate

# Run development server
npm run dev
```

### Build for Production

```bash
# Build TypeScript and generate Prisma Client
npm run build

# Start production server
npm start
```

## 📦 Deployment to Vercel

This backend is **100% ready** for Vercel deployment. See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for detailed instructions.

### Quick Deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Required Environment Variables

Set these in Vercel Dashboard → Settings → Environment Variables:

- `DATABASE_URL` - PostgreSQL connection string
- `DIRECT_URL` - Direct database connection (optional)

## 📁 Project Structure

```
backend/
├── api/
│   └── index.js              # Vercel serverless function entry point
├── src/
│   ├── routes/               # API route handlers
│   │   ├── auth/             # Authentication routes
│   │   ├── company/          # Company-specific routes
│   │   └── superadmin/        # Super admin routes
│   ├── lib/                   # Utilities (Prisma client, etc.)
│   ├── middleware/            # Express middleware
│   └── types/                 # TypeScript type definitions
├── prisma/
│   └── schema.prisma          # Database schema
├── dist/                      # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── vercel.json                # Vercel configuration
```

## 🔌 API Endpoints

All endpoints are prefixed with `/api/v1`:

### Authentication
- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - User registration

### Super Admin
- `GET /api/v1/superadmin/companies` - List all companies
- `POST /api/v1/superadmin/companies` - Create company
- `GET /api/v1/superadmin/companies/:id` - Get company
- `PUT /api/v1/superadmin/companies/:id` - Update company
- `DELETE /api/v1/superadmin/companies/:id` - Delete company

### Company Routes
- **Employees**: `/api/v1/company/employees/*`
- **Attendance**: `/api/v1/company/attendance/*`
- **Leaves**: `/api/v1/company/leaves/*`
- **Payroll**: `/api/v1/company/payroll/*`
- **Shifts**: `/api/v1/company/shifts/*`
- **Setups**: `/api/v1/company/setups/*`

## 🛠️ Technology Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js 5.x
- **Language**: TypeScript
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Vercel Serverless Functions

## 📝 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run vercel-build` - Build for Vercel (includes Prisma generation)
- `npm start` - Start production server

## 🔒 Environment Variables

### Required
- `DATABASE_URL` - PostgreSQL connection string

### Optional
- `DIRECT_URL` - Direct database connection for migrations
- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 4000)

## 📚 Documentation

- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT.md) - Detailed deployment instructions
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Pre-deployment checklist

## ✅ Status

**Backend is 100% ready for Vercel deployment!**

All configurations are in place:
- ✅ Vercel configuration (`vercel.json`)
- ✅ Build scripts (`package.json`)
- ✅ TypeScript configuration (`tsconfig.json`)
- ✅ Serverless function entry point (`api/index.js`)
- ✅ Prisma binary targets for Vercel
- ✅ Error handling and middleware
- ✅ Route auto-loading system

## 🐛 Troubleshooting

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for troubleshooting guide.

## 📄 License

ISC

