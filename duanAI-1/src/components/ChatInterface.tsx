'use client';

import React, { useState } from 'react';
import MessageList from './MessageList';

const ChatInterface: React.FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>('');

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, input]);
            setInput('');
        }
    };

    return (
        <div className="chat-interface">
            <MessageList messages={messages} />
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatInterface;