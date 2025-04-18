import { CoreMessage } from 'ai';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';

import { auth } from '@/app/(auth)/auth';
import { Chat as PreviewChat } from '@/components/custom/chat';
import { getChatById, getCompanyLogoUrlbyUserId, getProjects } from '@/db/queries';
import { Chat } from '@/db/schema';
import { DEFAULT_MODEL_NAME, models } from '@/lib/model';
import { convertToUIMessages } from '@/lib/utils';

export default async function Page(props: { params: Promise<any> }) {
  const params = await props.params;
  const { id } = params;
  const chatFromDb = await getChatById({ id });

  if (!chatFromDb) {
    notFound();
  }

  // type casting
  const chat: Chat = {
    ...chatFromDb,
    messages: convertToUIMessages(chatFromDb.messages as Array<CoreMessage>),
  };

  const session = await auth();

  if (!session || !session.user) {
    return notFound();
  }

  if (session.user.id !== chat.userId) {
    return notFound();
  }

  const cookieStore = await cookies();
  const value = cookieStore.get('model')?.value;
  const selectedModelName =
    models.find((m) => m.name === value)?.name || DEFAULT_MODEL_NAME;

  const url = await getCompanyLogoUrlbyUserId({ id: chat.userId });
  const projects = await getProjects();

  return (
      <PreviewChat
        id={chat.id}
        initialMessages={chat.messages}
        selectedModelName={selectedModelName}
        logoUrl={url?.url || ''}
        projects={projects}
      />
  );
}
