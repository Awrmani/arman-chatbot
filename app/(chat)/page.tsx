import { cookies } from 'next/headers';

import { Chat } from '@/components/custom/chat';
import { getCompanyLogoUrlbyUserId } from '@/db/queries';
import { DEFAULT_MODEL_NAME, models } from '@/lib/model';
import { generateUUID } from '@/lib/utils';


export default async function Page() {
  const id = generateUUID();
  const cookieStore = await cookies();
  const value = cookieStore.get('model')?.value;
  const selectedModelName =
    models.find((m) => m.name === value)?.name || DEFAULT_MODEL_NAME;

  const userId = "e60d57e2-1384-4286-a4a6-d746c09cb4b1";
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
