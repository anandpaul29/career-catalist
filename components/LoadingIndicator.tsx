
import React from 'react';
import { BotIcon } from './Icons';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 my-4 justify-start">
      <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-slate-700">
        <BotIcon className="w-6 h-6 text-white" />
      </div>
      <div className="max-w-2xl px-4 py-3 rounded-lg shadow-md bg-slate-700 text-slate-100 rounded-bl-none">
        <div className="flex items-center justify-center space-x-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingIndicator;
