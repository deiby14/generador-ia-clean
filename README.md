# 🧠 Generador IA

> AI-Powered Text Generation Application

A professional, production-ready web application for AI-powered text generation built with React 18, TypeScript, Vite, and Tailwind CSS. Designed with a clean SaaS-style UI and prepared for deployment on Vercel.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=flat-square&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss)

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [API Integration](#-api-integration)
- [Deployment](#-deployment)
- [Technical Decisions](#-technical-decisions)
- [Contributing](#-contributing)

## ✨ Features

- **AI Text Generation**: Transform prompts into polished content
- **Real-time State Management**: Loading, success, and error states
- **Responsive Design**: Mobile-first SaaS-style UI
- **Dark Mode Support**: Automatic theme detection
- **Accessibility**: ARIA labels and keyboard navigation
- **Copy to Clipboard**: One-click result copying
- **Character Counter**: Real-time input validation
- **Example Prompts**: Quick-start suggestions
- **Keyboard Shortcuts**: Ctrl+Enter to generate

## 🏗 Architecture

### Design Principles

This application follows several key architectural principles:

1. **Separation of Concerns**: Clear boundaries between UI, business logic, and data layers
2. **Single Responsibility**: Each component/hook has one specific purpose
3. **Composition over Inheritance**: React components composed together
4. **Type Safety**: Full TypeScript coverage for reliability
5. **Scalability**: Structure ready for feature expansion

### Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      PRESENTATION LAYER                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Pages     │  │ Components  │  │      Styles         │  │
│  │  (Home.tsx) │  │ (Form, Box) │  │  (Tailwind CSS)     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│                      BUSINESS LOGIC LAYER                    │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    Custom Hooks                          ││
│  │              (useGenerateText.ts)                        ││
│  │   - State management (loading, error, success)           ││
│  │   - Side effects handling                                ││
│  │   - Abort controller for cancellation                    ││
│  └─────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────┤
│                        DATA LAYER                            │
│  ┌─────────────────────┐  ┌─────────────────────────────┐   │
│  │    API Services     │  │        Types                │   │
│  │ (generateText.ts)   │  │      (api.ts)               │   │
│  │  - Fetch wrapper    │  │  - Request/Response types   │   │
│  │  - Error handling   │  │  - State interfaces         │   │
│  │  - Simulated API    │  │  - Error types              │   │
│  └─────────────────────┘  └─────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Data Flow

```
User Input → GeneratorForm → useGenerateText Hook → API Service → Response
     ↑                              ↓
     └──────── ResultBox ←── State Update
```

## 📁 Project Structure

```
generador-ia-clean/
├── public/                    # Static assets
│   └── vite.svg              # Favicon
├── src/
│   ├── api/                  # API layer
│   │   └── generateText.ts   # Text generation API service
│   ├── components/           # Reusable UI components
│   │   ├── GeneratorForm.tsx # Input form with validation
│   │   ├── ResultBox.tsx     # Result display with actions
│   │   └── Loader.tsx        # Loading spinner component
│   ├── hooks/                # Custom React hooks
│   │   └── useGenerateText.ts # Generation state management
│   ├── pages/                # Page components
│   │   └── Home.tsx          # Main application page
│   ├── types/                # TypeScript definitions
│   │   └── api.ts            # API-related types
│   ├── App.tsx               # Root component
│   ├── main.tsx              # Application entry point
│   └── index.css             # Global styles & Tailwind
├── index.html                # HTML template
├── package.json              # Dependencies & scripts
├── tailwind.config.js        # Tailwind configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.ts            # Vite build configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Documentation
```

### File Responsibilities

| File | Purpose |
|------|---------|
| `api/generateText.ts` | Handles API communication, includes simulated responses for development |
| `hooks/useGenerateText.ts` | Manages generation state, provides generate/reset/abort functions |
| `components/GeneratorForm.tsx` | User input interface with validation and example prompts |
| `components/ResultBox.tsx` | Displays generated text with copy and clear actions |
| `components/Loader.tsx` | Animated loading indicator with size variants |
| `pages/Home.tsx` | Main page layout, orchestrates all components |
| `types/api.ts` | TypeScript interfaces for type safety |

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/generador-ia.git

# Navigate to project directory
cd generador-ia-clean

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |
| `npm run type-check` | Run TypeScript type checking |

## 💡 Usage

### Basic Usage

1. Enter a prompt in the text area (e.g., "Write a product description for a smartwatch")
2. Click "Generate with AI" or press `Ctrl+Enter`
3. Wait for the AI to generate the response
4. Copy the result or clear to start over

### Example Prompts

The application includes pre-built example prompts:
- Write a product description for a smartwatch
- Create a professional email for a job application
- Generate a creative story about a robot
- Write a marketing slogan for a coffee brand

### Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` | Generate text |
| `Tab` | Navigate between elements |

## 🔌 API Integration

### Current Implementation (Simulated)

The application currently uses a simulated API that returns contextual responses based on the prompt content. This is ideal for:
- Development and testing
- Portfolio demonstrations
- Offline functionality

### Production Integration (OpenAI)

To connect to OpenAI's API, update `src/api/generateText.ts`:

```typescript
// Uncomment and configure the production implementation
export const generateText = async (
  request: GenerateTextRequest,
  signal?: AbortSignal
): Promise<GenerateTextResponse> => {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
    signal,
  });

  if (!response.ok) {
    throw new Error('API request failed');
  }

  return response.json();
};
```

### Vercel Serverless Function

Create `api/generate.ts` for Vercel:

```typescript
import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 500,
    });

    return res.status(200).json({
      result: completion.choices[0].message.content,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Generation failed' });
  }
}
```

## 🌐 Deployment

### Vercel Deployment

1. **Connect Repository**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Environment Variables**
   Set in Vercel Dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key (for production)

3. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

### Manual Deployment

```bash
# Build the application
npm run build

# The dist/ folder contains the production build
# Upload to any static hosting service
```

## 🔧 Technical Decisions

### Why These Technologies?

| Technology | Reason |
|------------|--------|
| **React 18** | Latest features, concurrent rendering, automatic batching |
| **TypeScript** | Type safety, better DX, catch errors at compile time |
| **Vite** | Fast HMR, optimized builds, modern tooling |
| **Tailwind CSS** | Utility-first, rapid prototyping, consistent design |
| **Fetch API** | Native browser API, no additional dependencies |

### State Management Approach

We use a custom hook (`useGenerateText`) instead of external state management libraries because:

1. **Simplicity**: The state is localized to the generation feature
2. **Performance**: No unnecessary re-renders from global state
3. **Testability**: Easy to test in isolation
4. **Bundle Size**: No additional dependencies

### Component Design

Components follow these principles:

- **Presentational vs Container**: Clear separation of concerns
- **Props Interface**: All props are typed with TypeScript
- **Default Props**: Sensible defaults for optional props
- **Accessibility**: ARIA labels and semantic HTML

## 🧪 Testing (Future Enhancement)

Recommended testing setup:

```bash
# Install testing dependencies
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

Example test for the hook:

```typescript
import { renderHook, act } from '@testing-library/react';
import { useGenerateText } from './useGenerateText';

describe('useGenerateText', () => {
  it('should generate text successfully', async () => {
    const { result } = renderHook(() => useGenerateText());
    
    await act(async () => {
      await result.current.generate('Test prompt');
    });
    
    expect(result.current.state.status).toBe('success');
    expect(result.current.state.result).toBeDefined();
  });
});
```

## 📄 License

MIT License - feel free to use this project for your portfolio or commercial applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

Built with ❤️ using React, TypeScript, and Tailwind CSS
