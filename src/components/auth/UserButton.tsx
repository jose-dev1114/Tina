import { UserButton as ClerkUserButton, useUser } from '@clerk/clerk-react';
import { Sparkles } from 'lucide-react';

interface UserButtonProps {
  afterSignOutUrl?: string;
  showName?: boolean;
}

const UserButton = ({
  afterSignOutUrl = '/',
  showName = false
}: UserButtonProps) => {
  const { user } = useUser();
  const firstName = user?.firstName || 'there';

  return (
    <div className="flex items-center space-x-2">
      {showName && (
        <span className="text-primary-700 font-medium">
          Hi {firstName}
        </span>
      )}
      <ClerkUserButton
        afterSignOutUrl={afterSignOutUrl}
        appearance={{
          elements: {
            avatarBox: "w-10 h-10",
            userButtonPopoverCard: "shadow-lg border border-gray-200",
            userButtonPopoverActionButton: "hover:bg-lavender-50",
            userButtonPopoverActionButtonText: "text-gray-700",
            userButtonPopoverFooter: "hidden" // Hide Clerk branding
          }
        }}
      >
        <ClerkUserButton.MenuItems>
          <ClerkUserButton.Link
            label="Lunar Portal"
            labelIcon={<Sparkles size={16} />}
            href="/dashboard"
          />
        </ClerkUserButton.MenuItems>
      </ClerkUserButton>
    </div>
  );
};

export default UserButton;
