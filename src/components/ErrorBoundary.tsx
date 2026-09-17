import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary caught an error]:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-brand-navy flex items-center justify-center p-6 text-white text-center">
          <div className="max-w-md w-full bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
            <div className="w-12 h-12 bg-brand-blue/20 text-brand-blue border border-brand-blue/30 rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl">
              D
            </div>
            <h2 className="font-display text-xl font-extrabold mb-2 text-white">
              Application Refresh Required
            </h2>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              Digee Tech web interface experienced a transient update event. Click below to continue smoothly.
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
              className="w-full py-3 px-6 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-sm transition-all shadow-lg cursor-pointer"
            >
              Reload Interface
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
