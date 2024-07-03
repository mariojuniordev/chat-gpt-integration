"use client";

import { useAssistant } from "ai/react";
import { ArrowUpIcon, AvatarIcon, CircleIcon } from "@radix-ui/react-icons";
import { useEffect, useRef } from "react";

export default function Home() {
  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({
      api: "/api/assistant",
      /* threadId: "thread_6CqZ9MBU111u9hZ24k0ucBjf", */
    });

  const mainRef = useRef<HTMLFormElement | null>(null);

  /* console.log("MESSAGES", messages); */

  const scrollToBottom = () => {
    if (mainRef.current) {
      mainRef.current.scrollTo({
        top: mainRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, status]);

  return (
    <form
      onSubmit={submitMessage}
      className="p-4 flex flex-col h-screen bg-neutral-200 overflow-auto"
      ref={mainRef}
    >
      <div className="flex flex-col p-2 gap-2 mb-[70px]">
        {messages.map((message) => (
          <div key={message.id} className="flex flex-row gap-2">
            {message.role === "user" ? (
              <AvatarIcon className="h-8 w-8 flex-shrink-0" />
            ) : (
              <CircleIcon className="h-8 w-8 flex-shrink-0" />
            )}
            <p className="w-full">{message.content}</p>
          </div>
        ))}

        {status === "in_progress" && <p>Loading...</p>}
      </div>

      <div className="fixed bottom-0 right-0 left-0 w-full bg-neutral-50 flex flex-row items-center gap-5 py-2 px-4 mt-auto mb-4 border border-solid border-neutral-500 rounded-full">
        <input
          type="text"
          value={input}
          placeholder="Message AI..."
          onChange={handleInputChange}
          className="w-full bg-transparent border-none outline-none"
        />

        <button type="submit" className="rounded-full bg-neutral-800 p-2">
          <ArrowUpIcon className="h-5 w-5 stroke-neutral-50" />
        </button>
      </div>
    </form>
  );
}
