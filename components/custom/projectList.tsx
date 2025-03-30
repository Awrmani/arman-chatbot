import { Message, CreateMessage, ChatRequestOptions } from 'ai';

import { ProjectCard } from '@/components/custom/project-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export interface Project {
  id: number | string;
  startDate: string;
  endDate?: string | null;
  name: string;
  description: string | null;
  logoUrl: string | null;
  content: string | null;
}

const displayProjects = (
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>,
  projects?: Project[] | null,
  onProjectClick?: () => void
) => {
  if (!projects) return [];
  return projects.map((project: Project) => {
    const formattedStartDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
    }).format(new Date(project.startDate));

    const formattedEndDate = project.endDate
      ? new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
        }).format(new Date(project.endDate))
      : 'Present';

    const cardFooter = `${formattedStartDate} - ${formattedEndDate}`;

    const handleProjectClick = async () => {
      try {
        onProjectClick && onProjectClick();
        await append({
          role: 'user',
          content: `Tell me about ${project.name}!`,
        });
      } catch (error) {
        console.error('Error appending project:', error);
      }
    };

    return (
      <CarouselItem key={project.id} className="basis-1/3">
        <ProjectCard
          cardTitle={project.name}
          cardDescription={project.description}
          cardFooter={cardFooter}
          cardImageUrl={project.logoUrl}
          cardContent={project.content}
          onClick={handleProjectClick}
        />
      </CarouselItem>
    );
  });
};

export function ProjectList({
  projects,
  append,
  onProjectClick,
}: {
  projects?: Project[] | null;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions
  ) => Promise<string | null | undefined>;
  onProjectClick: () => void;
}) {
  return (
    <div className='max-w-min'>
      <Carousel
        opts={{
          align: 'center',
          loop: true,
        }}
      >
        <CarouselContent>
          {displayProjects(append, projects, onProjectClick)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
