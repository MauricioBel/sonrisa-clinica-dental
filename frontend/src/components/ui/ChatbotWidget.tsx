import { useEffect, useRef, useState } from 'react';
import { X, Send, MessageSquare, Bot, CalendarCheck } from 'lucide-react';
import { useClinicaId, useClinicaNombre, useNavigate } from '../../hooks/useConfig.ts';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestBooking?: boolean;
}

export function ChatbotWidget() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const clinicaId = useClinicaId();
  const clinicaNombre = useClinicaNombre();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addWelcomeMessage();
    }
  }, [isOpen, clinicaNombre]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addWelcomeMessage = () => {
    const welcomeMsg: ChatMessage = {
      role: 'assistant',
      content: `¡Hola! Soy el asistente virtual de ${clinicaNombre || 'nuestra clínica'}. ¿En qué puedo ayudarte hoy?`,
      timestamp: new Date(),
    };
    setMessages([welcomeMsg]);
  };

  const handleBookAppointment = () => {
    setIsOpen(false);
    navigate('/agendar-hora');
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          clinicaId,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const botMessage: ChatMessage = {
        role: 'assistant',
        content: data.data?.reply || 'Lo siento, hubo un error. Por favor inténtalo de nuevo.',
        timestamp: new Date(),
        suggestBooking: data.data?.suggestBooking ?? false,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch {
      const errorMessage: ChatMessage = {
        role: 'assistant',
        content: 'No pude conectar con el servidor. Por favor verifica tu conexión e inténtalo de nuevo.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="btn-primary flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2"
          aria-label="Abrir chat de asistencia"
          aria-expanded="false"
        >
          <MessageSquare className="h-7 w-7" aria-hidden="true" />
        </button>
      )}

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-full max-w-sm sm:max-w-md">
          <div className="card flex flex-col shadow-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200 bg-brand-50 px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-brand-900">Asistente Virtual</p>
                  <p className="text-xs text-slate-500">{clinicaNombre || 'Clínica Dental'}</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="btn-ghost rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-brand-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
                aria-label="Cerrar chat"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[400px]"
              role="log"
              aria-live="polite"
              aria-label="Conversación"
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-brand-100 text-brand-700'
                        : 'bg-brand-50 text-brand-700'
                    }`}
                    aria-hidden="true"
                  >
                    {message.role === 'user' ? (
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                      message.role === 'user'
                        ? 'bg-brand-700 text-white rounded-tr-md'
                        : 'bg-slate-100 text-slate-800 rounded-tl-md'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    {message.suggestBooking && (
                      <button
                        onClick={handleBookAppointment}
                        className="btn-primary mt-2 text-xs px-3 py-1.5 flex items-center gap-1"
                      >
                        <CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />
                        Agendar Cita Ahora
                      </button>
                    )}
                    <p className={`text-[10px] mt-1 ${message.role === 'user' ? 'text-brand-200' : 'text-slate-400'}`}>
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-brand-50 flex items-center justify-center" aria-hidden="true">
                    <Bot className="h-4 w-4 text-brand-700" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl px-4 py-2 rounded-tl-md max-w-[75%]">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 rounded-full bg-brand-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-slate-200 p-3">
              <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  className="input-field flex-1 px-4 py-2 text-sm outline-none transition"
                  disabled={isLoading}
                  aria-label="Tu mensaje"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading}
                  className="btn-primary flex h-10 w-10 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Enviar mensaje"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                </button>
              </form>
              <p className="mt-2 text-center text-xs text-slate-400">
                Presiona Enter para enviar · Shift+Enter para nueva línea
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}