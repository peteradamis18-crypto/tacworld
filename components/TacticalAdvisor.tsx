import React, { useState, useEffect, useRef } from 'react';
import { createChatSession, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageSquare, Send, Minimize2, Radio, Loader2, X } from 'lucide-react';
import { Chat } from '@google/genai';

const TacticalAdvisor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize chat session on mount
    chatSessionRef.current = createChatSession();
    
    // Initial greeting
    setMessages([{
      id: 'init',
      role: 'model',
      text: "Solid copy. This is Gunny, your Tactical Advisor. What's your loadout status? Looking for IWB, OWB, or chest rigs today?",
      timestamp: new Date()
    }]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async () => {
    if (!inputValue.trim() || !chatSessionRef.current) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    const responseText = await sendMessageToGemini(chatSessionRef.current, userMsg.text);

    const modelMsg: ChatMessage = {
      id: (Date.now() + 1).toString(),
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, modelMsg]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-none">
      
      {/* Chat Window */}
      <div 
        className={`
          pointer-events-auto bg-tactical-900 border border-tactical-800 rounded-lg shadow-2xl mb-4 overflow-hidden transition-all duration-300 origin-bottom-right
          ${isOpen ? 'w-80 sm:w-96 h-[500px] opacity-100 scale-100' : 'w-0 h-0 opacity-0 scale-90'}
        `}
      >
        {/* Header */}
        <div className="bg-tactical-950 p-4 border-b border-tactical-800 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse absolute top-0 right-0"></div>
              <Radio className="w-5 h-5 text-tactical-accent" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm uppercase tracking-wider">Tactical Advisor</h3>
              <p className="text-xs text-stone-500 font-mono">Status: ONLINE</p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-stone-500 hover:text-white transition-colors"
          >
            <Minimize2 className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="h-[380px] overflow-y-auto p-4 space-y-4 bg-stone-900/50 custom-scrollbar">
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[80%] p-3 rounded-lg text-sm
                  ${msg.role === 'user' 
                    ? 'bg-tactical-accent text-black rounded-br-none font-medium' 
                    : 'bg-tactical-800 text-stone-200 rounded-bl-none border border-tactical-700'}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-tactical-800 p-3 rounded-lg rounded-bl-none border border-tactical-700">
                <Loader2 className="w-4 h-4 animate-spin text-tactical-accent" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="absolute bottom-0 w-full p-3 bg-tactical-950 border-t border-tactical-800">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about holsters..."
              className="flex-1 bg-tactical-900 border border-tactical-800 rounded px-3 py-2 text-sm text-white placeholder-stone-600 focus:outline-none focus:border-tactical-accent"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !inputValue.trim()}
              className="bg-tactical-800 text-tactical-accent p-2 rounded hover:bg-tactical-700 disabled:opacity-50 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110
          ${isOpen ? 'bg-tactical-800 text-stone-400 rotate-90' : 'bg-tactical-accent text-black'}
        `}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default TacticalAdvisor;