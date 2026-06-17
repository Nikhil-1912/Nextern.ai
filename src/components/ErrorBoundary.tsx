import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border-2 border-red-200 dark:border-red-900/40 rounded-2xl p-8 max-w-lg w-full shadow-lg text-center space-y-6">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Something went wrong</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                We encountered an unexpected error. Please try reloading the page.
              </p>
            </div>
            
            {this.state.error && (
              <div className="p-4 bg-zinc-100 dark:bg-zinc-950 rounded-lg text-left overflow-auto">
                <p className="text-xs font-mono text-zinc-600 dark:text-zinc-400 truncate break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors w-full sm:w-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
