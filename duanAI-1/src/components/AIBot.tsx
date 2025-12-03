'use client';

interface AIBotProps {
  onClick: () => void;
}

export default function AIBot({ onClick }: AIBotProps) {
  return (
    <div className="ai-bot" onClick={onClick}>
      <div className="ai-bot-pulse"></div>
      <i className="fa-solid fa-robot"></i>
      <div className="bot-tooltip">Xin chào! Tôi có thể giúp gì cho bạn? 👋</div>
    </div>
  );
}
