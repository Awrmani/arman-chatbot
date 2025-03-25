import { ProjectCard } from '@/components/custom/project-card';
import { getProjects } from '@/db/queries';

const projects = await getProjects();

const displayProjects = projects.map((project) => {
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

  return (
    <ProjectCard
      key={project.id}
      cardTitle={project.name}
      cardDescription={project.description}
      cardFooter={cardFooter}
      cardImageUrl={project.logoUrl}
      cardContent={project.content}
    />
  );
});

export function Project() {
  return (
    <>
      <div className="grid grid-cols-2 gap-12">
        {displayProjects}
      </div>
    </>
  );
}
