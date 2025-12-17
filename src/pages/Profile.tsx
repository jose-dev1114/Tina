import { useUser } from '@clerk/clerk-react';
import { useAuth } from '../hooks/useClerkAuth';
import { useState, useEffect } from 'react';
import { User, Star, Calendar, Moon, Sun, MapPin, Heart, BookOpen, Award } from 'lucide-react';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const Profile = () => {
  const { user } = useUser();
  const { userProfile, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    birthDate: '',
    birthTime: '',
    birthPlace: '',
    sunSign: '',
    moonSign: '',
    risingSign: '',
    spiritualGoals: [] as string[],
    challenges: [] as string[]
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);

    if (userProfile) {
      setFormData({
        birthDate: userProfile.birthDate || '',
        birthTime: userProfile.birthTime || '',
        birthPlace: userProfile.birthPlace || '',
        sunSign: userProfile.sunSign || '',
        moonSign: userProfile.moonSign || '',
        risingSign: userProfile.risingSign || '',
        spiritualGoals: userProfile.spiritualGoals || [],
        challenges: userProfile.challenges || []
      });
    }
  }, [userProfile]);

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const spiritualGoalOptions = [
    'Inner Peace', 'Emotional Healing', 'Spiritual Growth', 'Manifestation',
    'Chakra Balancing', 'Mindfulness', 'Self-Love', 'Intuition Development'
  ];

  const challengeOptions = [
    'Anxiety', 'Stress', 'Sleep Issues', 'Self-Doubt', 'Emotional Blocks',
    'Lack of Focus', 'Relationship Issues', 'Career Uncertainty'
  ];

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-rose-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-lavender-600 to-blush-600 px-8 py-12">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  {user?.imageUrl ? (
                    <img 
                      src={user.imageUrl} 
                      alt={user.fullName || 'Profile'} 
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <User className="h-12 w-12 text-white" />
                  )}
                </div>
                <div className="text-white">
                  <h1 className="text-3xl font-serif font-bold">
                    {user?.fullName || user?.firstName || 'Sacred Soul'}
                  </h1>
                  <p className="text-primary-100 mt-2">
                    {user?.primaryEmailAddress?.emailAddress}
                  </p>
                  <div className="flex items-center mt-3 space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-300" />
                      <span className="text-sm">Soul Seeker</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">
                        Joined {new Date(user?.createdAt || '').toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Astrology Profile */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif font-bold text-ethereal-800">
                    Astrological Profile
                  </h2>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-lavender-600 text-white rounded-full hover:bg-lavender-700 transition-colors"
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                </div>

                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Birth Date
                        </label>
                        <input
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Birth Time
                        </label>
                        <input
                          type="time"
                          value={formData.birthTime}
                          onChange={(e) => setFormData({...formData, birthTime: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Birth Place
                      </label>
                      <input
                        type="text"
                        value={formData.birthPlace}
                        onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                        placeholder="City, Country"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Sun Sign
                        </label>
                        <select
                          value={formData.sunSign}
                          onChange={(e) => setFormData({...formData, sunSign: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                        >
                          <option value="">Select...</option>
                          {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(sign => (
                            <option key={sign} value={sign}>{sign}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Moon Sign
                        </label>
                        <select
                          value={formData.moonSign}
                          onChange={(e) => setFormData({...formData, moonSign: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                        >
                          <option value="">Select...</option>
                          {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(sign => (
                            <option key={sign} value={sign}>{sign}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rising Sign
                        </label>
                        <select
                          value={formData.risingSign}
                          onChange={(e) => setFormData({...formData, risingSign: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-transparent"
                        >
                          <option value="">Select...</option>
                          {['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'].map(sign => (
                            <option key={sign} value={sign}>{sign}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl">
                        <Sun className="h-8 w-8 text-orange-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-800">Sun Sign</h3>
                        <p className="text-lg font-bold text-orange-600 mt-1">
                          {userProfile?.sunSign || 'Not set'}
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                        <Moon className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-800">Moon Sign</h3>
                        <p className="text-lg font-bold text-blue-600 mt-1">
                          {userProfile?.moonSign || 'Not set'}
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
                        <Star className="h-8 w-8 text-purple-500 mx-auto mb-3" />
                        <h3 className="font-semibold text-gray-800">Rising Sign</h3>
                        <p className="text-lg font-bold text-purple-600 mt-1">
                          {userProfile?.risingSign || 'Not set'}
                        </p>
                      </div>
                    </div>

                    {userProfile?.birthDate && (
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center space-x-4 text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-5 w-5" />
                            <span>{new Date(userProfile.birthDate).toLocaleDateString()}</span>
                          </div>
                          {userProfile.birthTime && (
                            <div className="flex items-center space-x-2">
                              <span>at {userProfile.birthTime}</span>
                            </div>
                          )}
                          {userProfile.birthPlace && (
                            <div className="flex items-center space-x-2">
                              <MapPin className="h-5 w-5" />
                              <span>{userProfile.birthPlace}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Spiritual Goals */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Heart className="h-6 w-6 text-rose-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Spiritual Goals</h3>
                </div>
                <div className="space-y-2">
                  {userProfile?.spiritualGoals?.length ? (
                    userProfile.spiritualGoals.map((goal, index) => (
                      <span key={index} className="inline-block bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm mr-2 mb-2">
                        {goal}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No goals set yet</p>
                  )}
                </div>
              </div>

              {/* Progress Stats */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Award className="h-6 w-6 text-purple-500" />
                  <h3 className="text-lg font-semibold text-gray-800">Progress</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Meditations Completed</span>
                    <span className="font-bold text-purple-600">0</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Listen Time</span>
                    <span className="font-bold text-purple-600">0 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Favorite Meditations</span>
                    <span className="font-bold text-purple-600">0</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
