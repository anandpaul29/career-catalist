import React, { useState } from 'react';
import { BotIcon, SendIcon } from './Icons';

interface WelcomeScreenProps {
  onStartConversation: (prompt: string) => void;
}

const starterSuggestions = [
  {
    label: "Interview Prep",
    prompt: "I'd like to prepare for an interview. Can you ask me some questions?",
  },
  {
    label: "Resume Review",
    prompt: "Can you review my resume? I can paste the text here.",
  },
  {
    label: "Build Leadership Skills",
    prompt: "I want to improve my leadership skills. Can you give me a practice scenario?",
  },
  {
    label: "Job Suggestions",
    prompt: "I'm looking for job suggestions. I can tell you about my qualifications and experience.",
  },
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStartConversation }) => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onStartConversation(inputText);
      setInputText('');
    }
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-4">
        <div className="w-20 h-20 bg-indigo-500 rounded-full flex items-center justify-center mx-auto shadow-lg">
          <BotIcon className="w-12 h-12 text-white" />
        </div>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold text-slate-100 mb-2">
        Career Catalyst AI
      </h1>
      <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
        Your personal AI assistant for soft skills, interview prep, job readiness, and career guidance.
      </p>

      <div className="w-full max-w-3xl">
        <form onSubmit={handleSubmit} className="mx-auto flex items-center gap-2 mb-6">
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
              disabled={!inputText.trim()}
              className="bg-indigo-600 text-white rounded-full p-3 h-12 w-12 flex items-center justify-center transition-colors duration-200 enabled:hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Send message"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>

        <div className="text-center mb-4">
          <p className="text-sm text-slate-500">Or start with a suggestion</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {starterSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInputText(suggestion.prompt)}
              className="bg-slate-800 hover:bg-indigo-600 border border-slate-700 text-slate-200 text-left p-4 rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {suggestion.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;