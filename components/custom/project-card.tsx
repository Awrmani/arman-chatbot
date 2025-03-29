'use client';

import Image from 'next/image';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ProjectCard({
  cardTitle,
  cardDescription,
  cardFooter,
  cardImageUrl,
  cardContent,
  onClick,
}: {
  cardTitle: string;
  cardDescription: string | null;
  cardFooter: string;
  cardImageUrl: string | null;
  cardContent: string | null;
  onClick: () => void;
}) {
  return (
    <Card className='group cursor-pointer hover:bg-zinc-900 max-w-80'
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative [aspect-ratio:5/2]">
            <Image
            className="object-contain object-center group-hover:opacity-80 transition-opacity duration-300 ease-in-out rounded-lg mx-auto"
            fill
            src={
              cardImageUrl ||
              'https://qq5zqpo4wcrtelgo.public.blob.vercel-storage.com/placeholder-image-czZLITHg8WsprbclOsiiAxP79hwZO2.png'
            }
            alt={'Project - ' + cardTitle}
            ></Image>
        </div>
        <div className="mt-2">{cardContent}</div>
      </CardContent>
      <CardFooter>{cardFooter}</CardFooter>
    </Card>
  );
}
