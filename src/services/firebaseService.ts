import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentSnapshot,
  QueryConstraint
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { 
  User, 
  Meditation, 
  Purchase, 
  UserProgress, 
  QuizResult, 
  CommunityPost, 
  Comment,
  CoachingSession,
  Newsletter,
  MoonPhase,
  COLLECTIONS 
} from '../types/database';

// Generic CRUD operations
export class FirebaseService<T> {
  constructor(private collectionName: string) {}

  async create(data: Omit<T, 'id'>, customId?: string): Promise<string> {
    if (customId) {
      // Use custom ID (for Clerk user IDs)
      const docRef = doc(db, this.collectionName, customId);
      await setDoc(docRef, {
        ...data,
        id: customId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return customId;
    } else {
      // Auto-generate ID
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      return docRef.id;
    }
  }

  async getById(id: string): Promise<T | null> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as T;
    }
    return null;
  }

  async update(id: string, data: Partial<T>): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    });
  }

  async delete(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await deleteDoc(docRef);
  }

  async getAll(constraints: QueryConstraint[] = []): Promise<T[]> {
    const q = query(collection(db, this.collectionName), ...constraints);
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];
  }

  async getPaginated(
    pageSize: number = 10,
    lastDoc?: DocumentSnapshot,
    constraints: QueryConstraint[] = []
  ): Promise<{ data: T[]; lastDoc: DocumentSnapshot | null }> {
    const queryConstraints = [...constraints, limit(pageSize)];
    
    if (lastDoc) {
      queryConstraints.push(startAfter(lastDoc));
    }

    const q = query(collection(db, this.collectionName), ...queryConstraints);
    const querySnapshot = await getDocs(q);
    
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as T[];

    const lastDocument = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { data, lastDoc: lastDocument };
  }
}

// Specific service instances
export const userService = new FirebaseService<User>(COLLECTIONS.USERS);
export const meditationService = new FirebaseService<Meditation>(COLLECTIONS.MEDITATIONS);
export const purchaseService = new FirebaseService<Purchase>(COLLECTIONS.PURCHASES);
export const userProgressService = new FirebaseService<UserProgress>(COLLECTIONS.USER_PROGRESS);
export const quizResultService = new FirebaseService<QuizResult>(COLLECTIONS.QUIZ_RESULTS);
export const communityPostService = new FirebaseService<CommunityPost>(COLLECTIONS.COMMUNITY_POSTS);
export const commentService = new FirebaseService<Comment>(COLLECTIONS.COMMENTS);
export const coachingSessionService = new FirebaseService<CoachingSession>(COLLECTIONS.COACHING_SESSIONS);
export const newsletterService = new FirebaseService<Newsletter>(COLLECTIONS.NEWSLETTER);
export const moonPhaseService = new FirebaseService<MoonPhase>(COLLECTIONS.MOON_PHASES);

// Specialized query functions
export const meditationQueries = {
  async getByAstroSigns(sunSign: string, moonSign: string): Promise<Meditation[]> {
    return meditationService.getAll([
      where('sunSign', '==', sunSign),
      where('moonSign', '==', moonSign),
      where('isActive', '==', true)
    ]);
  },

  async getFeatured(): Promise<Meditation[]> {
    return meditationService.getAll([
      where('featured', '==', true),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    ]);
  },

  async getByElement(element: string): Promise<Meditation[]> {
    return meditationService.getAll([
      where('element', '==', element),
      where('isActive', '==', true),
      orderBy('createdAt', 'desc')
    ]);
  }
};

export const userQueries = {
  async getByEmail(email: string): Promise<User | null> {
    const users = await userService.getAll([where('email', '==', email)]);
    return users.length > 0 ? users[0] : null;
  },

  async getUserPurchases(userId: string): Promise<Purchase[]> {
    return purchaseService.getAll([
      where('userId', '==', userId),
      orderBy('purchaseDate', 'desc')
    ]);
  },

  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return userProgressService.getAll([
      where('userId', '==', userId),
      orderBy('lastAccessedAt', 'desc')
    ]);
  }
};

export const communityQueries = {
  async getPostsByCategory(category: string): Promise<CommunityPost[]> {
    return communityPostService.getAll([
      where('category', '==', category),
      where('isPublished', '==', true),
      orderBy('createdAt', 'desc')
    ]);
  },

  async getPostComments(postId: string): Promise<Comment[]> {
    return commentService.getAll([
      where('postId', '==', postId),
      where('isDeleted', '==', false),
      orderBy('createdAt', 'asc')
    ]);
  }
};
