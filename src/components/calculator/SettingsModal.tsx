'use client';

import { X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  newsApiKey: string;
  onApiKeyChange: (value: string) => void;
  onNewsApiKeyChange: (value: string) => void;
  onSave: () => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  newsApiKey,
  onApiKeyChange,
  onNewsApiKeyChange,
  onSave,
}: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-slate-800">Settings</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 p-1">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Anthropic API Key
          </label>
          <input
            type="password"
            value={apiKey}
            onChange={(e) => onApiKeyChange(e.target.value)}
            placeholder="sk-ant-api03-..."
            className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <p className="text-sm text-slate-500 mt-3">
            For AI-powered research. Get one at{' '}
            <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
              console.anthropic.com
            </a>
          </p>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            NewsAPI Key <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            type="password"
            value={newsApiKey}
            onChange={(e) => onNewsApiKeyChange(e.target.value)}
            placeholder="your-news-api-key..."
            className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          />
          <p className="text-sm text-slate-500 mt-3">
            For headline analysis. Get one free at{' '}
            <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
              newsapi.org
            </a>
          </p>
        </div>
        <button
          onClick={onSave}
          className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-lg"
        >
          Save API Key
        </button>
      </div>
    </div>
  );
}
