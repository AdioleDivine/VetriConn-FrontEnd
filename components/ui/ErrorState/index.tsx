import React from 'react';
import styles from './index.module.scss';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  showRetry?: boolean;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  message = "We encountered an error while loading your data.",
  onRetry,
  showRetry = true,
}) => {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorContent}>
        <div className={styles.iconContainer}>
          <FaExclamationTriangle className={styles.errorIcon} />
        </div>
        <h2 className={styles.errorTitle}>{title}</h2>
        <p className={styles.errorMessage}>{message}</p>
        {showRetry && onRetry && (
          <button 
            className={styles.retryButton}
            onClick={onRetry}
          >
            <FaRedo className={styles.retryIcon} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};