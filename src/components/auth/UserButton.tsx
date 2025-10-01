import { UserButton as ClerkUserButton } from '@clerk/clerk-react';

interface UserButtonProps {
  afterSignOutUrl?: string;
  showName?: boolean;
}

const UserButton = ({ 
  afterSignOutUrl = '/',
  showName = false 
}: UserButtonProps) => {
  return (
    <ClerkUserButton 
      afterSignOutUrl={afterSignOutUrl}
      showName={showName}
      appearance={{
        elements: {
          avatarBox: "w-10 h-10",
          userButtonPopoverCard: "shadow-lg border border-gray-200",
          userButtonPopoverActionButton: "hover:bg-lavender-50",
          userButtonPopoverActionButtonText: "text-gray-700",
          userButtonPopoverFooter: "hidden" // Hide Clerk branding
        }
      }}
    />
  );
};

export default UserButton;
