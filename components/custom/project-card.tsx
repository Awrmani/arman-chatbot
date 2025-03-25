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
}: {
  cardTitle: string;
  cardDescription: string | null;
  cardFooter: string;
  cardImageUrl: string | null;
  cardContent: string | null;
}) {
  return (
    <Card className='group cursor-pointer hover:bg-zinc-900'
      onClick={() => {
        console.log('ProjectCard Clicked');
      }
    }>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent className='max-w-80'>
        <div className="relative w-72 [aspect-ratio:5/2]">
          <Image
            className="object-fill"
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
