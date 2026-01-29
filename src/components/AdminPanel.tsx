import { useState, useEffect } from 'react';
import { Users, Calendar, Lock, Eye, EyeOff, Moon, Sun, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { userService } from '../services/firebaseService';
import { User } from '../types/database';

// Admin credentials (in production, use environment variables or secure auth)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'OurHealingPractices2026!';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [expandedUser, setExpandedUser] = useState<string | null>(null);

  // Check if already authenticated (session storage)
  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuthenticated');
    if (isAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Auto-load users when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAllUsers();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuthenticated', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuthenticated');
    setUsername('');
    setPassword('');
  };

  const loadAllUsers = async () => {
    setLoadingUsers(true);
    try {
      const users = await userService.getAll();
      setAllUsers(users);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoadingUsers(false);
    }
  };

  // Login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg mt-20">
        <div className="flex items-center justify-center mb-6">
          <Lock className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent pr-10"
                placeholder="Enter password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {loginError}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Star className="h-8 w-8 text-purple-600 mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Users Birth Charts</h1>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* Users Birth Charts */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold text-gray-700">
            {allUsers.length > 0 ? `${allUsers.length} Users` : 'All Users'}
          </span>
          <button
            onClick={loadAllUsers}
            disabled={loadingUsers}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50"
          >
            {loadingUsers ? 'Loading...' : 'Load Users'}
          </button>
        </div>

          {allUsers.length > 0 && (
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {allUsers.map((user) => (
                <div key={user.id} className="border border-gray-200 rounded-lg overflow-hidden">
                  {/* User Header - Clickable */}
                  <button
                    onClick={() => setExpandedUser(expandedUser === user.id ? null : user.id)}
                    className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="" className="w-10 h-10 rounded-full" />
                        ) : (
                          <Users className="h-5 w-5 text-purple-600" />
                        )}
                      </div>
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{user.displayName || user.firstName || 'Unknown'}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {user.birthChartData ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Has Chart</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">No Chart</span>
                      )}
                      {expandedUser === user.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </button>

                  {/* Expanded User Details */}
                  {expandedUser === user.id && (
                    <div className="p-4 bg-white border-t border-gray-200">
                      <div className="grid md:grid-cols-2 gap-6">
                        {/* Birth Info */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            Birth Information
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                            <p><span className="text-gray-500">Date:</span> <span className="font-medium">{user.birthDate || 'N/A'}</span></p>
                            <p><span className="text-gray-500">Time:</span> <span className="font-medium">{user.birthTime || 'N/A'}</span></p>
                            <p><span className="text-gray-500">Place:</span> <span className="font-medium">{user.birthPlace || 'N/A'}</span></p>
                            {/* <p><span className="text-gray-500">Timezone:</span> <span className="font-medium">{user.timezone || 'N/A'}</span></p> */}
                          </div>
                        </div>

                        {/* Astrological Signs */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-gray-700 flex items-center">
                            <Star className="h-4 w-4 mr-2" />
                            Astrological Signs
                          </h4>
                          <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-sm">
                            <p className="flex items-center">
                              <Sun className="h-4 w-4 mr-2 text-yellow-500" />
                              <span className="text-gray-500">Sun:</span>
                              <span className="font-medium ml-2">{user.birthChartData?.sunSign || user.sunSign || 'N/A'}</span>
                            </p>
                            <p className="flex items-center">
                              <Moon className="h-4 w-4 mr-2 text-blue-400" />
                              <span className="text-gray-500">Moon:</span>
                              <span className="font-medium ml-2">{user.birthChartData?.moonSign || user.moonSign || 'N/A'}</span>
                              {user.birthChartData?.moonHouse && (
                                <span className="ml-2 text-gray-400">(House {user.birthChartData.moonHouse})</span>
                              )}
                            </p>
                            {/* <p className="flex items-center">
                              <Star className="h-4 w-4 mr-2 text-purple-500" />
                              <span className="text-gray-500">Rising:</span>
                              <span className="font-medium ml-2">{user.birthChartData?.risingSign || user.risingSign || 'N/A'}</span>
                            </p> */}
                          </div>
                        </div>

                        {/* Chart Image */}
                        {user.birthChartData?.chartUrl && (
                          <div className="md:col-span-2">
                            <h4 className="font-semibold text-gray-700 mb-3">Birth Chart</h4>
                            <div className="bg-gray-900 rounded-lg p-4 flex justify-center">
                              <img
                                src={user.birthChartData.chartUrl}
                                alt="Birth Chart"
                                className="max-w-full max-h-80 rounded"
                              />
                            </div>
                          </div>
                        )}

                        {/* Raw Data (Collapsible) */}
                        {user.birthChartData && (
                          <div className="md:col-span-2">
                            <details className="bg-gray-50 rounded-lg">
                              <summary className="p-3 cursor-pointer font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                                View Raw Chart Data
                              </summary>
                              <pre className="p-3 text-xs overflow-x-auto bg-gray-900 text-green-400 rounded-b-lg">
                                {JSON.stringify(user.birthChartData, null, 2)}
                              </pre>
                            </details>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

        {allUsers.length === 0 && !loadingUsers && (
          <p className="text-gray-500 text-center py-8">Click "Load Users" to view all users and their birth charts</p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
