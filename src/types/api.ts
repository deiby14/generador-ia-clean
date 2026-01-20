/**
 * @fileoverview Type definitions for the AI Generator API
 * @description Contains all TypeScript interfaces and types used for API communication
 * @author Generador IA Team
 * @version 1.0.0
 */

/**
 * Request payload for text generation
 * @interface GenerateTextRequest
 */
export interface GenerateTextRequest {
  /** The user's input prompt for AI text generation */
  prompt: string;
  /** Optional maximum length of generated text */
  maxLength?: number;
  /** Optional temperature parameter for creativity (0-1) */
  temperature?: number;
}

/**
 * Metadata about the generation process
 * @interface GenerationMetadata
 */
export interface GenerationMetadata {
  /** The AI model used for generation */
  model: string;
  /** Number of tokens used in the response */
  tokensUsed: number;
  /** Processing timestamp */
  processingTime: number;
}

/**
 * Successful response from the text generation API
 * @interface GenerateTextResponse
 */
export interface GenerateTextResponse {
  /** The AI-generated text result */
  result: string;
  /** Timestamp of when the response was generated */
  timestamp?: string;
  /** Token count of the generated response */
  tokenCount?: number;
  /** Optional metadata about the generation */
  metadata?: GenerationMetadata;
}

/**
 * Error codes for API errors
 * @type ApiErrorCode
 */
export type ApiErrorCode = 
  | 'INVALID_PROMPT'
  | 'PROMPT_TOO_SHORT'
  | 'PROMPT_TOO_LONG'
  | 'REQUEST_ABORTED'
  | 'API_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN_ERROR';

/**
 * Error response structure from the API
 * @interface ApiError
 */
export interface ApiError {
  /** Error message describing what went wrong */
  message: string;
  /** Error code identifier */
  code: ApiErrorCode;
  /** HTTP status code */
  status: number;
  /** Optional detailed error information */
  details?: string;
}

/**
 * Possible states for the generation process
 * @type GenerationStatus
 */
export type GenerationStatus = 'idle' | 'loading' | 'success' | 'error';

/**
 * Complete state object for the generation hook
 * @interface GenerationState
 */
export interface GenerationState {
  /** Current status of the generation process */
  status: GenerationStatus;
  /** Generated text result (null if not yet generated) */
  data: string | null;
  /** Error message if generation failed */
  error: string | null;
  /** Whether a generation is currently in progress */
  isLoading: boolean;
  /** Whether the generation completed successfully */
  isSuccess: boolean;
  /** Whether the generation resulted in an error */
  isError: boolean;
}
