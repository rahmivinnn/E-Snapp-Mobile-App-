# Setup Deployment Otomatis ke Vercel

## 🚀 Metode Deployment

Proyek ini mendukung 3 metode deployment otomatis:

### 1. GitHub Actions (Recommended)
Deployment otomatis setiap push ke repository

### 2. Vercel Git Integration
Integrasi langsung dengan Vercel dashboard

### 3. Manual Deployment Script
Script lokal untuk deployment manual

---

## 📋 Setup GitHub Actions

### Langkah 1: Dapatkan Vercel Tokens

1. **Login ke Vercel Dashboard**
   - Buka [vercel.com](https://vercel.com)
   - Login dengan akun GitHub Anda

2. **Buat Vercel Token**
   - Masuk ke **Settings** > **Tokens**
   - Klik **Create Token**
   - Nama: `GitHub Actions Token`
   - Scope: **Full Account**
   - Copy token yang dihasilkan

3. **Dapatkan Project ID dan Org ID**
   ```bash
   # Install Vercel CLI jika belum ada
   npm install -g vercel
   
   # Login ke Vercel
   vercel login
   
   # Link project (jalankan di root project)
   vercel link
   
   # Lihat project info
   cat .vercel/project.json
   ```

### Langkah 2: Setup GitHub Secrets

1. **Buka Repository Settings**
   - Masuk ke repository GitHub
   - Klik **Settings** > **Secrets and variables** > **Actions**

2. **Tambahkan Secrets**
   - `VERCEL_TOKEN`: Token dari langkah 1
   - `ORG_ID`: Dari `.vercel/project.json`
   - `PROJECT_ID`: Dari `.vercel/project.json`

### Langkah 3: Test Deployment

1. **Push ke Repository**
   ```bash
   git add .
   git commit -m "Setup auto deployment"
   git push origin main
   ```

2. **Monitor di GitHub Actions**
   - Masuk ke tab **Actions** di repository
   - Lihat workflow "Deploy to Vercel" berjalan

---

## 🔗 Setup Vercel Git Integration

### Langkah 1: Import Project

1. **Buka Vercel Dashboard**
   - Klik **Add New** > **Project**
   - **Import Git Repository**
   - Pilih repository GitHub Anda

### Langkah 2: Configure Build Settings

```
Framework Preset: Other
Build Command: npm run vercel-build
Output Directory: dist
Install Command: npm ci
```

### Langkah 3: Environment Variables

Tambahkan di **Settings** > **Environment Variables**:

```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=30d
FRONTEND_URL=https://your-app.vercel.app
```

---

## 💻 Manual Deployment

### Menggunakan Script Deployment

```bash
# Development deployment
npm run deploy

# Production deployment
npm run deploy:prod
```

### Menggunakan Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy preview
vercel

# Deploy production
vercel --prod
```

---

## 🗄️ Setup Database

### Opsi 1: Vercel Postgres

1. **Buka Vercel Dashboard**
   - Masuk ke project Anda
   - Klik **Storage** tab
   - **Create Database** > **Postgres**

2. **Copy Connection String**
   - Masuk ke database yang dibuat
   - Copy **POSTGRES_URL**
   - Tambahkan ke environment variables sebagai `DATABASE_URL`

### Opsi 2: Supabase (Gratis)

1. **Daftar di Supabase**
   - Buka [supabase.com](https://supabase.com)
   - Buat project baru

2. **Dapatkan Connection String**
   - **Settings** > **Database**
   - Copy **Connection string**
   - Format: `postgresql://postgres:[password]@[host]:5432/postgres`

### Opsi 3: Railway

1. **Daftar di Railway**
   - Buka [railway.app](https://railway.app)
   - Deploy PostgreSQL database

2. **Copy Connection String**
   - Masuk ke database service
   - Copy **DATABASE_URL**

### Migration Database

Setelah setup database:

```bash
# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push

# (Opsional) Seed data
npm run db:seed
```

---

## 🔧 Troubleshooting

### Build Errors

```bash
# Clear cache dan reinstall
rm -rf node_modules package-lock.json
npm install

# Test build lokal
npm run build
```

### Database Connection Issues

```bash
# Test database connection
npx prisma db pull

# Reset database
npx prisma migrate reset
```

### Environment Variables

1. **Check di Vercel Dashboard**
   - **Settings** > **Environment Variables**
   - Pastikan semua variabel ada

2. **Test lokal dengan .env**
   ```bash
   cp .env.example .env
   # Edit .env dengan nilai yang benar
   npm run dev
   ```

### GitHub Actions Failures

1. **Check Secrets**
   - Pastikan `VERCEL_TOKEN`, `ORG_ID`, `PROJECT_ID` benar

2. **Check Workflow Logs**
   - Masuk ke **Actions** tab
   - Klik workflow yang gagal
   - Lihat detail error

---

## 📊 Monitoring Deployment

### Vercel Dashboard
- **Deployments**: Lihat history deployment
- **Functions**: Monitor API performance
- **Analytics**: Traffic dan performance metrics

### GitHub Actions
- **Actions** tab: Status workflow
- **Environments**: Deployment history

---

## 🎯 Best Practices

1. **Environment Variables**
   - Jangan commit secrets ke repository
   - Gunakan different values untuk development/production

2. **Database**
   - Backup database secara berkala
   - Gunakan connection pooling untuk production

3. **Monitoring**
   - Setup error tracking (Sentry)
   - Monitor database performance
   - Check deployment logs regularly

4. **Security**
   - Rotate JWT secrets secara berkala
   - Gunakan strong passwords untuk database
   - Enable CORS dengan domain yang tepat

---

## 📞 Support

Jika ada masalah:
1. Check [DEPLOYMENT.md](./DEPLOYMENT.md) untuk troubleshooting umum
2. Lihat Vercel documentation
3. Check GitHub Actions logs
4. Buat issue di repository ini