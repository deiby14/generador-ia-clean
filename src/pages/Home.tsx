/**
 * @fileoverview Home page component
 * @description Main page of the AI Generator application
 * Orchestrates the form, loading states, and result display
 * @author Generador IA Team
 * @version 1.0.0
 */

import React, { useCallback } from 'react';
import GeneratorForm from '../components/GeneratorForm';
import ResultBox from '../components/ResultBox';
import Loader from '../components/Loader';
import { useGenerateText } from '../hooks/useGenerateText';

/**
 * Home Page Component
 * 
 * The main page of the Generador IA application that:
 * - Displays the hero section with branding
 * - Renders the generator form for user input
 * - Shows loading state during generation
 * - Displays results or errors appropriately
 * - Provides a clean, professional SaaS-style interface
 * 
 * @returns {JSX.Element} The rendered home page
 * 
 * @example
 * ```tsx
 * // In App.tsx
 * <Home />
 * ```
 */
const Home: React.FC = () => {
  // Use the custom hook for text generation
  const {
    generate,
    reset,
    validate,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    status,
  } = useGenerateText();

  /**
   * Handles form submission
   * Triggers the text generation process
   */
  const handleGenerate = useCallback(
    (prompt: string): void => {
      generate(prompt);
    },
    [generate]
  );

  /**
   * Handles clearing the result
   * Resets the state to allow new generation
   */
  const handleClear = useCallback((): void => {
    reset();
  }, [reset]);

  /**
   * Handles successful copy action
   * Could be extended to show a toast notification
   */
  const handleCopy = useCallback((): void => {
    // Could integrate with a toast notification system
    console.log('Text copied to clipboard');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950">
      {/* Header */}
      <header className="w-full py-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white"
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
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Generador IA
            </span>
          </div>

          {/* Status indicator */}
          <div className="flex items-center gap-2">
            <span
              className={`
                w-2
                h-2
                rounded-full
                ${status === 'loading' ? 'bg-amber-500 animate-pulse' : 'bg-green-500'}
              `}
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {status === 'loading' ? 'Processing...' : 'Ready'}
            </span>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Hero section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Generate Text with{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              AI Power
            </span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your ideas into polished content. Enter a prompt and let our
            AI generate creative, technical, or professional text in seconds.
          </p>
        </section>

        {/* Features badges */}
        <section className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { icon: '⚡', label: 'Fast Generation' },
            { icon: '🎯', label: 'Context-Aware' },
            { icon: '🔒', label: 'Secure' },
            { icon: '💡', label: 'Creative' },
          ].map((feature, index) => (
            <div
              key={index}
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                bg-white
                dark:bg-gray-800
                rounded-full
                shadow-sm
                border
                border-gray-200
                dark:border-gray-700
              "
            >
              <span>{feature.icon}</span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {feature.label}
              </span>
            </div>
          ))}
        </section>

        {/* Generator card */}
        <section
          className="
            bg-white
            dark:bg-gray-800
            rounded-2xl
            shadow-xl
            border
            border-gray-200
            dark:border-gray-700
            p-6
            md:p-8
            mb-8
          "
        >
          {/* Show form when idle or has error */}
          {(status === 'idle' || status === 'error') && !isSuccess && (
            <>
              <GeneratorForm
                onSubmit={handleGenerate}
                isLoading={isLoading}
                validatePrompt={validate}
              />

              {/* Error message */}
              {isError && error && (
                <div
                  className="
                    mt-6
                    p-4
                    bg-red-50
                    dark:bg-red-900/20
                    border
                    border-red-200
                    dark:border-red-800
                    rounded-xl
                    flex
                    items-start
                    gap-3
                  "
                  role="alert"
                >
                  <svg
                    className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0 mt-0.5"
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
                  <div>
                    <h4 className="font-semibold text-red-800 dark:text-red-300">
                      Generation Failed
                    </h4>
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      {error}
                    </p>
                    <button
                      onClick={handleClear}
                      className="
                        mt-2
                        text-sm
                        font-medium
                        text-red-700
                        dark:text-red-300
                        hover:underline
                      "
                    >
                      Try again
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="py-12">
              <Loader
                size="lg"
                message="Generating your text... This may take a moment."
              />
            </div>
          )}

          {/* Success state - show result */}
          {isSuccess && data && (
            <ResultBox
              text={data}
              onClear={handleClear}
              onCopy={handleCopy}
            />
          )}
        </section>

        {/* Info section */}
        <section className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'How it works',
              description:
                'Enter your prompt, click generate, and receive AI-crafted text tailored to your needs.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              ),
            },
            {
              title: 'Best practices',
              description:
                'Be specific with your prompts. Include context, desired tone, and any constraints.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              ),
            },
            {
              title: 'Privacy first',
              description:
                'Your prompts are processed securely and never stored. Your data stays yours.',
              icon: (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="
                p-6
                bg-white
                dark:bg-gray-800
                rounded-xl
                border
                border-gray-200
                dark:border-gray-700
                hover:shadow-lg
                transition-shadow
                duration-300
              "
            >
              <div
                className="
                  w-12
                  h-12
                  bg-indigo-100
                  dark:bg-indigo-900/30
                  rounded-xl
                  flex
                  items-center
                  justify-center
                  mb-4
                "
              >
                <svg
                  className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 border-t border-gray-200 dark:border-gray-800 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Built with React, TypeScript, and Tailwind CSS.
            Ready for production deployment on Vercel.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            © {new Date().getFullYear()} Generador IA. A professional portfolio project.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
