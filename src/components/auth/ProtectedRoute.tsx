import { useAuth } from '@clerk/clerk-react';
import { ReactNode } from 'react';
import SignInButton from './SignInButton';
import SignUpButton from './SignUpButton';
import { Lock, Star } from 'lucide-react';

interface ProtectedRouteProps {
  children: ReactNode;
  fallback?: ReactNode;
  requireAuth?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  fallback,
  requireAuth = true 
}: ProtectedRouteProps) => {
  const { isSignedIn, isLoaded } = useAuth();

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-lavender-600"></div>
      </div>
    );
  }

  // If auth is not required, always show children
  if (!requireAuth) {
    return <>{children}</>;
  }

  // If user is signed in, show protected content
  if (isSignedIn) {
    return <>{children}</>;
  }

  // Show custom fallback or default sign-in prompt
  if (fallback) {
    return <>{fallback}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="w-16 h-16 bg-lavender-gradient rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="h-8 w-8 text-white" />
        </div>
        
        <h2 className="text-2xl font-serif font-bold text-ethereal-800 mb-4">
          Sacred Access Required
        </h2>
        
        <p className="text-ethereal-600 mb-8 leading-relaxed">
          Join our spiritual community to access personalized meditations, 
          track your progress, and connect with like-minded souls.
        </p>

        <div className="space-y-4">
          <SignUpButton 
            className="w-full bg-lavender-600 text-white px-6 py-4 rounded-full font-medium hover:bg-lavender-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <Star className="h-5 w-5" />
            <span>Create Sacred Account</span>
          </SignUpButton>
          
          <SignInButton 
            className="w-full bg-white text-ethereal-800 px-6 py-4 rounded-full font-medium hover:bg-ethereal-50 transition-colors duration-200 flex items-center justify-center space-x-2 border border-ethereal-200"
          >
            <span>Sign In to Continue</span>
          </SignInButton>
        </div>

        <p className="text-sm text-ethereal-500 mt-6">
          Free to join • Secure authentication • Google sign-in available
        </p>
      </div>
    </div>
  );
};

export default ProtectedRoute;
