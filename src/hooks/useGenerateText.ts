/**
 * @fileoverview Custom hook for AI text generation
 * @description Provides a clean interface for components to interact with the generation API
 * Handles all state management, loading states, and error handling
 * @author Generador IA Team
 * @version 1.0.0
 */

import { useState, useCallback, useRef } from 'react';
import { generateText, validatePrompt } from '../api/generateText';
import type { GenerationState, GenerateTextRequest, ApiError } from '../types/api';

/**
 * Initial state for the generation hook
 * @constant {GenerationState}
 */
const INITIAL_STATE: GenerationState = {
  status: 'idle',
  data: null,
  error: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

/**
 * Return type for the useGenerateText hook
 * @interface UseGenerateTextReturn
 */
interface UseGenerateTextReturn extends GenerationState {
  /** Function to trigger text generation */
  generate: (prompt: string) => Promise<void>;
  /** Function to reset the state to initial values */
  reset: () => void;
  /** Function to validate a prompt without generating */
  validate: (prompt: string) => { isValid: boolean; error?: string };
  /** Abort controller for cancelling ongoing requests */
  abort: () => void;
}

/**
 * Custom hook for managing AI text generation
 * 
 * This hook encapsulates all the logic for:
 * - Making API calls to generate text
 * - Managing loading, success, and error states
 * - Providing validation utilities
 * - Handling request cancellation
 * 
 * @returns {UseGenerateTextReturn} Object containing state and control functions
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { generate, data, isLoading, isError, error, reset } = useGenerateText();
 * 
 *   const handleSubmit = async (prompt: string) => {
 *     await generate(prompt);
 *   };
 * 
 *   if (isLoading) return <Loader />;
 *   if (isError) return <Error message={error} />;
 *   if (data) return <Result text={data} />;
 * 
 *   return <Form onSubmit={handleSubmit} />;
 * }
 * ```
 */
export const useGenerateText = (): UseGenerateTextReturn => {
  // Main state for tracking generation status and results
  const [state, setState] = useState<GenerationState>(INITIAL_STATE);
  
  // Ref to track if a request is in progress (for preventing race conditions)
  const isGeneratingRef = useRef<boolean>(false);
  
  // Ref for abort controller to cancel ongoing requests
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Generates text based on the provided prompt
   * Handles all state transitions and error handling
   * 
   * @param {string} prompt - The user's input prompt
   * @returns {Promise<void>}
   */
  const generate = useCallback(async (prompt: string): Promise<void> => {
    // Validate the prompt before making the API call
    const validation = validatePrompt(prompt);
    if (!validation.isValid) {
      setState({
        status: 'error',
        data: null,
        error: validation.error || 'Invalid prompt',
        isLoading: false,
        isSuccess: false,
        isError: true,
      });
      return;
    }

    // Prevent multiple simultaneous requests
    if (isGeneratingRef.current) {
      console.warn('Generation already in progress');
      return;
    }

    // Cancel any previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller for this request
    abortControllerRef.current = new AbortController();
    isGeneratingRef.current = true;

    // Set loading state
    setState({
      status: 'loading',
      data: null,
      error: null,
      isLoading: true,
      isSuccess: false,
      isError: false,
    });

    try {
      // Prepare the request payload
      const request: GenerateTextRequest = {
        prompt: prompt.trim(),
      };

      // Make the API call
      const response = await generateText(request);

      // Check if the request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      // Update state with successful response
      setState({
        status: 'success',
        data: response.result,
        error: null,
        isLoading: false,
        isSuccess: true,
        isError: false,
      });
    } catch (error) {
      // Check if the request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }

      // Handle API errors
      const apiError = error as ApiError;
      setState({
        status: 'error',
        data: null,
        error: apiError.message || 'An unexpected error occurred',
        isLoading: false,
        isSuccess: false,
        isError: true,
      });
    } finally {
      isGeneratingRef.current = false;
    }
  }, []);

  /**
   * Resets the hook state to initial values
   * Useful for clearing results and starting fresh
   */
  const reset = useCallback((): void => {
    // Abort any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    isGeneratingRef.current = false;
    setState(INITIAL_STATE);
  }, []);

  /**
   * Validates a prompt without triggering generation
   * Useful for real-time form validation
   * 
   * @param {string} prompt - The prompt to validate
   * @returns {{ isValid: boolean; error?: string }} Validation result
   */
  const validate = useCallback((prompt: string): { isValid: boolean; error?: string } => {
    return validatePrompt(prompt);
  }, []);

  /**
   * Aborts any ongoing generation request
   * Useful for cancelling long-running requests
   */
  const abort = useCallback((): void => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      isGeneratingRef.current = false;
      setState((prev) => ({
        ...prev,
        status: 'idle',
        isLoading: false,
      }));
    }
  }, []);

  return {
    ...state,
    generate,
    reset,
    validate,
    abort,
  };
};

export default useGenerateText;
