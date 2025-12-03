'use client';

import { useState } from 'react';
import QuoteCard from '../components/QuoteCard';
import TopicCards from '../components/TopicCards';
import ChatModal from '../components/ChatModal';
import AIBot from '../components/AIBot';

const topicSuggestions: Record<string, string[]> = {
  'Sự nghiệp': [
    'Làm sao để phát triển kỹ năng lãnh đạo?',
    'Tôi nên chọn công việc ổn định hay theo đuổi đam mê?',
    'Cách xin tăng lương hiệu quả?',
    'Làm thế nào để cân bằng công việc và học hỏi?'
  ],
  'Tình yêu': [
    'Làm sao để duy trì tình yêu lâu dài?',
    'Cách vượt qua chia tay?',
    'Làm thế nào để xây dựng niềm tin trong quan hệ?',
    'Khi nào nên bắt đầu một mối quan hệ mới?'
  ],
  'Cuộc sống': [
    'Làm sao để sống hạnh phúc hơn?',
    'Cách quản lý thời gian hiệu quả?',
    'Làm thế nào để giảm căng thẳng?',
    'Cách xây dựng thói quen tốt?'
  ],
  'Sáng tạo': [
    'Làm sao để khơi nguồn sáng tạo?',
    'Cách vượt qua writer\'s block?',
    'Làm thế nào để học một kỹ năng nghệ thuật mới?',
    'Cách biến ý tưởng thành hiện thực?'
  ]
};

export default function HomePage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [currentTopic, setCurrentTopic] = useState('');
  const [chatSubtitle, setChatSubtitle] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const openChat = (topic: string) => {
    setCurrentTopic(topic);
    setChatSubtitle(`Hỏi về "${topic}" để nhận gợi ý, lời khuyên hoặc ý tưởng.`);
    setSuggestions(topicSuggestions[topic] || []);
    setChatOpen(true);
  };

  const openBotChat = () => {
    setCurrentTopic('🤖 Trợ lý AI của bạn');
    setChatSubtitle('Hỏi tôi bất cứ điều gì! Tôi sẵn sàng giúp đỡ bạn.');
    setSuggestions([]);
    setChatOpen(true);
  };

  return (
    <>
      <nav className="fixed w-full z-50 glass-card border-b-0 border-b-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <i className="fa-solid fa-brain text-purple-400 text-2xl mr-2"></i>
              <span className="font-bold text-xl tracking-wide">Mind<span className="text-purple-400">AI</span></span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition">Trang chủ</a>
                <a href="#" className="hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition">Chủ đề</a>
                <a href="#" className="hover:text-purple-300 px-3 py-2 rounded-md text-sm font-medium transition">Về AI</a>
                <a href="#" className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full text-sm font-medium transition">Đăng nhập</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow flex items-center justify-center pt-20 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

        <div className="max-w-4xl w-full space-y-8 text-center relative z-10">
          <div>
            <h2 className="text-sm text-purple-300 font-semibold tracking-widest uppercase mb-2">Powered by Artificial Intelligence</h2>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
              Lời khuyên từ <br />
              <span className="text-gradient">Tương Lai</span>
            </h1>
            <p className="mt-4 text-xl text-slate-300 max-w-2xl mx-auto">
              Khám phá những góc nhìn mới mẻ, sâu sắc và đầy cảm hứng được tổng hợp và sáng tạo bởi Trí tuệ Nhân tạo.
            </p>
          </div>

          <QuoteCard />
          <TopicCards onTopicClick={openChat} />
        </div>
      </main>

      <footer className="glass-card border-t border-slate-800 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-slate-400 text-sm">
          <p>&copy; 2025 MindAI. Designed for Inspiration.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition"><i className="fa-brands fa-twitter"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fa-brands fa-instagram"></i></a>
            <a href="#" className="hover:text-white transition"><i className="fa-brands fa-github"></i></a>
          </div>
        </div>
      </footer>

      <AIBot onClick={openBotChat} />
      
      <ChatModal
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        topic={currentTopic}
        subtitle={chatSubtitle}
        suggestions={suggestions}
      />
    </>
  );
}