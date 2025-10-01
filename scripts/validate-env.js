#!/usr/bin/env node

/**
 * Environment Variable Validation Script
 * Validates that all required environment variables are set for production builds
 */

const requiredVars = [
  'VITE_CLERK_PUBLISHABLE_KEY',
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const optionalVars = [
  'VITE_FIREBASE_MEASUREMENT_ID',
  'VITE_STRIPE_PUBLISHABLE_KEY',
  'VITE_EMAILJS_SERVICE_ID',
  'VITE_EMAILJS_TEMPLATE_ID',
  'VITE_EMAILJS_PUBLIC_KEY',
  'VITE_ASTROLOGY_API_KEY',
  'CLERK_SECRET_KEY'
];

// Standard environment variables that should be ignored
const standardVars = ['NODE_ENV', 'CI', 'NETLIFY'];

console.log('🔍 Validating environment variables...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
console.log('✅ Required Variables:');
requiredVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value.includes('your_') || value.includes('demo_') || value.includes('test_your_')) {
    console.log(`❌ ${varName}: Missing or contains placeholder value`);
    hasErrors = true;
  } else {
    console.log(`✅ ${varName}: Set`);
  }
});

// Check optional variables
console.log('\n⚠️  Optional Variables:');
optionalVars.forEach(varName => {
  const value = process.env[varName];
  if (!value || value.includes('your_') || value.includes('demo_')) {
    console.log(`⚠️  ${varName}: Not set or placeholder value`);
    hasWarnings = true;
  } else {
    console.log(`✅ ${varName}: Set`);
  }
});

console.log('\n📋 Summary:');
if (hasErrors) {
  console.log('❌ Build will fail: Required environment variables are missing or contain placeholder values');
  console.log('💡 Please update your environment variables in Netlify dashboard or .env file');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are properly set');
  if (hasWarnings) {
    console.log('⚠️  Some optional variables are not set - features may be limited');
  }
  console.log('🚀 Ready for deployment!');
}
