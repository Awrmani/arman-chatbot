import {clsx} from 'clsx';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';

import { ModelSelector } from '@/components/custom/model-selector';
import { SidebarToggle } from '@/components/custom/sidebar-toggle';
import { Button } from '@/components/ui/button';
import { BetterTooltip } from '@/components/ui/tooltip';
import { Model } from '@/lib/model';

export function ChatHeader({
  selectedModelName,
  displayProjectsButton = true,
  handleDisplayProjects,
  displayProjects = false,
}: {
  selectedModelName: Model['name'];
  displayProjectsButton?: boolean;
  handleDisplayProjects: () => void;
  displayProjects?: boolean;
}) {
  const prevDisplayProjectsButtonRef = useRef(displayProjectsButton);
  const [newBtnBounce, setNewBtnBounce] = useState(false);

  const onBtnClick = useCallback(() => {
    setNewBtnBounce(false);
    handleDisplayProjects();
  }, [handleDisplayProjects]);
  
  useEffect(() => {
    if (!prevDisplayProjectsButtonRef.current && displayProjectsButton) {
      setNewBtnBounce(true);
    }
    prevDisplayProjectsButtonRef.current = displayProjectsButton;
  }, [displayProjectsButton]);
  
  return (
    <header className="flex h-16 sticky top-0 bg-background md:h-12 items-center px-2 md:px-2 z-10">
      <SidebarToggle />
      <BetterTooltip content="New Chat">
        <Button
          variant="ghost"
          className="w-auto md:size-8 [&>svg]:!size-5 md:[&>svg]:!size-4 pl-2 md:p-0 order-2 md:order-1 ml-auto md:ml-0 md:hidden group-data-[state=collapsed]/sidebar-wrapper:flex"
          asChild
        >
          <Link href="/">
            <Plus />
            <span className="md:sr-only">New Chat</span>
          </Link>
        </Button>
      </BetterTooltip>
      <ModelSelector
        selectedModelName={selectedModelName}
        className="order-1 md:order-2"
      />
      {displayProjectsButton && (
        <Button
          variant="ghost"
          className={clsx(
            'w-fit data-[state=open]:bg-accent data-[state=open]:text-accent-foreground md:h-8 [&>svg]:!size-5 md:[&>svg]:!size-4 order-1 md:order-2',
            displayProjects && 'bg-accent text-accent-foreground',
            newBtnBounce && 'animate-bounce',
          )}
          onClick={onBtnClick}
        >
          {displayProjects ? 'Hide Projects' : 'Display Projects'}
        </Button>
      )}
    </header>
  );
}
