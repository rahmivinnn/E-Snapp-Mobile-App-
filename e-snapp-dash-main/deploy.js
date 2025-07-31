#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting E-Snapp deployment process...');

// Check if we're in the right directory
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if Vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
} catch (error) {
  console.log('📦 Installing Vercel CLI...');
  execSync('npm install -g vercel', { stdio: 'inherit' });
}

try {
  // Install dependencies
  console.log('📦 Installing dependencies...');
  execSync('npm ci', { stdio: 'inherit' });

  // Generate Prisma client
  console.log('🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });

  // Build the project
  console.log('🏗️  Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  // Deploy to Vercel
  console.log('🚀 Deploying to Vercel...');
  const deployCommand = process.argv.includes('--prod') ? 'vercel --prod' : 'vercel';
  execSync(deployCommand, { stdio: 'inherit' });

  console.log('✅ Deployment completed successfully!');
  console.log('\n📋 Next steps:');
  console.log('1. Configure environment variables in Vercel dashboard');
  console.log('2. Set up your PostgreSQL database');
  console.log('3. Run database migrations: npx prisma db push');
  console.log('\n🔗 Visit your Vercel dashboard to see the deployment URL');

} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  console.log('\n🔍 Troubleshooting tips:');
  console.log('1. Check your environment variables');
  console.log('2. Verify database connection');
  console.log('3. Review build logs in Vercel dashboard');
  console.log('4. Check DEPLOYMENT.md for detailed guide');
  process.exit(1);
}