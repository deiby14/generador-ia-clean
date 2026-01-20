/**
 * @fileoverview ResultBox component for displaying AI-generated text
 * @description A styled container that displays the generated text with copy functionality
 * @author Generador IA Team
 * @version 1.0.0
 */

import React, { useState, useCallback } from 'react';

/**
 * Props interface for the ResultBox component
 * @interface ResultBoxProps
 */
interface ResultBoxProps {
  /** The generated text to display */
  text: string;
  /** Optional callback when the result is cleared */
  onClear?: () => void;
  /** Optional callback when the text is copied */
  onCopy?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Copy button states
 * @type CopyState
 */
type CopyState = 'idle' | 'copied' | 'error';

/**
 * ResultBox Component
 * 
 * Displays the AI-generated text in a styled container with:
 * - Copy to clipboard functionality
 * - Clear/reset button
 * - Smooth animations
 * - Responsive design
 * 
 * @param {ResultBoxProps} props - Component props
 * @returns {JSX.Element} The rendered result box component
 * 
 * @example
 * ```tsx
 * <ResultBox
 *   text="Generated AI response here..."
 *   onClear={() => resetGeneration()}
 *   onCopy={() => showToast('Copied!')}
 * />
 * ```
 */
const ResultBox: React.FC<ResultBoxProps> = ({
  text,
  onClear,
  onCopy,
  className = '',
}) => {
  // State for copy button feedback
  const [copyState, setCopyState] = useState<CopyState>('idle');

  /**
   * Handles copying text to clipboard
   * Provides visual feedback on success/failure
   */
  const handleCopy = useCallback(async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyState('copied');
      onCopy?.();
      
      // Reset copy state after 2 seconds
      setTimeout(() => {
        setCopyState('idle');
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
      setCopyState('error');
      
      // Reset error state after 2 seconds
      setTimeout(() => {
        setCopyState('idle');
      }, 2000);
    }
  }, [text, onCopy]);

  /**
   * Returns the appropriate icon and text for the copy button
   */
  const getCopyButtonContent = (): { icon: React.ReactNode; label: string } => {
    switch (copyState) {
      case 'copied':
        return {
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ),
          label: 'Copied!',
        };
      case 'error':
        return {
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ),
          label: 'Failed',
        };
      default:
        return {
          icon: (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          ),
          label: 'Copy',
        };
    }
  };

  const { icon, label } = getCopyButtonContent();

  return (
    <div
      className={`
        w-full
        bg-white
        dark:bg-gray-800
        rounded-xl
        shadow-lg
        border
        border-gray-200
        dark:border-gray-700
        overflow-hidden
        animate-fadeIn
        ${className}
      `}
    >
      {/* Header with actions */}
      <div
        className="
          flex
          items-center
          justify-between
          px-4
          py-3
          bg-gradient-to-r
          from-indigo-50
          to-purple-50
          dark:from-gray-700
          dark:to-gray-700
          border-b
          border-gray-200
          dark:border-gray-600
        "
      >
        {/* Title with icon */}
        <div className="flex items-center gap-2">
          <svg
            className="w-5 h-5 text-indigo-600 dark:text-indigo-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
          <h3 className="font-semibold text-gray-800 dark:text-gray-200">
            AI Generated Response
          </h3>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Copy button */}
          <button
            onClick={handleCopy}
            className={`
              flex
              items-center
              gap-1.5
              px-3
              py-1.5
              text-sm
              font-medium
              rounded-lg
              transition-all
              duration-200
              ${
                copyState === 'copied'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : copyState === 'error'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500'
              }
              border
              border-gray-200
              dark:border-gray-500
            `}
            aria-label={label}
          >
            {icon}
            <span>{label}</span>
          </button>

          {/* Clear button */}
          {onClear && (
            <button
              onClick={onClear}
              className="
                flex
                items-center
                gap-1.5
                px-3
                py-1.5
                text-sm
                font-medium
                text-gray-600
                dark:text-gray-300
                bg-white
                dark:bg-gray-600
                hover:bg-gray-100
                dark:hover:bg-gray-500
                rounded-lg
                border
                border-gray-200
                dark:border-gray-500
                transition-colors
                duration-200
              "
              aria-label="Clear result"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              <span>New</span>
            </button>
          )}
        </div>
      </div>

      {/* Content area */}
      <div className="p-6">
        <p
          className="
            text-gray-700
            dark:text-gray-300
            leading-relaxed
            whitespace-pre-wrap
            text-base
          "
        >
          {text}
        </p>
      </div>

      {/* Footer with metadata */}
      <div
        className="
          px-4
          py-2
          bg-gray-50
          dark:bg-gray-750
          border-t
          border-gray-200
          dark:border-gray-600
          text-xs
          text-gray-500
          dark:text-gray-400
          flex
          items-center
          justify-between
        "
      >
        <span>
          {text.split(' ').length} words • {text.length} characters
        </span>
        <span>Generated just now</span>
      </div>
    </div>
  );
};

export default ResultBox;
