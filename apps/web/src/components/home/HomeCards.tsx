'use client';

import { Card } from '@jynta/ui';

interface HomeCardsProps {
  isLoggedIn: boolean;
}

export function HomeCards({ isLoggedIn }: HomeCardsProps) {
  function handleClick(target: string) {
    if (!isLoggedIn) {
      window.location.href = '/sign-in';
      return;
    }
    window.location.href = target;
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 md:grid md:grid-cols-3">
      <Card
        icon="🟦"
        title="Assistant"
        description="Chat • Create • Learn"
        onClick={() => handleClick('/assistant')}
        className="min-h-[100px] w-full"
      />
      <Card
        icon="🟩"
        title="Memory"
        description="Save • Store • Manage"
        onClick={() => handleClick('/memory')}
        className="min-h-[100px] w-full"
      />
      <Card
        icon="🟨"
        title="Automation"
        description="AI Agents • Tasks"
        onClick={() => handleClick('/automation')}
        className="min-h-[100px] w-full"
      />
    </div>
  );
}
