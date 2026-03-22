"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { ChatMessage } from "@/lib/types";

type AIChatPanelProps = {
  courseTitle: string;
  lessonTitle: string;
};

function buildReply(question: string, courseTitle: string, lessonTitle: string) {
  const normalized = question.toLowerCase();

  if (normalized.includes("summary")) {
    return `Here is a quick summary of "${lessonTitle}": focus on the core concept, connect it to the earlier lessons in ${courseTitle}, and try one small practical example before moving on.`;
  }

  if (normalized.includes("quiz") || normalized.includes("practice")) {
    return `Try this practice prompt: explain the main idea from "${lessonTitle}" in your own words, then apply it in a tiny project step. If you want, I can generate 3 quiz questions next.`;
  }

  if (normalized.includes("easy") || normalized.includes("simple")) {
    return `In simple terms, "${lessonTitle}" is about breaking the concept into one clear mental model, one example, and one action you can repeat. That usually makes the rest of the lesson much easier to follow.`;
  }

  return `For "${lessonTitle}", I'd focus on three things: the core definition, why it matters in ${courseTitle}, and one example you can rebuild yourself. If you want, ask me for a summary, analogy, or practice quiz.`;
}

export function AIChatPanel({ courseTitle, lessonTitle }: AIChatPanelProps) {
  const [open, setOpen] = useState(true);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: `I'm your Sikho AI tutor. Ask anything about "${lessonTitle}" and I'll keep the answer focused on the lesson.`
    }
  ]);

  function handleSend() {
    if (!input.trim()) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: input.trim()
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setTyping(true);

    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: buildReply(userMessage.content, courseTitle, lessonTitle)
        }
      ]);
      setTyping(false);
    }, 750);
  }

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.aside
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 28 }}
            transition={{ duration: 0.22 }}
            className="fixed bottom-6 right-6 z-30 flex h-[34rem] w-[calc(100vw-2rem)] max-w-[22rem] flex-col overflow-hidden rounded-[2rem] border border-white/80 bg-white shadow-soft"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">AI Tutor</p>
                <p className="text-xs text-slate-500">Context-aware lesson help</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-500 hover:text-slate-900"
              >
                Hide
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-slate-50/70 px-4 py-4">
              <AnimatePresence initial={false}>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`max-w-[88%] rounded-[1.5rem] px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "assistant"
                        ? "bg-white text-slate-700"
                        : "ml-auto bg-primary-600 text-white"
                    }`}
                  >
                    {message.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              {typing ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-slate-500 shadow-sm"
                >
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary-300" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary-400 [animation-delay:120ms]" />
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary-500 [animation-delay:220ms]" />
                  Thinking
                </motion.div>
              ) : null}
            </div>

            <div className="border-t border-slate-100 p-4">
              <div className="mb-3 flex flex-wrap gap-2">
                {["Give me a summary", "Explain simply", "Create a quiz"].map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => setInput(prompt)}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-950"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask about this lesson..."
                  rows={2}
                  className="min-h-[5rem] flex-1 rounded-[1.4rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-all focus:border-primary-300 focus:bg-white focus:shadow-halo"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="rounded-2xl bg-primary-600 px-4 py-3 text-sm font-medium text-white shadow-card transition-transform duration-200 hover:bg-primary-700 active:scale-[0.98]"
                >
                  Send
                </button>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>

      {!open ? (
        <motion.button
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-30 rounded-full bg-primary-600 px-5 py-3 text-sm font-medium text-white shadow-soft"
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -2 }}
        >
          Open AI Tutor
        </motion.button>
      ) : null}
    </>
  );
}
