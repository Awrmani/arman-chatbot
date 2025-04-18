'use client';

import { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import Image from 'next/image';
import { useState } from 'react';


import { ChatHeader } from '@/components/custom/chat-header';
import { Message as PreviewMessage } from '@/components/custom/message';
import { type Project, ProjectList } from '@/components/custom/projectList';
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
import { Model } from '@/lib/model';

import { MultimodalInput } from './multimodal-input';

export function Chat({
  id,
  initialMessages,
  selectedModelName,
  logoUrl,
  projects,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelName: Model['name'];
  logoUrl?: string | null;
  projects?: Project[] | null;
}) {
  const { messages, handleSubmit, input, setInput, append, isLoading, stop } =
    useChat({
      body: { id, model: selectedModelName },
      initialMessages,
      onFinish: () => {
        window.history.replaceState({}, '', `/chat/${id}`);
      },
    });

  const [messagesContainerRef, messagesEndRef] =
    useScrollToBottom<HTMLDivElement>();

  const [attachments, setAttachments] = useState<Array<Attachment>>([]);
  const [displayProjects, setDisplayProjects] = useState<boolean>(false);

  return (
    (
      <div className="flex flex-col min-w-0 h-dvh bg-background">
        <ChatHeader
          displayProjectsButton={messages.length > 0 ? true : false}
          selectedModelName={selectedModelName}
          handleDisplayProjects={() => setDisplayProjects(!displayProjects)}
          displayProjects={displayProjects}
        />
        <div
          ref={messagesContainerRef}
          className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll"
        >
          {messages.length === 0 || displayProjects === true ? (
            <div className="m-auto">
              <ProjectList
                projects={projects}
                append={append}
                // Pass a callback to let a child change displayProjects value
                onProjectClick={() => setDisplayProjects(false)}
              />
            </div>
          ) : (
            messages.map((message) => (
              <PreviewMessage
                key={message.id}
                role={message.role}
                content={message.content}
                attachments={message.experimental_attachments}
                toolInvocations={message.toolInvocations}
              />
            ))
          )}

          <div
            ref={messagesEndRef}
            className="shrink-0 min-w-[24px] min-h-[24px]"
          />
        </div>
        <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-3 w-full md:max-w-3xl">
          <div className="self-end relative mb-8 w-20 aspect-square" />
          <MultimodalInput
            input={input}
            setInput={setInput}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            stop={stop}
            attachments={attachments}
            setAttachments={setAttachments}
            messages={messages}
            append={append}
          />
          <div className="self-end relative w-16 aspect-square rounded-full">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Company Logo"
                className="object-cover rounded-lg"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={true}
              />
            ) : null}{' '}
          </div>
        </form>
      </div>
    )
  );
}
