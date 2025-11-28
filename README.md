# ProtoTech Solutions - Full Stack Application

A comprehensive CAD plugins e-commerce platform with BIM services and 3D solutions, built with React and Express.

## 🚀 Features

- **E-commerce Platform**: Product catalog, shopping cart, checkout, and order management
- **User Authentication**: Secure login and registration system
- **Product Management**: 10+ CAD software categories with detailed product pages
- **Content Management**: Blog, success stories, and resources
- **Admin Dashboard**: Manage products, blogs, and success stories
- **Email Integration**: Trial downloads and transactional emails via Hostinger SMTP
- **Order Tracking**: PostgreSQL-based order management system
- **SEO Optimized**: Sitemap, robots.txt, and structured data

## 📋 Prerequisites

- **Node.js** v14 or higher
- **npm** or yarn
- **PostgreSQL** database (Neon, Supabase, Render, or Railway)
- **Hostinger email account** with SMTP access

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd pts-3
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

### 3. Environment Configuration

#### Backend Configuration

```bash
cd server
cp .env.example .env
```

Edit `server/.env` with your credentials:

```env
# Server
PORT=5000

# SMTP (Hostinger)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
SMTP_FROM=noreply@yourdomain.com

# PostgreSQL Database
DATABASE_URL=postgresql://username:password@host:5432/database
```

**Getting Hostinger SMTP Credentials:**
1. Log in to Hostinger hPanel
2. Navigate to Email section
3. Create or select an email account
4. Use email address as `SMTP_USER`
5. Use email password as `SMTP_PASS`

**Database Options** (all offer free tiers):
- [Neon](https://neon.tech/)
- [Supabase](https://supabase.com/)
- [Render](https://render.com/)
- [Railway](https://railway.app/)

#### Frontend Configuration

For **local development**:
```bash
# Already configured in .env.development
# Points to http://localhost:5000
```

For **production**:
```bash
# Update .env.production with your production backend URL
REACT_APP_API_URL=https://your-backend-url.com
```

### 4. Running the Application

#### Option A: Run Frontend and Backend Separately

**Terminal 1 - Backend:**
```bash
cd server
npm start
# Server runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
npm start
# Frontend runs on http://localhost:3000
```

#### Option B: Development Mode with Auto-Reload

**Backend with Nodemon:**
```bash
cd server
npm run dev
```

**Frontend:**
```bash
npm start
```

## 📚 Project Structure

```
pts-3/
├── public/                 # Static assets
├── src/
│   ├── components/        # Reusable React components
│   ├── pages/            # Page components
│   │   ├── auth/         # Login, Register
│   │   ├── admin/        # Admin dashboard
│   │   ├── products/     # Product pages
│   │   ├── services/     # Service pages
│   │   └── solutions/    # Solution pages
│   ├── store/            # Zustand state management
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   └── useStore.js
│   ├── data/             # Data files
│   ├── services/         # API services
│   └── utils/            # Utility functions
├── server/
│   ├── index.js          # Express server
│   ├── db.js            # PostgreSQL connection
│   └── .env.example     # Environment template
└── .env.development      # Frontend dev config
```

## 🔐 Security

**⚠️ CRITICAL: Never commit `.env` files!**

All sensitive credentials are protected by `.gitignore`. See [SECURITY.md](./SECURITY.md) for:
- Security guidelines
- Environment variable setup
- Security checklist
- Incident response procedures

## 🧪 Testing

### Test SMTP Configuration

```bash
curl -X POST http://localhost:5000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "your-email@example.com"}'
```

### Test Database Connection

The server will automatically:
- Test database connection on startup
- Create required tables if they don't exist
- Log connection status to console

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# The build folder can be deployed to any static hosting service
```

## 🌐 API Endpoints

### Health Check
```
GET /api/health
```

### Email Endpoints
```
POST /api/send-trial-email    # Send trial download emails
POST /api/test-email           # Test SMTP configuration
GET  /api/email-logs           # View email logs (requires DB)
```

### Order Endpoints
```
POST /api/orders               # Create new order
GET  /api/orders/:orderId      # Get specific order
GET  /api/orders/user/:userId  # Get user's orders
GET  /api/orders               # Get all orders (admin)
```

### SEO Endpoints
```
GET /sitemap.xml              # Sitemap for search engines
GET /robots.txt               # Robots.txt
```

## 🚢 Deployment

### Backend (Render/Railway/Fly.io)

1. Create new web service
2. Set environment variables from `server/.env.example`
3. Deploy from `server` directory
4. Note the deployed URL

### Frontend (Vercel/Netlify/Cloudflare Pages)

1. Build command: `npm run build`
2. Publish directory: `build`
3. Set environment variable: `REACT_APP_API_URL=<your-backend-url>`

## 🛠️ Technology Stack

**Frontend:**
- React 19.2.0
- React Router DOM 7.9.5
- TailwindCSS 3.4.18
- GSAP 3.13.0 (animations)
- Zustand 5.0.8 (state management)
- Lucide React + React Icons

**Backend:**
- Express.js 4.18.2
- Nodemailer 6.9.13
- PostgreSQL (pg 8.16.3)
- CORS 2.8.5

**Database:**
- PostgreSQL (Neon DB)

## 📖 Additional Documentation

- [Email Setup Guide](./SETUP_EMAIL.md) - Quick SMTP setup
- [Server Documentation](./server/README.md) - Detailed backend docs
- [Security Guidelines](./SECURITY.md) - Security best practices

## 🐛 Troubleshooting

### SMTP Connection Issues
- Verify credentials in `server/.env`
- Try port 587 if 465 doesn't work
- Check firewall settings

### Database Connection Issues
- Verify `DATABASE_URL` is correct
- Check SSL mode (set `PGSSLMODE=disable` for local DB)
- Ensure IP is whitelisted (cloud databases)

### CORS Errors
- Ensure backend is running
- Check `REACT_APP_API_URL` in frontend `.env`
- Verify ports match (frontend: 3000, backend: 5000)

## 📝 License

ISC

## 👥 Support

For issues or questions:
- Create an issue in the repository
- Contact support team
- Check documentation in `/docs`

---

**Note**: This is an active development project. Make sure to check [SECURITY.md](./SECURITY.md) before deployment.
