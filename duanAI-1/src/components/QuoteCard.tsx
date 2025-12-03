'use client';

import { useState } from 'react';

const quotes = [
  { text: "Đừng chờ đợi cơ hội, hãy tạo ra nó bằng chính nỗ lực của bạn.", author: "AI Advice for Career" },
  { text: "Sự sáng tạo là trí thông minh đang vui đùa.", author: "Albert Einstein (AI Curated)" },
  { text: "Trong kỷ nguyên số, sự đồng cảm là thuật toán mạnh mẽ nhất.", author: "AI Perspective" },
  { text: "Thất bại chỉ là một bước đệm, không phải là điểm dừng.", author: "Motivation Core" },
  { text: "Tương lai thuộc về những người tin vào vẻ đẹp của giấc mơ.", author: "Eleanor Roosevelt" },
  { text: "Hãy học cách nghỉ ngơi, không phải bỏ cuộc.", author: "Mental Health AI" }
];

export default function QuoteCard() {
  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [opacity, setOpacity] = useState(1);

  const generateQuote = () => {
    setOpacity(0);
    setTimeout(() => {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
      setOpacity(1);
    }, 500);
  };

  return (
    <div className="mt-10 glass-card rounded-2xl p-8 md:p-12 shadow-2xl relative group transition hover:scale-[1.01] duration-500">
      <i className="fa-solid fa-quote-left text-4xl text-slate-600 absolute top-6 left-6 opacity-50"></i>
      
      <div className="min-h-[120px] flex flex-col justify-center items-center">
        <p 
          className="text-2xl md:text-3xl font-light italic leading-relaxed text-slate-100 transition-opacity duration-500"
          style={{ opacity }}
        >
          &quot;{currentQuote.text}&quot;
        </p>
        <p 
          className="mt-4 text-purple-400 font-semibold uppercase tracking-wider text-sm transition-opacity duration-500"
          style={{ opacity }}
        >
          — {currentQuote.author}
        </p>
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button 
          onClick={generateQuote}
          className="glow-btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-3 px-8 rounded-full transition transform active:scale-95 flex items-center gap-2"
        >
          <i className="fa-solid fa-wand-magic-sparkles"></i>
          Câu nói mới
        </button>
        <button className="glass-card hover:bg-white/10 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center transition">
          <i className="fa-regular fa-heart"></i>
        </button>
        <button className="glass-card hover:bg-white/10 text-white p-3 rounded-full w-12 h-12 flex items-center justify-center transition">
          <i className="fa-solid fa-share-nodes"></i>
        </button>
      </div>
    </div>
  );
}
