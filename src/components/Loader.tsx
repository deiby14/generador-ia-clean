/**
 * @fileoverview Loader component for displaying loading states
 * @description A reusable animated loader with customizable size and message
 * @author Generador IA Team
 * @version 1.0.0
 */

import React from 'react';

/**
 * Props interface for the Loader component
 * @interface LoaderProps
 */
interface LoaderProps {
  /** Optional loading message to display */
  message?: string;
  /** Size variant of the loader */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

/**
 * Size configuration mapping for the loader
 * @constant
 */
const SIZE_CLASSES = {
  sm: 'w-6 h-6',
  md: 'w-10 h-10',
  lg: 'w-16 h-16',
} as const;

/**
 * Text size configuration based on loader size
 * @constant
 */
const TEXT_SIZE_CLASSES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const;

/**
 * Loader Component
 * 
 * Displays an animated loading indicator with an optional message.
 * Features a modern spinning animation with gradient colors.
 * 
 * @param {LoaderProps} props - Component props
 * @returns {JSX.Element} The rendered loader component
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <Loader />
 * 
 * // With message
 * <Loader message="Generating your text..." />
 * 
 * // Large size with custom class
 * <Loader size="lg" message="Processing..." className="my-8" />
 * ```
 */
const Loader: React.FC<LoaderProps> = ({
  message = 'Generating...',
  size = 'md',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      {/* Animated spinner container */}
      <div className="relative">
        {/* Outer spinning ring */}
        <div
          className={`
            ${SIZE_CLASSES[size]}
            rounded-full
            border-4
            border-gray-200
            dark:border-gray-700
          `}
        />
        
        {/* Inner spinning gradient ring */}
        <div
          className={`
            ${SIZE_CLASSES[size]}
            absolute
            top-0
            left-0
            rounded-full
            border-4
            border-transparent
            border-t-indigo-600
            border-r-indigo-400
            animate-spin
          `}
          style={{ animationDuration: '0.8s' }}
        />
        
        {/* Pulsing center dot */}
        <div
          className={`
            absolute
            top-1/2
            left-1/2
            -translate-x-1/2
            -translate-y-1/2
            w-2
            h-2
            bg-indigo-500
            rounded-full
            animate-pulse
          `}
        />
      </div>

      {/* Loading message */}
      {message && (
        <p
          className={`
            ${TEXT_SIZE_CLASSES[size]}
            text-gray-600
            dark:text-gray-300
            font-medium
            animate-pulse
          `}
        >
          {message}
        </p>
      )}

      {/* Screen reader text */}
      <span className="sr-only">Loading, please wait...</span>
    </div>
  );
};

/**
 * Inline loader variant for use within buttons or small spaces
 * @param {Pick<LoaderProps, 'className'>} props - Component props
 * @returns {JSX.Element} The rendered inline loader
 */
export const InlineLoader: React.FC<Pick<LoaderProps, 'className'>> = ({
  className = '',
}) => {
  return (
    <svg
      className={`animate-spin h-5 w-5 text-white ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
};

export default Loader;
