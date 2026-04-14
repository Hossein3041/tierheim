import { Component, ReactNode } from "react";
import { TAlert } from "@/constants/Alerts";
import { createAlertFromError } from "@/components/context/contextFile";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallbackComponent: ReactNode;
  setAlert: (a: TAlert) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    const err = createAlertFromError(error);
    this.props.setAlert({
      ...err,
      errorMessage: err.errorMessage + " " + errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallbackComponent;
    }

    return this.props.children;
  }
}
