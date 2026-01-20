/**
 * @fileoverview GeneratorForm component for user input
 * @description A form component that handles user prompt input and submission
 * @author Generador IA Team
 * @version 1.0.0
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { InlineLoader } from './Loader';

/**
 * Props interface for the GeneratorForm component
 * @interface GeneratorFormProps
 */
interface GeneratorFormProps {
  /** Callback function when form is submitted */
  onSubmit: (prompt: string) => void;
  /** Whether the form is currently in loading state */
  isLoading: boolean;
  /** Optional validation function for the prompt */
  validatePrompt?: (prompt: string) => { isValid: boolean; error?: string };
  /** Optional placeholder text for the textarea */
  placeholder?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Example prompts to help users get started
 * @constant
 */
const EXAMPLE_PROMPTS = [
  'Write a creative story about a robot learning to paint',
  'Explain quantum computing in simple terms',
  'Generate a technical specification for a REST API',
  'Create a marketing tagline for an eco-friendly product',
];

/**
 * GeneratorForm Component
 * 
 * A professional form component for AI text generation that includes:
 * - Textarea with character count
 * - Real-time validation
 * - Example prompts for inspiration
 * - Loading state handling
 * - Keyboard shortcuts (Ctrl/Cmd + Enter to submit)
 * 
 * @param {GeneratorFormProps} props - Component props
 * @returns {JSX.Element} The rendered form component
 * 
 * @example
 * ```tsx
 * <GeneratorForm
 *   onSubmit={(prompt) => generateText(prompt)}
 *   isLoading={isGenerating}
 *   validatePrompt={validateFn}
 * />
 * ```
 */
const GeneratorForm: React.FC<GeneratorFormProps> = ({
  onSubmit,
  isLoading,
  validatePrompt,
  placeholder = 'Enter your prompt here... Be as specific as possible for better results.',
  className = '',
}) => {
  // State for the prompt input
  const [prompt, setPrompt] = useState<string>('');
  
  // State for validation error
  const [validationError, setValidationError] = useState<string | null>(null);
  
  // Ref for the textarea element
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Character limit for the prompt
  const MAX_CHARACTERS = 2000;

  /**
   * Handles changes to the textarea input
   * Performs real-time validation if a validation function is provided
   */
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
      const value = event.target.value;
      
      // Enforce character limit
      if (value.length > MAX_CHARACTERS) {
        return;
      }

      setPrompt(value);

      // Clear validation error when user starts typing
      if (validationError && value.length > 0) {
        setValidationError(null);
      }
    },
    [validationError]
  );

  /**
   * Handles form submission
   * Validates the prompt before calling the onSubmit callback
   */
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>): void => {
      event.preventDefault();

      // Validate the prompt
      if (validatePrompt) {
        const validation = validatePrompt(prompt);
        if (!validation.isValid) {
          setValidationError(validation.error || 'Invalid prompt');
          return;
        }
      }

      // Basic validation if no custom validator provided
      if (!prompt.trim()) {
        setValidationError('Please enter a prompt');
        return;
      }

      // Clear any existing errors and submit
      setValidationError(null);
      onSubmit(prompt.trim());
    },
    [prompt, onSubmit, validatePrompt]
  );

  /**
   * Handles keyboard shortcuts
   * Ctrl/Cmd + Enter to submit
   */
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>): void => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        
        // Create a synthetic form event and submit
        const form = textareaRef.current?.closest('form');
        if (form) {
          form.requestSubmit();
        }
      }
    },
    []
  );

  /**
   * Handles clicking on an example prompt
   * Sets the prompt and focuses the textarea
   */
  const handleExampleClick = useCallback((example: string): void => {
    setPrompt(example);
    setValidationError(null);
    textareaRef.current?.focus();
  }, []);

  /**
   * Auto-resize textarea based on content
   */
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 300)}px`;
    }
  }, [prompt]);

  // Calculate character count percentage for visual indicator
  const characterPercentage = (prompt.length / MAX_CHARACTERS) * 100;
  const isNearLimit = characterPercentage > 80;

  return (
    <form
      onSubmit={handleSubmit}
      className={`w-full space-y-4 ${className}`}
      noValidate
    >
      {/* Textarea container */}
      <div className="relative">
        <label
          htmlFor="prompt-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
        >
          Your Prompt
        </label>
        
        <div
          className={`
            relative
            rounded-xl
            border-2
            transition-all
            duration-200
            ${
              validationError
                ? 'border-red-400 dark:border-red-500'
                : 'border-gray-200 dark:border-gray-600 focus-within:border-indigo-500 dark:focus-within:border-indigo-400'
            }
            bg-white
            dark:bg-gray-800
            shadow-sm
            hover:shadow-md
          `}
        >
          <textarea
            ref={textareaRef}
            id="prompt-input"
            name="prompt"
            value={prompt}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={isLoading}
            rows={4}
            className={`
              w-full
              px-4
              py-3
              text-gray-800
              dark:text-gray-200
              bg-transparent
              placeholder-gray-400
              dark:placeholder-gray-500
              resize-none
              focus:outline-none
              disabled:opacity-50
              disabled:cursor-not-allowed
              rounded-xl
            `}
            aria-describedby={validationError ? 'prompt-error' : undefined}
            aria-invalid={!!validationError}
          />

          {/* Character count indicator */}
          <div
            className={`
              absolute
              bottom-2
              right-3
              text-xs
              font-medium
              transition-colors
              ${
                isNearLimit
                  ? 'text-amber-500 dark:text-amber-400'
                  : 'text-gray-400 dark:text-gray-500'
              }
            `}
          >
            {prompt.length} / {MAX_CHARACTERS}
          </div>
        </div>

        {/* Validation error message */}
        {validationError && (
          <p
            id="prompt-error"
            className="mt-2 text-sm text-red-500 dark:text-red-400 flex items-center gap-1"
            role="alert"
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {validationError}
          </p>
        )}

        {/* Keyboard shortcut hint */}
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Press <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono">Enter</kbd> to generate
        </p>
      </div>

      {/* Example prompts section */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
          Try an example:
        </p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((example, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleExampleClick(example)}
              disabled={isLoading}
              className="
                px-3
                py-1.5
                text-xs
                font-medium
                text-indigo-600
                dark:text-indigo-400
                bg-indigo-50
                dark:bg-indigo-900/30
                hover:bg-indigo-100
                dark:hover:bg-indigo-900/50
                rounded-full
                transition-colors
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {example.length > 40 ? `${example.substring(0, 40)}...` : example}
            </button>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className={`
          w-full
          flex
          items-center
          justify-center
          gap-2
          px-6
          py-3
          text-base
          font-semibold
          text-white
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          hover:from-indigo-700
          hover:to-purple-700
          disabled:from-gray-400
          disabled:to-gray-500
          disabled:cursor-not-allowed
          rounded-xl
          shadow-lg
          hover:shadow-xl
          transform
          hover:-translate-y-0.5
          active:translate-y-0
          transition-all
          duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          focus:ring-offset-2
          dark:focus:ring-offset-gray-900
        `}
      >
        {isLoading ? (
          <>
            <InlineLoader />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <span>Generate with AI</span>
          </>
        )}
      </button>
    </form>
  );
};

export default GeneratorForm;
