import { cookies } from 'next/headers';

import { auth } from '@/app/(auth)/auth';
import { Chat } from '@/components/custom/chat';
import { Project } from '@/components/custom/project';
import { getCompanyLogoUrlbyUserId } from '@/db/queries';
import { DEFAULT_MODEL_NAME, models } from '@/lib/model';
import { generateUUID } from '@/lib/utils';


export default async function Page() {
  const id = generateUUID();
  const cookieStore = await cookies();
  const value = cookieStore.get('model')?.value;
  const selectedModelName =
    models.find((m) => m.name === value)?.name || DEFAULT_MODEL_NAME;

  const session = await auth();
  const userId = session?.user?.id || '';
  
  const { url } = await getCompanyLogoUrlbyUserId(userId);

  return (
      <Chat
        key={id}
        id={id}
        initialMessages={[]}
        selectedModelName={selectedModelName}
        logoUrl={url}
      />
  );
}
