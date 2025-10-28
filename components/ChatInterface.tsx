import React, { useState, useRef, useEffect } from 'react';
import { Message as MessageType } from '../types';
import Message from './Message';
import LoadingIndicator from './LoadingIndicator';
import { SendIcon, BotIcon, ArrowLeftIcon } from './Icons';

interface ChatInterfaceProps {
  messages: MessageType[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  onGoBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading, onSendMessage, onGoBack }) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex flex-col h-full">
      <header className="flex items-center p-4 bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <button
          onClick={onGoBack}
          className="p-2 rounded-full hover:bg-slate-700 transition-colors mr-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          aria-label="Go back to main screen"
        >
          <ArrowLeftIcon className="w-6 h-6 text-slate-300" />
        </button>
        <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center mr-3">
          <BotIcon className="w-6 h-6 text-white" />
        </div>
        <h1 className="text-xl font-bold text-slate-100">Career Catalyst AI</h1>
      </header>
      
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="p-4 bg-slate-900 sticky bottom-0">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto flex items-center gap-2">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask me anything about your career..."
            rows={1}
            className="flex-grow bg-slate-800 text-slate-100 border border-slate-700 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200 leading-tight"
            style={{ maxHeight: '150px' }}
          />
          <button
            type="submit"
            disabled={isLoading || !inputText.trim()}
            className="bg-indigo-600 text-white rounded-full p-3 h-12 w-12 flex items-center justify-center transition-colors duration-200 enabled:hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            <SendIcon className="w-6 h-6" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default ChatInterface;