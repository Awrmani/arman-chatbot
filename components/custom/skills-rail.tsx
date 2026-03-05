'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export type SkillItem = {
  id: string;
  name: string;
  logoUrl: string;
};

export function SkillsRail({ skills }: { skills: SkillItem[] }) {
  const [orderedSkills, setOrderedSkills] = useState<SkillItem[]>(skills);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setOrderedSkills(skills);
  }, [skills]);

  useEffect(() => {
    if (skills.length <= 1) {
      return;
    }

    const intervalId = setInterval(() => {
      setIsAnimating(true);
    }, 2200);

    return () => clearInterval(intervalId);
  }, [skills.length]);

  const handleTransitionEnd = () => {
    if (!isAnimating) {
      return;
    }

    setOrderedSkills((currentSkills) => {
      if (currentSkills.length <= 1) {
        return currentSkills;
      }

      const [firstSkill, ...remainingSkills] = currentSkills;
      return [...remainingSkills, firstSkill];
    });

    setIsAnimating(false);
  };

  if (skills.length === 0) {
    return null;
  }

  return (
    <aside className="hidden xl:flex w-20 border-l border-border/50 bg-muted/20">
      <div className="relative size-full overflow-hidden">
        <div
          className={`absolute inset-0 flex flex-col items-center gap-4 py-6 will-change-transform ${
            isAnimating ? 'transition-transform duration-700 ease-linear' : ''
          }`}
          style={{ transform: `translateY(${isAnimating ? '-96px' : '0px'})` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {orderedSkills.map((skill) => (
            <div
              key={skill.id}
              className="relative size-20 shrink-0 rounded-2xl overflow-hidden bg-background"
              title={skill.name}
            >
              <Image
                src={skill.logoUrl}
                alt={skill.name}
                fill
                className="object-contain p-1"
                sizes="80px"
                quality={100}
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}