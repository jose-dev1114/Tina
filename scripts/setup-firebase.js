#!/usr/bin/env node

/**
 * Firebase Setup Script
 * 
 * This script helps set up Firebase for the meditation app.
 * Run with: node scripts/setup-firebase.js
 */

const fs = require('fs');
const path = require('path');

const FIREBASE_CONFIG_TEMPLATE = `# Firebase Configuration
# Get these values from your Firebase project settings
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Payment Processing (Stripe)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Email Service (EmailJS or similar)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Astrology API (optional)
VITE_ASTROLOGY_API_KEY=your_astrology_api_key

# Environment
NODE_ENV=development`;

const FIREBASE_CLI_COMMANDS = [
  'npm install -g firebase-tools',
  'firebase login',
  'firebase init',
  'firebase deploy --only firestore:rules',
  'firebase deploy --only firestore:indexes'
];

function createEnvFile() {
  const envPath = path.join(process.cwd(), '.env');
  
  if (fs.existsSync(envPath)) {
    console.log('✅ .env file already exists');
    return;
  }

  fs.writeFileSync(envPath, FIREBASE_CONFIG_TEMPLATE);
  console.log('✅ Created .env file from template');
  console.log('📝 Please update the Firebase configuration values in .env');
}

function checkFirebaseFiles() {
  const files = [
    'firebase.json',
    'firestore.rules',
    'firestore.indexes.json',
    'storage.rules'
  ];

  console.log('\n📁 Checking Firebase configuration files:');
  files.forEach(file => {
    const exists = fs.existsSync(path.join(process.cwd(), file));
    console.log(`${exists ? '✅' : '❌'} ${file}`);
  });
}

function displaySetupInstructions() {
  console.log('\n🚀 Firebase Setup Instructions:');
  console.log('================================');
  
  console.log('\n1. Create Firebase Project:');
  console.log('   - Go to https://console.firebase.google.com');
  console.log('   - Create a new project');
  console.log('   - Enable Firestore Database');
  console.log('   - Enable Authentication (Email/Password and Google)');
  console.log('   - Enable Storage');

  console.log('\n2. Get Firebase Configuration:');
  console.log('   - Go to Project Settings > General');
  console.log('   - Scroll to "Your apps" section');
  console.log('   - Click "Web app" and register your app');
  console.log('   - Copy the config values to your .env file');

  console.log('\n3. Install Firebase CLI and Deploy:');
  FIREBASE_CLI_COMMANDS.forEach((cmd, index) => {
    console.log(`   ${index + 1}. ${cmd}`);
  });

  console.log('\n4. Set up Authentication:');
  console.log('   - Go to Authentication > Sign-in method');
  console.log('   - Enable Email/Password');
  console.log('   - Enable Google (optional)');
  console.log('   - Add your domain to authorized domains');

  console.log('\n5. Configure Storage:');
  console.log('   - Go to Storage > Rules');
  console.log('   - Deploy the storage.rules file');

  console.log('\n6. Seed Database:');
  console.log('   - Start your app: npm run dev');
  console.log('   - Go to /admin route');
  console.log('   - Click "Seed Database" button');

  console.log('\n7. Test the Setup:');
  console.log('   - Try creating an account');
  console.log('   - Take the astrology quiz');
  console.log('   - Browse meditations');
  console.log('   - Check Firestore console for data');
}

function displayDatabaseStructure() {
  console.log('\n📊 Database Collections:');
  console.log('========================');
  
  const collections = [
    'users - User profiles and preferences',
    'meditations - Meditation content and metadata',
    'purchases - Purchase records and payment info',
    'userProgress - User meditation progress tracking',
    'quizResults - Astrology quiz results',
    'communityPosts - Community forum posts',
    'comments - Post comments and replies',
    'coachingSessions - Coaching session bookings',
    'newsletter - Email subscriptions',
    'moonPhases - Moon phase data and recommendations'
  ];

  collections.forEach(collection => {
    console.log(`   • ${collection}`);
  });

  console.log('\n📖 See DATABASE_STRUCTURE.md for detailed schemas');
}

function main() {
  console.log('🌙 Firebase Setup for Lunar Nidra Meditation App');
  console.log('================================================');

  createEnvFile();
  checkFirebaseFiles();
  displayDatabaseStructure();
  displaySetupInstructions();

  console.log('\n✨ Setup script completed!');
  console.log('💡 Need help? Check the DATABASE_STRUCTURE.md file for more details.');
}

if (require.main === module) {
  main();
}

module.exports = {
  createEnvFile,
  checkFirebaseFiles,
  displaySetupInstructions,
  displayDatabaseStructure
};
