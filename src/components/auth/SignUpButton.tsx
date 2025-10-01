import { SignUpButton as ClerkSignUpButton } from '@clerk/clerk-react';
import { UserPlus } from 'lucide-react';

interface SignUpButtonProps {
  mode?: 'modal' | 'redirect';
  className?: string;
  children?: React.ReactNode;
}

const SignUpButton = ({
  mode = 'modal',
  className = "bg-lavender-600 text-white px-6 py-3 rounded-full font-medium hover:bg-lavender-700 transition-colors duration-200 flex items-center justify-center space-x-2",
  children
}: SignUpButtonProps) => {
  return (
    <ClerkSignUpButton mode={mode}>
      <button className={className}>
        <div className="flex items-center justify-center space-x-2">
          {children || (
            <>
              <UserPlus className="h-4 w-4" />
              <span>Sign Up</span>
            </>
          )}
        </div>
      </button>
    </ClerkSignUpButton>
  );
};

export default SignUpButton;
