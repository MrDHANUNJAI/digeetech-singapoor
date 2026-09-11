import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Volume2,
  VolumeX,
  ExternalLink,
  Sparkles,
  RefreshCw,
  Info,
  ChevronDown,
  ShieldCheck,
} from "lucide-react";
import logoImg from "../assets/logo.png";
import { api } from "../lib/api";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  sources?: { title: string; category: string }[];
  showWhatsAppButton?: boolean;
  whatsappUrl?: string;
}

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "How much do your services cost?",
  "Why choose Digee Tech over freelancers?",
  "How fast can you deliver my project?",
  "Is my project data safe & PDPA compliant?",
];

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [unreadBadge, setUnreadBadge] = useState<boolean>(false);
  const [whatsappNumber, setWhatsappNumber] = useState<string>("+65 8123 4567");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadBadge(false);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages, loading]);

  // Initial Load & Automatic Greeting Logic
  useEffect(() => {
    // Fetch Settings
    api.getChatbotSettings()
      .then((settings) => {
        if (settings) {
          if (settings.whatsappNumber) setWhatsappNumber(settings.whatsappNumber);
          if (settings.voiceEnabledDefault) setIsVoiceEnabled(true);
        }
      })
      .catch(() => {});

    // Check session flag for automatic greeting
    const alreadyGreeted = sessionStorage.getItem("digee_chat_greeted");
    if (!alreadyGreeted) {
      sessionStorage.setItem("digee_chat_greeted", "true");
      const greetingMsg: ChatMessage = {
        id: "msg-welcome-" + Date.now(),
        role: "assistant",
        content: "Hi there! 👋 I'm Alex, your Digee Tech AI Consultant. How can I help you today? Ask me about our custom web apps, AI agents, transparent SGD pricing, or project guarantees!",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showWhatsAppButton: true,
      };
      setMessages([greetingMsg]);
      setUnreadBadge(true);
    } else {
      if (messages.length === 0) {
        setMessages([
          {
            id: "msg-welcome-session",
            role: "assistant",
            content: "Welcome back to Digee Tech! How can I assist you with our services, pricing, or projects today?",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    }
  }, []);

  // Text To Speech helper
  const speakText = (text: string) => {
    if (!isVoiceEnabled || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel(); // Stop current speech

    // Clean markdown symbols for speech
    const cleanText = text
      .replace(/[*#_`-]/g, " ")
      .replace(/https?:\/\/\S+/g, "")
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const toggleVoice = () => {
    if (isVoiceEnabled) {
      stopSpeech();
      setIsVoiceEnabled(false);
    } else {
      setIsVoiceEnabled(true);
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: "msg-usr-" + Date.now(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputQuery("");
    setLoading(true);

    try {
      // Build history payload
      const history = messages.slice(-6).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await api.askChatbot(query, history);

      const assistantMsg: ChatMessage = {
        id: "msg-ast-" + Date.now(),
        role: "assistant",
        content: res.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        sources: res.sources,
        showWhatsAppButton: res.showWhatsAppButton,
        whatsappUrl: res.whatsappUrl || `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      // Speak if voice enabled
      if (isVoiceEnabled) {
        speakText(res.answer);
      }
    } catch (err) {
      console.error("[Chatbot UI] Error sending message:", err);
      const errorMsg: ChatMessage = {
        id: "msg-err-" + Date.now(),
        role: "assistant",
        content: "Sorry, I'm having trouble retrieving website information right now. Please try again shortly or click below to chat with our team on WhatsApp.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        showWhatsAppButton: true,
        whatsappUrl: `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* FLOATING LAUNCHER BUTTON */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end pointer-events-auto">
        {!isOpen && unreadBadge && (
          <div className="mb-2 bg-brand-navy text-white text-[11px] font-bold px-3 py-1.5 rounded-2xl shadow-xl border border-brand-blue/30 flex items-center gap-2 animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Ask Digee Tech AI Assistant</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open Digee Tech AI Assistant"
          id="chatbot-launcher-btn"
          className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer ${
            isOpen
              ? "bg-brand-navy text-white ring-4 ring-brand-navy/20"
              : "bg-brand-blue hover:bg-brand-blue-dark text-white ring-4 ring-brand-blue/30"
          }`}
        >
          {isOpen ? (
            <X className="w-7 h-7" />
          ) : (
            <div className="relative flex items-center justify-center">
              <MessageSquare className="w-7 h-7 sm:w-8 sm:h-8" />
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-white"></span>
            </div>
          )}
        </button>
      </div>

      {/* FLOATING CHAT WINDOW */}
      {isOpen && (
        <div
          id="chatbot-window"
          className="fixed bottom-22 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[400px] h-[550px] max-h-[80vh] bg-white rounded-3xl shadow-2xl border border-brand-navy/15 z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* HEADER */}
          <div className="bg-brand-navy text-white p-4 flex items-center justify-between border-b border-white/10 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={logoImg}
                  alt="Digee Tech Logo"
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-xl object-contain bg-white p-1 shadow-md"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-brand-navy" title="AI Assistant Online"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display text-sm font-bold tracking-tight text-white">Digee Tech AI</h3>
                  <span className="bg-brand-blue/30 text-brand-blue-light text-[9px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                    Official
                  </span>
                </div>
                <p className="text-[11px] text-brand-gray-light flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  Website Knowledge Base
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Voice Output Toggle */}
              <button
                onClick={toggleVoice}
                title={isVoiceEnabled ? "Mute Voice Output" : "Enable Text-to-Speech Voice"}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isVoiceEnabled
                    ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                {isVoiceEnabled ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  stopSpeech();
                  setIsOpen(false);
                }}
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close Chat Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-brand-navy/[0.01]">
            {/* SUGGESTED QUESTIONS CHIPS */}
            {messages.length <= 2 && (
              <div className="bg-brand-navy/5 border border-brand-navy/10 rounded-2xl p-3 text-xs space-y-2">
                <p className="font-bold text-brand-navy flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-brand-blue" />
                  Suggested Questions:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="bg-white hover:bg-brand-blue hover:text-white text-brand-navy text-[11px] font-medium px-2.5 py-1.5 rounded-xl border border-brand-navy/15 shadow-2xs transition-all cursor-pointer text-left"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* MESSAGE LIST */}
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4 text-brand-blue" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-1.5 ${msg.role === "user" ? "items-end" : "items-start"}`}>
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-brand-blue text-white rounded-br-none shadow-xs font-medium"
                        : "bg-white text-brand-navy border border-brand-navy/10 rounded-bl-none shadow-xs"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* SOURCES BADGES FOR ASSISTANT */}
                  {msg.role === "assistant" && msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1 px-1">
                      <span className="text-[9px] text-brand-gray flex items-center gap-1 font-semibold">
                        <Info className="w-2.5 h-2.5 text-brand-blue" />
                        Verified Sources:
                      </span>
                      {msg.sources.slice(0, 2).map((s, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[9px] bg-brand-navy/5 text-brand-navy font-bold px-1.5 py-0.5 rounded border border-brand-navy/10 truncate max-w-[150px]"
                          title={s.title}
                        >
                          {s.title}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* WHATSAPP ACTION BUTTON */}
                  {msg.role === "assistant" && msg.showWhatsAppButton && (
                    <div className="pt-1">
                      <a
                        href={msg.whatsappUrl || `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 fill-current" />
                        Chat on WhatsApp
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>
                  )}

                  <span className={`block text-[9px] text-brand-gray px-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </span>
                </div>

                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {/* TYPING INDICATOR */}
            {loading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-brand-blue animate-spin" />
                </div>
                <div className="bg-white border border-brand-navy/10 px-4 py-3 rounded-2xl rounded-bl-none shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-blue animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* INPUT FOOTER */}
          <div className="p-3 bg-white border-t border-brand-navy/10 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about services, pricing, projects..."
                disabled={loading}
                className="flex-1 bg-brand-navy/[0.03] border border-brand-navy/15 focus:border-brand-blue text-brand-navy text-xs rounded-xl px-3.5 py-2.5 outline-none transition-colors disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={loading || !inputQuery.trim()}
                aria-label="Send Message"
                className="w-9 h-9 rounded-xl bg-brand-blue hover:bg-brand-blue-dark disabled:bg-brand-navy/20 text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[9px] text-brand-gray text-center mt-2 flex items-center justify-center gap-1">
              <span>Answers generated strictly from Digee Tech Website Data</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
