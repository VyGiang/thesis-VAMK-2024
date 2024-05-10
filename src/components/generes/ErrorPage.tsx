import { GlobalErrorHandling } from "@/GlobalErrorHandling";
import React, { useState, useEffect } from "react";

const ErrorPage: React.FC = () => {
  const [criticalError, setCriticalError] = useState<string | null>(null);

  useEffect(() => {
    const globalErrorHandler = new GlobalErrorHandling();

    // Check if there's any critical error
    if (globalErrorHandler.hasCriticalError()) {
      const errorMessage = globalErrorHandler.getCriticalErrorMessage();
      setCriticalError(errorMessage);
    }

    // Subscribe to error events
    // Add event listeners for any other sources of errors in your application

    return () => {
      // Clean up event listeners if necessary
    };
  }, []);

  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      {criticalError && <p className="critical-error">{criticalError}</p>}
      <p>
        Please try refreshing the page or contact support if the issue persists.
      </p>
    </div>
  );
};

export default ErrorPage;
