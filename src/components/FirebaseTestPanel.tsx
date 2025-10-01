import { useState } from 'react';
import { useAuth } from '../hooks/useClerkAuth';
import { Database, User, Settings, Activity, Heart, Star, Clock } from 'lucide-react';

const FirebaseTestPanel = () => {
  const { 
    clerkUser, 
    userProfile, 
    loading,
    updateUserProfile,
    updateAstrologicalProfile,
    updateMeditationPreferences,
    updateSpiritualGoals,
    completeOnboarding,
    completeAstroQuiz,
    trackMeditationProgress,
    toggleFavoriteMeditation,
    hasCompletedOnboarding,
    hasCompletedAstroQuiz,
    totalMeditationTime,
    completedMeditationsCount,
    favoriteMeditationsCount
  } = useAuth();

  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const addTestResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setTestResults(prev => [...prev, `${timestamp} ${emoji} ${message}`]);
  };

  const runFirebaseTests = async () => {
    if (!clerkUser) {
      addTestResult('Please sign in first to test Firebase integration', 'error');
      return;
    }

    setIsRunningTests(true);
    setTestResults([]);
    
    try {
      addTestResult('Starting Firebase integration tests...', 'info');

      // Test 1: Basic profile update
      addTestResult('Test 1: Updating basic profile info', 'info');
      await updateUserProfile({
        displayName: 'Test User Updated',
        firstName: 'Test',
        lastName: 'User'
      });
      addTestResult('Basic profile update successful', 'success');

      // Test 2: Astrological profile
      addTestResult('Test 2: Updating astrological profile', 'info');
      await updateAstrologicalProfile({
        sunSign: 'Leo',
        moonSign: 'Pisces',
        risingSign: 'Virgo',
        birthDate: '1990-08-15',
        birthTime: '14:30',
        birthPlace: 'New York, NY'
      });
      addTestResult('Astrological profile update successful', 'success');

      // Test 3: Meditation preferences
      addTestResult('Test 3: Updating meditation preferences', 'info');
      await updateMeditationPreferences({
        preferredDuration: 15,
        preferredTime: 'evening',
        favoriteElements: ['water', 'earth'],
        voicePreference: 'female'
      });
      addTestResult('Meditation preferences update successful', 'success');

      // Test 4: Spiritual goals
      addTestResult('Test 4: Updating spiritual goals', 'info');
      await updateSpiritualGoals(
        ['Inner Peace', 'Emotional Healing', 'Spiritual Growth'],
        ['Anxiety', 'Stress', 'Sleep Issues']
      );
      addTestResult('Spiritual goals update successful', 'success');

      // Test 5: Complete onboarding
      addTestResult('Test 5: Completing onboarding', 'info');
      await completeOnboarding();
      addTestResult('Onboarding completion successful', 'success');

      // Test 6: Complete astro quiz
      addTestResult('Test 6: Completing astro quiz', 'info');
      await completeAstroQuiz({
        sunSign: 'Leo',
        moonSign: 'Pisces',
        risingSign: 'Virgo',
        element: 'fire',
        challenges: ['Stress', 'Anxiety'],
        goals: ['Inner Peace', 'Self-Love']
      });
      addTestResult('Astro quiz completion successful', 'success');

      // Test 7: Track meditation progress
      addTestResult('Test 7: Tracking meditation progress', 'info');
      await trackMeditationProgress('meditation-test-1', 10);
      await trackMeditationProgress('meditation-test-2', 15);
      addTestResult('Meditation progress tracking successful', 'success');

      // Test 8: Toggle favorite meditation
      addTestResult('Test 8: Toggling favorite meditation', 'info');
      await toggleFavoriteMeditation('meditation-favorite-1');
      await toggleFavoriteMeditation('meditation-favorite-2');
      addTestResult('Favorite meditation toggle successful', 'success');

      addTestResult('🎉 All Firebase tests completed successfully!', 'success');

    } catch (error) {
      console.error('Firebase test error:', error);
      addTestResult(`Test failed: ${error}`, 'error');
    } finally {
      setIsRunningTests(false);
    }
  };

  const clearTestResults = () => {
    setTestResults([]);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-lavender-600"></div>
          <span className="ml-3 text-gray-600">Loading Firebase connection...</span>
        </div>
      </div>
    );
  }

  if (!clerkUser) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <Database className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Firebase Integration Test</h3>
          <p className="text-gray-600">Please sign in to test Firebase database integration</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="h-8 w-8 text-lavender-600" />
        <h2 className="text-2xl font-bold text-gray-800">Firebase Integration Test</h2>
      </div>

      {/* User Info Display */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-lavender-50 to-blush-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <User className="h-5 w-5 text-lavender-600" />
            <h3 className="font-semibold text-gray-800">Clerk User Info</h3>
          </div>
          <div className="space-y-2 text-sm">
            <p><strong>ID:</strong> {clerkUser.id}</p>
            <p><strong>Email:</strong> {clerkUser.primaryEmailAddress?.emailAddress}</p>
            <p><strong>Name:</strong> {clerkUser.fullName || 'Not set'}</p>
            <p><strong>Verified:</strong> {clerkUser.primaryEmailAddress?.verification?.status}</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Settings className="h-5 w-5 text-rose-600" />
            <h3 className="font-semibold text-gray-800">Firebase Profile</h3>
          </div>
          {userProfile ? (
            <div className="space-y-2 text-sm">
              <p><strong>Display Name:</strong> {userProfile.displayName || 'Not set'}</p>
              <p><strong>Sun Sign:</strong> {userProfile.sunSign || 'Not set'}</p>
              <p><strong>Onboarding:</strong> {hasCompletedOnboarding ? '✅' : '❌'}</p>
              <p><strong>Astro Quiz:</strong> {hasCompletedAstroQuiz ? '✅' : '❌'}</p>
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No Firebase profile found</p>
          )}
        </div>
      </div>

      {/* Stats Display */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-4 text-center">
          <Clock className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-purple-600">{totalMeditationTime}</p>
          <p className="text-sm text-gray-600">Minutes</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 text-center">
          <Activity className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-green-600">{completedMeditationsCount}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-lg p-4 text-center">
          <Heart className="h-6 w-6 text-red-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-red-600">{favoriteMeditationsCount}</p>
          <p className="text-sm text-gray-600">Favorites</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 text-center">
          <Star className="h-6 w-6 text-yellow-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-yellow-600">{userProfile?.spiritualGoals?.length || 0}</p>
          <p className="text-sm text-gray-600">Goals</p>
        </div>
      </div>

      {/* Test Controls */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={runFirebaseTests}
          disabled={isRunningTests}
          className="bg-lavender-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-lavender-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isRunningTests ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Running Tests...</span>
            </>
          ) : (
            <>
              <Database className="h-4 w-4" />
              <span>Run Firebase Tests</span>
            </>
          )}
        </button>
        
        <button
          onClick={clearTestResults}
          className="bg-gray-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-600 transition-colors"
        >
          Clear Results
        </button>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Test Results:</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono bg-white p-2 rounded border-l-4 border-l-lavender-300">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FirebaseTestPanel;
