'use client';

interface TopicCardsProps {
  onTopicClick: (topic: string) => void;
}

export default function TopicCards({ onTopicClick }: TopicCardsProps) {
  const topics = [
    { name: 'Sự nghiệp', icon: 'fa-briefcase', color: 'blue' },
    { name: 'Tình yêu', icon: 'fa-heart', color: 'pink' },
    { name: 'Cuộc sống', icon: 'fa-mountain-sun', color: 'green' },
    { name: 'Sáng tạo', icon: 'fa-lightbulb', color: 'yellow' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-sm">
      {topics.map((topic) => (
        <div
          key={topic.name}
          onClick={() => onTopicClick(topic.name)}
          className="glass-card p-4 rounded-xl text-center hover:bg-white/10 cursor-pointer transition"
        >
          <i className={`fa-solid ${topic.icon} text-${topic.color}-400 mb-2 text-xl`}></i>
          <p>{topic.name}</p>
        </div>
      ))}
    </div>
  );
}
