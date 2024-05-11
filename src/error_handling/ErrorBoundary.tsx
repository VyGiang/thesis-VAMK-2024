// ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from "react";
import { GlobalErrorHandling } from "@/error_handling/GlobalErrorHandling";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorMessage: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  private globalErrorHandler = new GlobalErrorHandling();

  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: null,
    };
  }

  static getDerivedStateFromError(): State {
    // Update state to show fallback UI
    return { hasError: true, errorMessage: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error using GlobalErrorHandling
    this.globalErrorHandler.parseErrorMessage(error.message);
    this.setState({
      errorMessage: this.globalErrorHandler.getCriticalErrorMessage(),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-page">
          <h1>Oops! Something went wrong.</h1>
          {this.state.errorMessage && (
            <p className="critical-error">{this.state.errorMessage}</p>
          )}
          <p>
            Please try refreshing the page or contact support if the issue
            persists.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
