import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User } from '../types/database';

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersRef = collection(db, 'users');
        const q = query(usersRef, orderBy('createdAt', 'desc'));
        const snapshot = await getDocs(q);
        
        const usersData = snapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id
        })) as User[];
        
        setUsers(usersData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">👥 User Database</h1>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/20 bg-white/5">
                  <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Username</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Phone</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Moon Sign</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Sun Sign</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Joined</th>
                  <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-white/10 hover:bg-white/5 transition">
                    <td className="px-6 py-4 text-white text-sm">{user.email}</td>
                    <td className="px-6 py-4 text-white text-sm">{user.username || '-'}</td>
                    <td className="px-6 py-4 text-white text-sm">
                      {user.displayName || `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-white text-sm">{user.phone || '-'}</td>
                    <td className="px-6 py-4 text-white text-sm">{user.moonSign || '-'}</td>
                    <td className="px-6 py-4 text-white text-sm">{user.sunSign || '-'}</td>
                    <td className="px-6 py-4 text-white text-sm">
                      {user.createdAt ? new Date(user.createdAt as any).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.membershipStatus === 'active'
                          ? 'bg-green-500/20 text-green-200'
                          : 'bg-gray-500/20 text-gray-200'
                      }`}>
                        {user.membershipStatus || 'free'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="p-8 text-center text-white/60">
              No users found in database
            </div>
          )}
        </div>

        <div className="mt-8 p-6 bg-white/5 rounded-lg border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-4">📊 Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-white/60 text-sm">Total Users</div>
              <div className="text-3xl font-bold text-white">{users.length}</div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-white/60 text-sm">With Astro Data</div>
              <div className="text-3xl font-bold text-white">
                {users.filter(u => u.moonSign || u.sunSign).length}
              </div>
            </div>
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-white/60 text-sm">Premium Members</div>
              <div className="text-3xl font-bold text-white">
                {users.filter(u => u.membershipStatus === 'active').length}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed User View */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-4">📋 Detailed User Information</h2>
          <div className="space-y-4">
            {users.slice(0, 5).map((user) => (
              <details key={user.id} className="bg-white/5 border border-white/20 rounded-lg p-4 cursor-pointer hover:bg-white/10 transition">
                <summary className="font-semibold text-white flex justify-between items-center">
                  <span>{user.email}</span>
                  <span className="text-sm text-white/60">{user.clerkUserId}</span>
                </summary>
                <div className="mt-4 space-y-2 text-white/80 text-sm">
                  <div><strong>Display Name:</strong> {user.displayName || 'N/A'}</div>
                  <div><strong>First Name:</strong> {user.firstName || 'N/A'}</div>
                  <div><strong>Last Name:</strong> {user.lastName || 'N/A'}</div>
                  <div><strong>Username:</strong> {user.username || 'N/A'}</div>
                  <div><strong>Phone:</strong> {user.phone || 'N/A'}</div>
                  <div><strong>Email Verified:</strong> {user.emailVerified ? '✅' : '❌'}</div>
                  <div><strong>Birth Date:</strong> {user.birthDate || 'N/A'}</div>
                  <div><strong>Birth Time:</strong> {user.birthTime || 'N/A'}</div>
                  <div><strong>Birth Place:</strong> {user.birthPlace || 'N/A'}</div>
                  <div><strong>Sun Sign:</strong> {user.sunSign || 'N/A'}</div>
                  <div><strong>Moon Sign:</strong> {user.moonSign || 'N/A'}</div>
                  <div><strong>Rising Sign:</strong> {user.risingSign || 'N/A'}</div>
                  <div><strong>Membership Tier:</strong> {user.membershipTier || 'N/A'}</div>
                  <div><strong>Subscription Status:</strong> {user.subscriptionStatus || 'N/A'}</div>
                  <div><strong>Total Meditation Time:</strong> {user.totalMeditationTime || 0} minutes</div>
                  <div><strong>Current Streak:</strong> {user.currentStreak || 0} days</div>
                  <div><strong>Longest Streak:</strong> {user.longestStreak || 0} days</div>
                  <div><strong>Completed Onboarding:</strong> {user.hasCompletedOnboarding ? '✅' : '❌'}</div>
                  <div><strong>Completed Astro Quiz:</strong> {user.hasCompletedAstroQuiz ? '✅' : '❌'}</div>
                  <div><strong>Created At:</strong> {user.createdAt ? new Date(user.createdAt as any).toLocaleString() : 'N/A'}</div>
                  <div><strong>Last Login:</strong> {user.lastLoginAt ? new Date(user.lastLoginAt as any).toLocaleString() : 'N/A'}</div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

