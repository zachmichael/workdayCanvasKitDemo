import * as React from 'react';
import {Banner} from '@workday/canvas-kit-react/banner';

interface ErrorBoundaryState {
  error: Error | null;
}

/**
 * Catches render errors from any showcase page so one broken example cannot
 * blank the whole site.
 */
export class ErrorBoundary extends React.Component<
  {children: React.ReactNode},
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {error: null};

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {error};
  }

  render() {
    if (this.state.error) {
      return (
        <Banner hasError={true}>
          <Banner.Icon />
          <Banner.Label>This example failed to render: {this.state.error.message}</Banner.Label>
        </Banner>
      );
    }

    return this.props.children;
  }
}
