import { useRef, useState } from "react";
import { Bot, MessageCircle, Paperclip, Send, X } from "lucide-react";
import { aiApi } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Chatbot() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: `Hi ${user.name}. Ask me anything, or upload a document and I will summarize it.`
    }
  ]);
  const inputRef = useRef(null);
  const fileRef = useRef(null);

  async function send(event) {
    event.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const history = messages.slice(-10);
    setMessages((current) => [...current, { role: "user", text }]);
    setInput("");
    setLoading(true);
    try {
      const { data } = await aiApi.chat(text, history);
      setMessages((current) => [...current, { role: "assistant", text: data.answer }]);
    } catch (err) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: err.response?.data?.message || "The AI assistant is unavailable right now."
        }
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  async function summarize(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || loading) return;

    setMessages((current) => [...current, { role: "user", text: `Summarize document: ${file.name}` }]);
    setLoading(true);
    try {
      const { data } = await aiApi.summarize(file);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: `Summary of ${data.fileName || file.name}\n\n${data.summary}`
        }
      ]);
    } catch (err) {
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          text: err.response?.data?.message || "I could not summarize that document."
        }
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }

  return (
    <div className="chatbot">
      {open && (
        <section className="chat-window" aria-label="AI assistant">
          <header className="chat-header">
            <div className="d-flex align-items-center gap-2">
              <Bot size={20} />
              <div>
                <strong>AI Assistant</strong>
                <span>{user.role} support</span>
              </div>
            </div>
            <button className="icon-button" type="button" onClick={() => setOpen(false)} aria-label="Close AI assistant">
              <X size={18} />
            </button>
          </header>
          <div className="chat-messages">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>
                {message.text}
              </div>
            ))}
            {loading && <div className="chat-bubble assistant">Thinking...</div>}
          </div>
          <form className="chat-form" onSubmit={send}>
            <input ref={fileRef} className="d-none" type="file" onChange={summarize} />
            <button
              className="btn btn-outline-secondary"
              type="button"
              disabled={loading}
              onClick={() => fileRef.current?.click()}
              aria-label="Upload document for summary"
              title="Upload document"
            >
              <Paperclip size={18} />
            </button>
            <input
              ref={inputRef}
              className="form-control"
              value={input}
              maxLength="2000"
              placeholder="Ask the assistant"
              onChange={(event) => setInput(event.target.value)}
            />
            <button className="btn btn-primary" type="submit" disabled={loading || !input.trim()} aria-label="Send message">
              <Send size={18} />
            </button>
          </form>
        </section>
      )}
      <button className="chat-toggle" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open AI assistant">
        <MessageCircle size={24} />
      </button>
    </div>
  );
}
