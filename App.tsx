import React, { useState, useCallback } from 'react';
import { Message } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import ChatInterface from './components/ChatInterface';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showChat, setShowChat] = useState<boolean>(false);

  const sendMessage = useCallback(async (currentMessages: Message[]) => {
    setIsLoading(true);
    setMessages(currentMessages);

    // The last message is the new user prompt
    const userMessage = currentMessages[currentMessages.length - 1].content;
    // The history is all messages before the last one
    const history = currentMessages.slice(0, -1);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ history, message: userMessage }),
      });

      if (!response.body) {
        throw new Error("Response body is null");
      }
      
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let modelResponse = '';

      // Add a placeholder for the model's response
      setMessages(prev => [...prev, { role: 'model', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        modelResponse += decoder.decode(value, { stream: true });
        
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = modelResponse;
          return newMessages;
        });
      }

    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = { role: 'model', content: "Sorry, I encountered an error. Please try again." };
      setMessages(prev => [...prev.slice(0, -1), errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    const userMessage: Message = { role: 'user', content: text };
    const newMessages = [...messages, userMessage];
    sendMessage(newMessages);
  }, [messages, sendMessage]);

  const startConversation = useCallback((prompt: string) => {
    setShowChat(true);
    const userMessage: Message = { role: 'user', content: prompt };
    sendMessage([userMessage]);
  }, [sendMessage]);

  const handleGoBack = useCallback(() => {
    setShowChat(false);
    setMessages([]);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans">
      {!showChat ? (
        <WelcomeScreen onStartConversation={startConversation} />
      ) : (
        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          onSendMessage={handleSendMessage}
          onGoBack={handleGoBack}
        />
      )}
    </div>
  );
};

export default App;
