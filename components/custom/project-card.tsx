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
  cardDescription: string;
  cardFooter: string;
  cardImageUrl: string;
  cardContent: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription>{cardDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-video">
          <Image
            className="object-cover"
            fill
            src={cardImageUrl}
            alt={'Project - ' + cardTitle}
          ></Image>
        </div>
        <div className="mt-2">{cardContent}</div>
      </CardContent>
      <CardFooter>{cardFooter}</CardFooter>
    </Card>
  );
}
