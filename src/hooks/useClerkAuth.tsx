import { useUser, useAuth as useClerkAuthHook } from '@clerk/clerk-react';
import { useEffect, useState, useRef } from 'react';
import { userService } from '../services/firebaseService';
import { User } from '../types/database';
import { geocodeBirthPlace } from '../utils/geocoding';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const { user, isLoaded: userLoaded, isSignedIn } = useUser();
  const { signOut } = useClerkAuthHook();
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasProcessedUrlParams, setHasProcessedUrlParams] = useState(false);
  const hasShownLoginToast = useRef(false);

  // ✨ NEW: Extract and save birth data from URL parameters after signup
  const saveBirthDataFromUrl = async (userId: string) => {
    try {
      const params = new URLSearchParams(window.location.search);
      const birthDate = params.get('birthDate');
      const birthTime = params.get('birthTime');
      const birthPlace = params.get('birthPlace');
      const spiritualGoalsStr = params.get('spiritualGoals');
      const challengesStr = params.get('challenges');

      // Check if we have birth data in URL
      if (birthDate && birthPlace) {
        console.log('✨ Found birth data in URL parameters');
        console.log('📋 Birth data:', { birthDate, birthTime, birthPlace });

        try {
          // Get geocoding data and birth chart
          const geoData = await geocodeBirthPlace(
            birthPlace,
            birthDate,
            birthTime || ''
          );

          console.log('✅ Geocoding successful, birth chart calculated');

          // Parse spiritual goals and challenges
          const spiritualGoals = spiritualGoalsStr ? JSON.parse(spiritualGoalsStr) : [];
          const challenges = challengesStr ? JSON.parse(challengesStr) : [];

          // Save birth data to user profile
          console.log('💾 Saving birth data to Firebase...');

          // ✨ Filter out undefined values from birthChartData
          const cleanBirthChartData = geoData.birthChart ?
            Object.fromEntries(
              Object.entries(geoData.birthChart).filter(([_, v]) => v !== undefined)
            ) as any : null;

          // Build update object with ALL birth chart data
          const updateData: any = {
            birthDate,
            birthTime: birthTime || '',
            birthPlace,
            sunSign: geoData.birthChart?.sunSign || '',
            moonSign: geoData.birthChart?.moonSign || '',
            risingSign: geoData.birthChart?.risingSign || '',
            spiritualGoals,
            challenges,
            hasCompletedAstroQuiz: true,
            updatedAt: new Date(),
            // ✨ Always add the complete birthChartData object
            birthChartData: cleanBirthChartData || {}
          };

          console.log('📤 URL params flow - birthChartData:', cleanBirthChartData);
          await userService.update(userId, updateData);

          console.log('✅ Birth data saved successfully from URL!');

          // Clear URL parameters
          window.history.replaceState({}, '', window.location.pathname);
          console.log('🔗 URL parameters cleared');
        } catch (error) {
          console.error('❌ Error processing birth data from URL:', error);
        }
      }
    } catch (error) {
      console.error('❌ Error extracting URL parameters:', error);
    }
  };

  // Sync Clerk user with Firebase user profile
  useEffect(() => {
    const syncUserProfile = async () => {
      if (!userLoaded) return;

      if (isSignedIn && user) {
        try {
          console.log('🔄 Syncing user profile for:', user.id);

          // Check if user profile exists in Firebase
          let profile = await userService.getById(user.id);

          if (!profile) {
            console.log('👤 Creating new user profile in Firebase');

            // Create comprehensive new user profile in Firebase
            const newUserData = {
              // Basic info from Clerk
              email: user.primaryEmailAddress?.emailAddress || '',
              displayName: user.fullName || user.firstName || user.username || 'Sacred Soul',
              firstName: user.firstName || '',
              lastName: user.lastName || '',
              photoURL: user.imageUrl || '',
              username: user.username || '',
              phone: user.phoneNumbers?.[0]?.phoneNumber || '',

              // Authentication info
              clerkUserId: user.id,
              emailVerified: user.primaryEmailAddress?.verification?.status === 'verified',

              // Timestamps
              createdAt: new Date(),
              updatedAt: new Date(),
              lastLoginAt: new Date(),

              // Astrological profile (empty initially)
              birthDate: '',
              birthTime: '',
              birthPlace: '',
              sunSign: '',
              moonSign: '',
              risingSign: '',

              // Spiritual preferences
              spiritualGoals: [],
              challenges: [],
              meditationPreferences: {
                preferredDuration: 10, // minutes
                preferredTime: 'evening',
                favoriteElements: [],
                voicePreference: 'female'
              },

              // Progress tracking
              totalMeditationTime: 0,
              completedMeditations: [],
              favoritemeditations: [],
              currentStreak: 0,
              longestStreak: 0,

              // Subscription info
              subscriptionStatus: 'free',
              subscriptionTier: 'basic',

              // Privacy settings
              profileVisibility: 'private',
              allowCommunityInteraction: true,

              // Onboarding
              hasCompletedOnboarding: false,
              hasCompletedAstroQuiz: false
            };

            await userService.create(newUserData, user.id);
            profile = await userService.getById(user.id);
            console.log('✅ User profile created successfully');

            // ✨ NEW: After creating new profile, check for birth data in URL
            if (!hasProcessedUrlParams) {
              await saveBirthDataFromUrl(user.id);
              setHasProcessedUrlParams(true);
            }

          } else {
            console.log('🔄 Updating existing user profile');

            // Update existing profile with latest Clerk info
            const updateData = {
              lastLoginAt: new Date(),
              updatedAt: new Date(),

              // Sync any updated info from Clerk
              displayName: user.fullName || user.firstName || profile.displayName,
              firstName: user.firstName || profile.firstName,
              lastName: user.lastName || profile.lastName,
              photoURL: user.imageUrl || profile.photoURL,
              username: user.username || profile.username,
              phone: user.phoneNumbers?.[0]?.phoneNumber || profile.phone,
              email: user.primaryEmailAddress?.emailAddress || profile.email,
              emailVerified: user.primaryEmailAddress?.verification?.status === 'verified',

              // Update Clerk user ID if it changed (shouldn't happen but just in case)
              clerkUserId: user.id
            };

            await userService.update(user.id, updateData);
            profile = await userService.getById(user.id);
            console.log('✅ User profile updated successfully');
          }

          setUserProfile(profile);

          // Show login success toast (only once per session)
          if (!hasShownLoginToast.current) {
            hasShownLoginToast.current = true;
            toast.success('Login successfully! 🌙', {
              duration: 3000,
            });
          }

        } catch (error) {
          console.error('❌ Error syncing user profile:', error);
          setUserProfile(null);
        }
      } else {
        console.log('👋 User signed out, clearing profile');
        setUserProfile(null);
        // Reset the toast flag when user signs out
        hasShownLoginToast.current = false;
      }

      setLoading(false);
    };

    syncUserProfile();
  }, [user, isSignedIn, userLoaded, hasProcessedUrlParams]);

  const updateUserProfile = async (updates: Partial<User>): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    console.log('🔄 Updating user profile with:', updates);

    const updateData = {
      ...updates,
      updatedAt: new Date()
    };

    await userService.update(user.id, updateData);

    // Refresh user profile
    const updatedProfile = await userService.getById(user.id);
    setUserProfile(updatedProfile);

    console.log('✅ User profile updated successfully');
  };

  const updateAstrologicalProfile = async (astroData: {
    birthDate?: string;
    birthTime?: string;
    birthPlace?: string;
    sunSign?: string;
    moonSign?: string;
    risingSign?: string;
  }): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    console.log('🌟 Updating astrological profile');
    await updateUserProfile(astroData);
  };

  const updateMeditationPreferences = async (preferences: {
    preferredDuration?: number;
    preferredTime?: string;
    favoriteElements?: string[];
    voicePreference?: string;
  }): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    console.log('🧘 Updating meditation preferences');
    const currentPrefs = userProfile?.meditationPreferences || {};
    await updateUserProfile({
      meditationPreferences: {
        ...currentPrefs,
        ...preferences
      }
    });
  };

  const updateSpiritualGoals = async (goals: string[], challenges: string[]): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    console.log('💫 Updating spiritual goals and challenges');
    await updateUserProfile({
      spiritualGoals: goals,
      challenges: challenges
    });
  };

  const completeOnboarding = async (): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    console.log('🎉 Completing onboarding');
    await updateUserProfile({
      hasCompletedOnboarding: true
    });
  };

  const completeAstroQuiz = async (quizResults: {
    sunSign: string;
    moonSign: string;
    risingSign: string;
    element: string;
    challenges: string[];
    goals: string[];
  }): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    console.log('🌙 Completing astro quiz');
    await updateUserProfile({
      sunSign: quizResults.sunSign,
      moonSign: quizResults.moonSign,
      risingSign: quizResults.risingSign,
      spiritualGoals: quizResults.goals,
      challenges: quizResults.challenges,
      hasCompletedAstroQuiz: true
    });
  };

  const trackMeditationProgress = async (meditationId: string, duration: number): Promise<void> => {
    if (!user || !userProfile) throw new Error('No user logged in');

    console.log('📊 Tracking meditation progress');

    const completedMeditations = userProfile.completedMeditations || [];
    const totalTime = (userProfile.totalMeditationTime || 0) + duration;

    await updateUserProfile({
      completedMeditations: [...completedMeditations, {
        meditationId,
        completedAt: new Date(),
        duration
      }],
      totalMeditationTime: totalTime
    });
  };

  const toggleFavoriteMeditation = async (meditationId: string): Promise<void> => {
    if (!user || !userProfile) throw new Error('No user logged in');

    const favorites = userProfile.favoritemeditations || [];
    const isFavorite = favorites.includes(meditationId);

    const updatedFavorites = isFavorite
      ? favorites.filter(id => id !== meditationId)
      : [...favorites, meditationId];

    console.log(`${isFavorite ? '💔' : '❤️'} ${isFavorite ? 'Removing from' : 'Adding to'} favorites`);

    await updateUserProfile({
      favoritemeditations: updatedFavorites
    });
  };

  const logout = async (): Promise<void> => {
    console.log('👋 Logging out user');
    await signOut();
    setUserProfile(null);
  };

  return {
    // Clerk user object
    clerkUser: user,
    // Firebase user profile
    userProfile,
    // Auth state
    isSignedIn: isSignedIn || false,
    loading: !userLoaded || loading,
    // Basic methods
    updateUserProfile,
    logout,
    // Specialized methods
    updateAstrologicalProfile,
    updateMeditationPreferences,
    updateSpiritualGoals,
    completeOnboarding,
    completeAstroQuiz,
    trackMeditationProgress,
    toggleFavoriteMeditation,
    // Helper properties
    hasCompletedOnboarding: userProfile?.hasCompletedOnboarding || false,
    hasCompletedAstroQuiz: userProfile?.hasCompletedAstroQuiz || false,
    totalMeditationTime: userProfile?.totalMeditationTime || 0,
    completedMeditationsCount: userProfile?.completedMeditations?.length || 0,
    favoriteMeditationsCount: userProfile?.favoritemeditations?.length || 0
  };
};
