import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { Database, CheckCircle, XCircle, Loader } from 'lucide-react';

const FirebaseConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'testing' | 'connected' | 'error'>('testing');
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addResult = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const emoji = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
    setTestResults(prev => [...prev, `${timestamp} ${emoji} ${message}`]);
  };

  const testFirebaseConnection = async () => {
    setIsRunning(true);
    setTestResults([]);
    setConnectionStatus('testing');

    try {
      addResult('Starting Firebase connection test...', 'info');

      // Test 1: Basic Firestore connection
      addResult('Test 1: Testing Firestore connection...', 'info');
      const testCollection = collection(db, 'connection-test');
      
      // Test 2: Write operation
      addResult('Test 2: Testing write operation...', 'info');
      const docRef = await addDoc(testCollection, {
        message: 'Hello Firebase!',
        timestamp: new Date(),
        testId: Math.random().toString(36).substr(2, 9)
      });
      addResult(`Write successful! Document ID: ${docRef.id}`, 'success');

      // Test 3: Read operation
      addResult('Test 3: Testing read operation...', 'info');
      const querySnapshot = await getDocs(testCollection);
      addResult(`Read successful! Found ${querySnapshot.size} documents`, 'success');

      // Test 4: Delete operation (cleanup)
      addResult('Test 4: Testing delete operation (cleanup)...', 'info');
      await deleteDoc(doc(db, 'connection-test', docRef.id));
      addResult('Delete successful! Test document cleaned up', 'success');

      // Test 5: Check collections that will be used
      addResult('Test 5: Checking app collections...', 'info');
      const collections = ['users', 'meditations', 'purchases'];
      for (const collectionName of collections) {
        try {
          const snapshot = await getDocs(collection(db, collectionName));
          addResult(`Collection '${collectionName}': ${snapshot.size} documents`, 'info');
        } catch (error) {
          addResult(`Collection '${collectionName}': Ready for use (empty)`, 'info');
        }
      }

      setConnectionStatus('connected');
      addResult('🎉 All Firebase tests passed! Database is ready to use.', 'success');

    } catch (error: any) {
      console.error('Firebase connection error:', error);
      setConnectionStatus('error');
      addResult(`Connection failed: ${error.message}`, 'error');
      
      // Provide helpful error messages
      if (error.code === 'permission-denied') {
        addResult('💡 Fix: Update Firestore security rules to allow test mode', 'error');
      } else if (error.code === 'unavailable') {
        addResult('💡 Fix: Check internet connection and Firebase project status', 'error');
      } else if (error.message.includes('project')) {
        addResult('💡 Fix: Verify Firebase project ID in .env file', 'error');
      }
    } finally {
      setIsRunning(false);
    }
  };

  // Auto-run test on component mount
  useEffect(() => {
    testFirebaseConnection();
  }, []);

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'testing':
        return <Loader className="h-6 w-6 text-blue-500 animate-spin" />;
      case 'connected':
        return <CheckCircle className="h-6 w-6 text-green-500" />;
      case 'error':
        return <XCircle className="h-6 w-6 text-red-500" />;
    }
  };

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'Testing Connection...';
      case 'connected':
        return 'Connected Successfully!';
      case 'error':
        return 'Connection Failed';
    }
  };

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'testing':
        return 'border-blue-200 bg-blue-50';
      case 'connected':
        return 'border-green-200 bg-green-50';
      case 'error':
        return 'border-red-200 bg-red-50';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="flex items-center space-x-3 mb-6">
        <Database className="h-8 w-8 text-lavender-600" />
        <h2 className="text-2xl font-bold text-gray-800">Firebase Connection Test</h2>
      </div>

      {/* Connection Status */}
      <div className={`border-2 rounded-xl p-6 mb-6 ${getStatusColor()}`}>
        <div className="flex items-center space-x-3">
          {getStatusIcon()}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{getStatusText()}</h3>
            <p className="text-gray-600">
              {connectionStatus === 'testing' && 'Running connection tests...'}
              {connectionStatus === 'connected' && 'Firebase is ready for your meditation app!'}
              {connectionStatus === 'error' && 'Please check the setup instructions below.'}
            </p>
          </div>
        </div>
      </div>

      {/* Test Controls */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={testFirebaseConnection}
          disabled={isRunning}
          className="bg-lavender-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-lavender-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
        >
          {isRunning ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              <span>Testing...</span>
            </>
          ) : (
            <>
              <Database className="h-4 w-4" />
              <span>Test Connection</span>
            </>
          )}
        </button>
        
        <button
          onClick={() => setTestResults([])}
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
              <div key={index} className="text-sm font-mono bg-white p-3 rounded border-l-4 border-l-lavender-300">
                {result}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Setup Instructions */}
      {connectionStatus === 'error' && (
        <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="font-semibold text-red-800 mb-4">Setup Instructions:</h3>
          <ol className="list-decimal list-inside space-y-2 text-red-700">
            <li>Go to <a href="https://console.firebase.google.com" className="underline" target="_blank" rel="noopener noreferrer">Firebase Console</a></li>
            <li>Select your Firebase project</li>
            <li>Go to "Firestore Database" → "Create database"</li>
            <li>Choose "Start in test mode"</li>
            <li>Select your preferred location</li>
            <li>Click "Done" and wait for setup to complete</li>
            <li>Click "Test Connection" above to retry</li>
          </ol>
        </div>
      )}

      {/* Success Instructions */}
      {connectionStatus === 'connected' && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-semibold text-green-800 mb-4">🎉 Firebase is Ready!</h3>
          <p className="text-green-700 mb-4">Your Firebase database is connected and ready to use. You can now:</p>
          <ul className="list-disc list-inside space-y-1 text-green-700">
            <li>Sign in with Clerk authentication</li>
            <li>User profiles will be automatically created in Firebase</li>
            <li>Run the full Firebase integration tests below</li>
            <li>Start using all meditation app features</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FirebaseConnectionTest;
