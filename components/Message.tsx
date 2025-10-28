import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { Message as MessageType } from '../types';
import { UserIcon, BotIcon } from './Icons';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  const Icon = isUser ? UserIcon : BotIcon;
  const bgColor = isUser ? 'bg-indigo-600' : 'bg-slate-700';
  const align = isUser ? 'justify-end' : 'justify-start';

  return (
    <div className={`flex items-start gap-3 my-4 ${align}`}>
      {!isUser && (
        <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${bgColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      )}
      <div
        className={`max-w-full md:max-w-2xl px-4 py-3 rounded-lg shadow-md ${
          isUser
            ? 'bg-indigo-600 text-white rounded-br-none'
            : 'bg-slate-700 text-slate-100 rounded-bl-none'
        }`}
      >
        <div className="prose prose-invert prose-p:my-2 prose-headings:my-3 prose-ul:my-2 prose-ol:my-2">
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {message.content}
            </ReactMarkdown>
        </div>
      </div>
      {isUser && (
         <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-slate-600`}>
          <Icon className="w-6 h-6 text-slate-200" />
        </div>
      )}
    </div>
  );
};

export default Message;