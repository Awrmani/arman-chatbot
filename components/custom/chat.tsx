'use client';

import { Attachment, Message } from 'ai';
import { useChat } from 'ai/react';
import { useState, useEffect } from 'react';

import { ChatHeader } from '@/components/custom/chat-header';
import { Message as PreviewMessage } from '@/components/custom/message';
import { useScrollToBottom } from '@/components/custom/use-scroll-to-bottom';
import { getCompanyLogoUrlbyUserId } from '@/db/queries';
import { Model } from '@/lib/model';

import { MultimodalInput } from './multimodal-input';
import { Overview } from './overview';

export function Chat({
  id,
  initialMessages,
  selectedModelName,
}: {
  id: string;
  initialMessages: Array<Message>;
  selectedModelName: Model['name'];
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

  const userId = "e60d57e2-1384-4286-a4a6-d746c09cb4b1";
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    async function fetchLogoUrl() {
      const url = await getCompanyLogoUrlbyUserId(userId);
      setLogoUrl(url);
    }
    fetchLogoUrl();
  }, [userId]);

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background">
      <ChatHeader selectedModelName={selectedModelName} />
      <div
        ref={messagesContainerRef}
        className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll"
      >
        {messages.length === 0 && <Overview blob={logoUrl}></Overview>}

        {messages.map((message) => (
          <PreviewMessage
            key={message.id}
            role={message.role}
            content={message.content}
            attachments={message.experimental_attachments}
            toolInvocations={message.toolInvocations}
          />
        ))}

        <div
          ref={messagesEndRef}
          className="shrink-0 min-w-[24px] min-h-[24px]"
        />
      </div>
      <form className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
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
      </form>
    </div>
  );
}
