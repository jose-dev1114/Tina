import { SignInButton as ClerkSignInButton } from '@clerk/clerk-react';
import { LogIn } from 'lucide-react';

interface SignInButtonProps {
  mode?: 'modal' | 'redirect';
  className?: string;
  children?: React.ReactNode;
}

const SignInButton = ({
  mode = 'modal',
  className = "bg-ethereal-800 text-white px-6 py-3 rounded-full font-medium hover:bg-ethereal-700 transition-colors duration-200 flex items-center justify-center space-x-2",
  children
}: SignInButtonProps) => {
  return (
    <ClerkSignInButton mode={mode}>
      <button className={className}>
        <div className="flex items-center justify-center space-x-2">
          {children || (
            <>
              <LogIn className="h-4 w-4" />
              <span>Sign In</span>
            </>
          )}
        </div>
      </button>
    </ClerkSignInButton>
  );
};

export default SignInButton;
