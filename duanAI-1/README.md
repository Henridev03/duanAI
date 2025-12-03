# duanAI Project

## Overview
The duanAI project is a Next.js application that provides a chat interface powered by AI services. It allows users to send and receive messages in real-time, leveraging the capabilities of AI for enhanced interactions.

## Project Structure
```
duanAI
├── src
│   ├── app
│   │   ├── layout.tsx        # Layout component for the application
│   │   ├── page.tsx          # Main entry point for the application
│   │   └── api
│   │       └── chat
│   │           └── route.ts  # API route for chat functionality
│   ├── components
│   │   ├── ChatInterface.tsx  # User interface for the chat feature
│   │   └── MessageList.tsx    # Component to display a list of messages
│   ├── lib
│   │   ├── ai-service.ts      # Logic for interacting with AI services
│   │   └── utils.ts           # Utility functions for the application
│   └── types
│       └── index.ts           # TypeScript interfaces and types
├── public
│   └── favicon.ico            # Favicon for the application
├── .env.local                 # Environment variables for local development
├── .gitignore                 # Files and directories to ignore by Git
├── next.config.js             # Configuration settings for Next.js
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
├── tailwind.config.ts         # Tailwind CSS configuration
├── postcss.config.js          # PostCSS configuration
└── README.md                  # Project documentation
```

## Setup Instructions
1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd duanAI
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and add your API keys and other necessary environment variables.

4. **Run the application**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to `http://localhost:3000` to view the application.

## Usage
- Use the chat interface to send messages and interact with the AI.
- The application supports real-time messaging and displays a list of messages exchanged.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you would like to add.