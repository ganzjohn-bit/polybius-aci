interface LoadingStateProps {
  type: 'loading' | 'error';
  message?: string;
}

export default function LoadingState({ type, message }: LoadingStateProps) {
  if (type === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-pulse text-slate-600">{message || 'Loading results...'}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-slate-600 mb-4">
          {message || 'Unable to load results. Please try again later.'}
        </div>
        <a href="https://app.polybius.world" className="text-blue-600 underline">
          Run live analysis
        </a>
      </div>
    </div>
  );
}
