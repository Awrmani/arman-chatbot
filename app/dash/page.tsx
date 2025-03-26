'use client';

import { ProjectCard } from '@/components/custom/project-card';



export default function Page() {
  return (
    <>
      <div className="flex gap-4 space-between">
        <ProjectCard
          cardTitle="Project Title"
          cardDescription="Project Description"
          cardFooter="Project Footer"
          cardImageUrl="https://qq5zqpo4wcrtelgo.public.blob.vercel-storage.com/companyLogos/robinhood-RhMO7eMCo5I0dapQg3g1DdEG9Oz9sf.png"
          cardContent="Project Content"
        />
        <ProjectCard
          cardTitle="Project Title"
          cardDescription="Project Description"
          cardFooter="Project Footer"
          cardImageUrl="https://qq5zqpo4wcrtelgo.public.blob.vercel-storage.com/companyLogos/rbc-LuGPHvxke8xyqVFTcK2wDU9qPskcbB.png"
          cardContent="Project Content"
        />
      </div>
    </>
  );
}
