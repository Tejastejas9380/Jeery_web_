import React, { Component } from "react";

class ErrorBoundary extends Component {
     state = { hasError: false, error: null };

     static getDerivedStateFromError(error) {
          // Update state so the next render shows fallback UI
          return { hasError: true, error };
     }

     componentDidCatch(error, errorInfo) {
          // You can log the error to an error reporting service
          console.error("ErrorBoundary caught an error:", error, errorInfo);
     }

     render() {
          if (this.state.hasError) {
               // Fallback UI when an error occurs
               return (
                    <div>
                         <h2>Something went wrong.</h2>
                         <p>{this.state.error?.message || "An unexpected error occurred."}</p>
                    </div>
               );
          }
          return this.props.children;
     }
}

export default ErrorBoundary;