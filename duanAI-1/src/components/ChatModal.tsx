'use client';

import { useState, useEffect, KeyboardEvent } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  isLoading?: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: string;
  subtitle: string;
  suggestions?: string[];
}

export default function ChatModal({ isOpen, onClose, topic, subtitle, suggestions = [] }: ChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  useEffect(() => {
    if (isOpen && topic === 'Trợ lý AI') {
      // Welcome message for AI Bot
      setTimeout(() => {
        setMessages([{
          role: 'assistant',
          text: 'Xin chào! Tôi là trợ lý AI của MindAI. Tôi có thể giúp bạn với:\n\n📚 Sự nghiệp & học tập\n💕 Tình yêu & quan hệ\n🌟 Cuộc sống & phát triển bản thân\n💡 Sáng tạo & nghệ thuật\n\nBạn muốn hỏi gì nhé?'
        }]);
      }, 300);
    } else if (isOpen) {
      setMessages([]);
    }
  }, [isOpen, topic]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    setShowSuggestions(false);
    setMessages(prev => [...prev, { role: 'user', text }]);
    setInput('');

    // Show typing indicator
    setMessages(prev => [...prev, { role: 'assistant', text: '', isLoading: true }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, message: text })
      });

      // Remove typing indicator
      setMessages(prev => prev.filter(m => !m.isLoading));

      if (!res.ok) {
        const errText = await res.text();
        let userMessage = 'Có lỗi xảy ra. Vui lòng thử lại.';
        
        try {
          const errJson = JSON.parse(errText);
          if (errJson.error && errJson.error.code === 'insufficient_quota') {
            userMessage = '⚠️ API key đã hết quota. Vui lòng:\n1. Kiểm tra billing tại platform.openai.com\n2. Thêm payment method\n3. Tạo API key mới';
          } else if (errJson.error && errJson.error.message) {
            userMessage = 'Lỗi: ' + errJson.error.message;
          }
        } catch {
          userMessage = 'Lỗi: ' + errText.substring(0, 200);
        }
        
        setMessages(prev => [...prev, { role: 'assistant', text: userMessage }]);
        return;
      }

      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply || 'Không có phản hồi từ AI.' }]);
    } catch (err: any) {
      setMessages(prev => prev.filter(m => !m.isLoading));
      setMessages(prev => [...prev, { role: 'assistant', text: '❌ Không thể kết nối: ' + err.message }]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end md:items-center justify-center p-4" style={{ zIndex: 9999 }}>
      <div 
        className="bg-black/60 backdrop-blur-sm absolute inset-0" 
        onClick={onClose}
        style={{ zIndex: 9999 }}
      />
      <div 
        className="relative max-w-3xl w-full bg-[#071025] glass-card rounded-2xl shadow-2xl p-4 md:p-6" 
        style={{ zIndex: 10000 }}
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold">{topic}</h3>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white">
            Đóng ✕
          </button>
        </div>

        {showSuggestions && suggestions.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(suggestion);
                  setShowSuggestions(false);
                }}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-full transition"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="min-h-[160px] max-h-72 overflow-auto space-y-3 mb-3 p-2">
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <div className={msg.role === 'user' 
                ? 'inline-block bg-purple-700 text-white px-4 py-2 rounded-2xl' 
                : 'inline-block bg-slate-800 text-slate-200 px-4 py-2 rounded-2xl'
              }>
                {msg.isLoading ? (
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                ) : (
                  <span style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none p-3 rounded-md bg-slate-900 text-white"
            placeholder="Nhập câu hỏi của bạn..."
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md"
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
}
