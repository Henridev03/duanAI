import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { topic = 'General', message } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Missing message' }, { status: 400 });
    }

    const OPENAI_KEY = process.env.OPENAI_API_KEY;
    const GROQ_KEY = process.env.GROQ_API_KEY;
    const AI_PROVIDER = process.env.AI_PROVIDER || 'groq';

    const systemPrompt = `Bạn là chuyên gia tư vấn về ${topic}. Hãy trả lời bằng tiếng Việt một cách thân thiện, súc tích và hữu ích. Đưa ra lời khuyên thực tế và các bước hành động cụ thể khi phù hợp.`;

    let apiUrl: string;
    let apiKey: string;
    let model: string;
    
    // Chọn AI provider dựa trên cấu hình
    if (AI_PROVIDER === 'groq' && GROQ_KEY) {
      apiUrl = 'https://api.groq.com/openai/v1/chat/completions';
      apiKey = GROQ_KEY;
      model = 'llama-3.1-8b-instant'; // Model miễn phí, rất nhanh
    } else if (OPENAI_KEY) {
      apiUrl = 'https://api.openai.com/v1/chat/completions';
      apiKey = OPENAI_KEY;
      model = 'gpt-3.5-turbo';
    } else {
      return NextResponse.json({ 
        error: 'No AI API key configured. Please set GROQ_API_KEY or OPENAI_API_KEY in .env.local file.' 
      }, { status: 500 });
    }

    const body = {
      model: model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('API Error:', text);
      return new Response(text, { status: response.status });
    }

    const json = await response.json();
    const reply = json.choices?.[0]?.message?.content;
    
    return NextResponse.json({ reply: reply || 'Không có phản hồi từ AI.' });
  } catch (err: any) {
    console.error('Chat error', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}