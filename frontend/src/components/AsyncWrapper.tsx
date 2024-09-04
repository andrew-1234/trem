import React, { ReactNode } from 'react';
import { Spinner } from 'react-bootstrap';
import { useSpinDelay } from 'spin-delay';
import styled from 'styled-components';

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
`;

interface AsyncWrapperProps {
  loading: boolean;
  error: string | null;
  data: any;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode | ((error: string) => ReactNode);
  emptyComponent?: ReactNode;
  children: ReactNode;
}

const AsyncWrapper: React.FC<AsyncWrapperProps> = ({
  loading,
  error,
  data,
  loadingComponent,
  errorComponent = (error: string) => <div>Error: {error}</div>,
  emptyComponent = null,
  children,
}) => {
  const showSpinner = useSpinDelay(loading, { delay: 300, minDuration: 200 });

  if (showSpinner) {
    return loadingComponent || (
      <SpinnerContainer>
        <Spinner animation="border" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </SpinnerContainer>
    );
  }

  if (error) {
    return <>{typeof errorComponent === 'function' ? errorComponent(error) : errorComponent}</>;
  }

  if (!data) {
    return <>{emptyComponent}</>;
  }

  return <>{children}</>;
};

export default AsyncWrapper;