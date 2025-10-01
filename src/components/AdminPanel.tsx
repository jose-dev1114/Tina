import { useState } from 'react';
import { Database, Upload, Download, Users, BookOpen, Calendar } from 'lucide-react';
import { seedDatabase } from '../utils/seedData';
import { meditationService, userService, purchaseService } from '../services/firebaseService';
import FirebaseTestPanel from './FirebaseTestPanel';
import FirebaseConnectionTest from './FirebaseConnectionTest';

const AdminPanel = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedStatus, setSeedStatus] = useState<string>('');
  const [stats, setStats] = useState({
    users: 0,
    meditations: 0,
    purchases: 0
  });

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedStatus('Starting database seeding...');
    
    try {
      await seedDatabase();
      setSeedStatus('Database seeded successfully!');
      await loadStats();
    } catch (error) {
      console.error('Seeding error:', error);
      setSeedStatus(`Error seeding database: ${error}`);
    } finally {
      setIsSeeding(false);
    }
  };

  const loadStats = async () => {
    try {
      const [users, meditations, purchases] = await Promise.all([
        userService.getAll(),
        meditationService.getAll(),
        purchaseService.getAll()
      ]);

      setStats({
        users: users.length,
        meditations: meditations.length,
        purchases: purchases.length
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const exportData = async (collection: string) => {
    try {
      let data;
      switch (collection) {
        case 'meditations':
          data = await meditationService.getAll();
          break;
        case 'users':
          data = await userService.getAll();
          break;
        case 'purchases':
          data = await purchaseService.getAll();
          break;
        default:
          return;
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${collection}-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <Database className="h-8 w-8 text-purple-600 mr-3" />
        <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
      </div>

      {/* Database Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Total Users</p>
              <p className="text-3xl font-bold">{stats.users}</p>
            </div>
            <Users className="h-12 w-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Meditations</p>
              <p className="text-3xl font-bold">{stats.meditations}</p>
            </div>
            <BookOpen className="h-12 w-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Purchases</p>
              <p className="text-3xl font-bold">{stats.purchases}</p>
            </div>
            <Calendar className="h-12 w-12 text-green-200" />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-6">
        {/* Database Seeding */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Database Management</h2>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              onClick={handleSeedDatabase}
              disabled={isSeeding}
              className="flex items-center justify-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Upload className="h-5 w-5 mr-2" />
              {isSeeding ? 'Seeding...' : 'Seed Database'}
            </button>

            <button
              onClick={loadStats}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Database className="h-5 w-5 mr-2" />
              Refresh Stats
            </button>
          </div>

          {seedStatus && (
            <div className={`p-4 rounded-lg ${
              seedStatus.includes('Error') 
                ? 'bg-red-100 text-red-700 border border-red-200' 
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              {seedStatus}
            </div>
          )}
        </div>

        {/* Data Export */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Data Export</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => exportData('meditations')}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Meditations
            </button>

            <button
              onClick={() => exportData('users')}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Users
            </button>

            <button
              onClick={() => exportData('purchases')}
              className="flex items-center justify-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              <Download className="h-5 w-5 mr-2" />
              Export Purchases
            </button>
          </div>
        </div>

        {/* Instructions */}
        <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">Setup Instructions</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Create a Firebase project at <a href="https://console.firebase.google.com" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
            <li>Enable Firestore Database and Authentication</li>
            <li>Copy your Firebase config to <code className="bg-gray-200 px-2 py-1 rounded">.env</code> file</li>
            <li>Deploy security rules: <code className="bg-gray-200 px-2 py-1 rounded">firebase deploy --only firestore:rules</code></li>
            <li>Click "Seed Database" to populate initial data</li>
            <li>Set up Firebase Storage for meditation audio files</li>
          </ol>
        </div>
      </div>

      {/* Firebase Connection Test */}
      <div className="mt-8">
        <FirebaseConnectionTest />
      </div>

      {/* Firebase Integration Test Panel */}
      <div className="mt-8">
        <FirebaseTestPanel />
      </div>
    </div>
  );
};

export default AdminPanel;
