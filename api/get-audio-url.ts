import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

// Initialize Firebase Admin
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

const db = getFirestore();
const storage = getStorage();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, fileName } = req.body;

  if (!userId || !fileName) {
    return res.status(400).json({ error: 'Missing userId or fileName' });
  }

  try {
    // Check subscription status
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.data();

    if (!userData || userData.status !== 'active') {
      return res.status(403).json({ error: 'Active subscription required' });
    }

    // Check if subscription expired
    if (userData.currentPeriodEnd && userData.currentPeriodEnd * 1000 < Date.now()) {
      return res.status(403).json({ error: 'Subscription expired' });
    }

    // Generate signed URL
    const bucket = storage.bucket();
    const file = bucket.file(`recordings/${fileName}`);

    const [exists] = await file.exists();
    if (!exists) {
      return res.status(404).json({ error: 'Audio file not found' });
    }

    const [signedUrl] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + 3600000, // 1 hour
    });

    // Optional: Log access for analytics
    await db.collection('audioAccess').add({
      userId,
      fileName,
      accessedAt: new Date(),
    });

    return res.status(200).json({
      signedUrl,
      expiresIn: 3600,
    });
  } catch (error: any) {
    console.error('Error generating signed URL:', error);
    return res.status(500).json({ error: error.message });
  }
}

