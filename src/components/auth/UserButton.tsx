import { UserButton as ClerkUserButton } from '@clerk/clerk-react';
import { Sparkles } from 'lucide-react';

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
    >
      <ClerkUserButton.MenuItems>
        <ClerkUserButton.Link
          label="Lunar Portal"
          labelIcon={<Sparkles size={16} />}
          href="/portal"
        />
      </ClerkUserButton.MenuItems>
    </ClerkUserButton>
  );
};

export default UserButton;
