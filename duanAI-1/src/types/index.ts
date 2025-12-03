export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
    timestamp: Date;
}

export interface ChatResponse {
    messages: Message[];
    error?: string;
}

export interface User {
    id: string;
    name: string;
}

export interface ChatRequest {
    userId: string;
    message: string;
}