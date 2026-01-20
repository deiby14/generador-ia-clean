/**
 * @fileoverview API service for text generation
 * @description Handles communication with the AI text generation API
 * @author Generador IA Team
 * @version 1.0.0
 */

import type { GenerateTextRequest, GenerateTextResponse, ApiError } from '../types/api';

/**
 * Configuration constants for the API
 */
const API_CONFIG = {
  /** Simulated network delay range in milliseconds */
  MIN_DELAY: 800,
  MAX_DELAY: 2000,
  /** Minimum prompt length required */
  MIN_PROMPT_LENGTH: 3,
  /** Maximum prompt length allowed */
  MAX_PROMPT_LENGTH: 2000,
} as const;

/**
 * Specific response templates for different types of requests
 * These provide contextual, useful responses based on the prompt content
 */
const SPECIFIC_RESPONSES: Record<string, string[]> = {
  // Names - Boys
  nombres_chicos: [
    `Aquí tienes una lista de nombres de chicos populares:

**Nombres clásicos:**
• Alejandro
• Carlos
• Daniel
• David
• Fernando

**Nombres modernos:**
• Iker
• Hugo
• Lucas
• Mateo
• Leo

**Nombres internacionales:**
• Alexander
• Noah
• Liam
• Oliver
• Ethan

**Nombres tradicionales españoles:**
• Pablo
• Javier
• Miguel
• Antonio
• Sergio`,
  ],
  
  // Names - Girls
  nombres_chicas: [
    `Aquí tienes una lista de nombres de chicas populares:

**Nombres clásicos:**
• María
• Carmen
• Ana
• Laura
• Isabel

**Nombres modernos:**
• Lucía
• Sofía
• Martina
• Emma
• Valentina

**Nombres internacionales:**
• Olivia
• Mia
• Isabella
• Charlotte
• Amelia

**Nombres tradicionales españoles:**
• Elena
• Paula
• Alba
• Nerea
• Claudia`,
  ],
  
  // Product descriptions
  producto: [
    `**Descripción del Producto**

Presentamos un producto innovador diseñado para superar tus expectativas. Con materiales de primera calidad y un diseño ergonómico, este artículo combina funcionalidad y estilo.

**Características principales:**
• Diseño moderno y elegante
• Materiales duraderos y sostenibles
• Fácil de usar y mantener
• Garantía de satisfacción

**Beneficios:**
✓ Mejora tu productividad diaria
✓ Ahorra tiempo y esfuerzo
✓ Excelente relación calidad-precio

*¡Disponible ahora con envío gratuito!*`,
  ],
  
  // Emails
  email: [
    `**Asunto:** [Tu asunto aquí]

Estimado/a [Nombre],

Espero que este mensaje le encuentre bien. Me dirijo a usted para [motivo del email].

[Cuerpo del mensaje con los detalles principales]

Quedo a su disposición para cualquier consulta o aclaración que pueda necesitar. No dude en contactarme si requiere información adicional.

Agradezco de antemano su atención y tiempo.

Cordialmente,

[Tu nombre]
[Tu cargo/posición]
[Información de contacto]`,
  ],
  
  // Stories
  historia: [
    `**El Viaje Inesperado**

En un pequeño pueblo rodeado de montañas, vivía una joven llamada Elena que soñaba con explorar el mundo más allá del horizonte.

Un día, mientras caminaba por el bosque, encontró un antiguo mapa escondido en el hueco de un árbol centenario. El mapa mostraba un camino hacia un lugar misterioso llamado "El Valle de los Sueños".

Sin pensarlo dos veces, Elena preparó su mochila y comenzó su aventura. En el camino, conoció a un sabio búho que le enseñó que el verdadero tesoro no estaba al final del viaje, sino en las experiencias y amistades que forjaría durante el camino.

*Y así, Elena descubrió que la mayor aventura es aquella que nos transforma por dentro.*`,
  ],
  
  // Marketing slogans
  slogan: [
    `Aquí tienes varias opciones de slogans creativos:

**Opciones impactantes:**
1. "Innovación que inspira, calidad que perdura"
2. "Tu éxito, nuestra pasión"
3. "Donde los sueños se hacen realidad"

**Opciones emocionales:**
4. "Porque tú mereces lo mejor"
5. "Conectando corazones, creando momentos"
6. "La excelencia está en los detalles"

**Opciones directas:**
7. "Simple. Efectivo. Extraordinario."
8. "El futuro comienza hoy"
9. "Más que un producto, una experiencia"

*Elige el que mejor represente tu marca y valores.*`,
  ],
  
  // Code
  codigo: [
    `Aquí tienes un ejemplo de código:

\`\`\`javascript
// Función para saludar
function saludar(nombre) {
  return \`¡Hola, \${nombre}! Bienvenido/a.\`;
}

// Ejemplo de uso
const mensaje = saludar("Usuario");
console.log(mensaje);

// Función con validación
function procesarDatos(datos) {
  if (!datos || datos.length === 0) {
    throw new Error("Los datos no pueden estar vacíos");
  }
  
  return datos.map(item => ({
    ...item,
    procesado: true,
    fecha: new Date().toISOString()
  }));
}
\`\`\`

*Este código incluye buenas prácticas como validación de entrada y uso de funciones modernas de JavaScript.*`,
  ],
  
  // Recipes
  receta: [
    `**Receta: Pasta con Salsa de Tomate Casera**

**Ingredientes (4 personas):**
• 400g de pasta (espaguetis o penne)
• 500g de tomates maduros
• 2 dientes de ajo
• Aceite de oliva virgen extra
• Albahaca fresca
• Sal y pimienta al gusto
• Queso parmesano rallado

**Preparación:**

1. **Preparar la salsa:** Escaldar los tomates, pelarlos y triturarlos.

2. **Sofreír:** En una sartén con aceite, dorar el ajo picado sin que se queme.

3. **Cocinar:** Añadir el tomate triturado, sal, pimienta y cocinar 20 minutos a fuego medio.

4. **La pasta:** Hervir la pasta en agua con sal según las instrucciones del paquete.

5. **Servir:** Mezclar la pasta con la salsa, añadir albahaca fresca y queso parmesano.

*¡Buon appetito!* 🍝`,
  ],
  
  // Lists
  lista: [
    `Aquí tienes una lista organizada:

**Categoría Principal:**

1. **Primer elemento**
   - Detalle importante
   - Información adicional

2. **Segundo elemento**
   - Característica destacada
   - Beneficio clave

3. **Tercer elemento**
   - Punto relevante
   - Consideración especial

4. **Cuarto elemento**
   - Aspecto fundamental
   - Nota importante

5. **Quinto elemento**
   - Dato interesante
   - Conclusión

*Esta lista puede adaptarse según tus necesidades específicas.*`,
  ],
  
  // Ideas
  ideas: [
    `**Ideas Creativas para tu Proyecto:**

💡 **Idea 1: Innovación Digital**
Implementar una solución tecnológica que automatice procesos y mejore la eficiencia.

💡 **Idea 2: Experiencia del Usuario**
Rediseñar la interfaz para hacerla más intuitiva y atractiva visualmente.

💡 **Idea 3: Sostenibilidad**
Incorporar prácticas ecológicas que reduzcan el impacto ambiental.

💡 **Idea 4: Colaboración**
Crear espacios de trabajo colaborativo que fomenten la creatividad en equipo.

💡 **Idea 5: Personalización**
Ofrecer opciones personalizables que se adapten a las necesidades individuales.

*Cada idea puede desarrollarse según los recursos y objetivos disponibles.*`,
  ],
};

/**
 * Detects the type of request based on prompt keywords
 * @param prompt - The user's input prompt
 * @returns The detected category key or null
 */
const detectPromptCategory = (prompt: string): string | null => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Names detection
  if (
    (lowerPrompt.includes('nombre') || lowerPrompt.includes('names')) &&
    (lowerPrompt.includes('chico') || lowerPrompt.includes('niño') || 
     lowerPrompt.includes('hombre') || lowerPrompt.includes('masculino') ||
     lowerPrompt.includes('boy') || lowerPrompt.includes('male'))
  ) {
    return 'nombres_chicos';
  }
  
  if (
    (lowerPrompt.includes('nombre') || lowerPrompt.includes('names')) &&
    (lowerPrompt.includes('chica') || lowerPrompt.includes('niña') || 
     lowerPrompt.includes('mujer') || lowerPrompt.includes('femenino') ||
     lowerPrompt.includes('girl') || lowerPrompt.includes('female'))
  ) {
    return 'nombres_chicas';
  }
  
  // Just "nombres" without gender specification - default to mixed
  if (lowerPrompt.includes('nombre') && !lowerPrompt.includes('chico') && !lowerPrompt.includes('chica')) {
    return 'nombres_chicos'; // Default to boys, but could be randomized
  }
  
  // Product descriptions
  if (
    lowerPrompt.includes('producto') || lowerPrompt.includes('product') ||
    lowerPrompt.includes('descripción') || lowerPrompt.includes('description')
  ) {
    return 'producto';
  }
  
  // Emails
  if (
    lowerPrompt.includes('email') || lowerPrompt.includes('correo') ||
    lowerPrompt.includes('carta') || lowerPrompt.includes('letter')
  ) {
    return 'email';
  }
  
  // Stories
  if (
    lowerPrompt.includes('historia') || lowerPrompt.includes('story') ||
    lowerPrompt.includes('cuento') || lowerPrompt.includes('tale') ||
    lowerPrompt.includes('relato') || lowerPrompt.includes('narrativa')
  ) {
    return 'historia';
  }
  
  // Slogans
  if (
    lowerPrompt.includes('slogan') || lowerPrompt.includes('eslogan') ||
    lowerPrompt.includes('lema') || lowerPrompt.includes('tagline') ||
    lowerPrompt.includes('marketing')
  ) {
    return 'slogan';
  }
  
  // Code
  if (
    lowerPrompt.includes('código') || lowerPrompt.includes('code') ||
    lowerPrompt.includes('programar') || lowerPrompt.includes('function') ||
    lowerPrompt.includes('javascript') || lowerPrompt.includes('python')
  ) {
    return 'codigo';
  }
  
  // Recipes
  if (
    lowerPrompt.includes('receta') || lowerPrompt.includes('recipe') ||
    lowerPrompt.includes('cocinar') || lowerPrompt.includes('cook') ||
    lowerPrompt.includes('comida') || lowerPrompt.includes('food')
  ) {
    return 'receta';
  }
  
  // Lists
  if (
    lowerPrompt.includes('lista') || lowerPrompt.includes('list') ||
    lowerPrompt.includes('enumera') || lowerPrompt.includes('enumerate')
  ) {
    return 'lista';
  }
  
  // Ideas
  if (
    lowerPrompt.includes('idea') || lowerPrompt.includes('sugerencia') ||
    lowerPrompt.includes('suggestion') || lowerPrompt.includes('propuesta')
  ) {
    return 'ideas';
  }
  
  return null;
};

/**
 * Generates a generic response when no specific category is detected
 * @param prompt - The user's input prompt
 * @returns A contextual generic response
 */
const generateGenericResponse = (prompt: string): string => {
  const responses = [
    `Basándome en tu solicitud "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}", aquí está mi respuesta:

Esta es una respuesta generada por la IA simulada. En un entorno de producción, esta aplicación se conectaría a OpenAI o similar para proporcionar respuestas más específicas y detalladas.

**Para obtener mejores resultados, prueba con prompts como:**
• "Dame nombres de chicos/chicas"
• "Escribe una descripción de producto"
• "Crea un email profesional"
• "Genera una historia corta"
• "Dame ideas para un proyecto"
• "Escribe una receta de cocina"
• "Crea un slogan de marketing"

*Esta es una demostración de la arquitectura de la aplicación.*`,
    
    `He procesado tu solicitud: "${prompt.substring(0, 50)}${prompt.length > 50 ? '...' : ''}"

**Respuesta:**

Esta aplicación está diseñada para demostrar una arquitectura profesional de React con TypeScript. La API simulada reconoce varios tipos de solicitudes.

**Tipos de contenido soportados:**
✓ Nombres (chicos/chicas)
✓ Descripciones de productos
✓ Emails profesionales
✓ Historias y cuentos
✓ Slogans de marketing
✓ Código de programación
✓ Recetas de cocina
✓ Listas organizadas
✓ Ideas creativas

*Prueba con uno de estos tipos para ver respuestas más específicas.*`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

/**
 * Simulates network delay for realistic API behavior
 * @returns Promise that resolves after a random delay
 */
const simulateNetworkDelay = (): Promise<void> => {
  const delay = Math.random() * (API_CONFIG.MAX_DELAY - API_CONFIG.MIN_DELAY) + API_CONFIG.MIN_DELAY;
  return new Promise((resolve) => setTimeout(resolve, delay));
};

/**
 * Validates the request payload
 * @param request - The request to validate
 * @throws ApiError if validation fails
 */
const validateRequest = (request: GenerateTextRequest): void => {
  if (!request.prompt || typeof request.prompt !== 'string') {
    const error: ApiError = {
      code: 'INVALID_PROMPT',
      message: 'El prompt es requerido y debe ser una cadena de texto',
      status: 400,
    };
    throw error;
  }

  const trimmedPrompt = request.prompt.trim();

  if (trimmedPrompt.length < API_CONFIG.MIN_PROMPT_LENGTH) {
    const error: ApiError = {
      code: 'PROMPT_TOO_SHORT',
      message: `El prompt debe tener al menos ${API_CONFIG.MIN_PROMPT_LENGTH} caracteres`,
      status: 400,
    };
    throw error;
  }

  if (trimmedPrompt.length > API_CONFIG.MAX_PROMPT_LENGTH) {
    const error: ApiError = {
      code: 'PROMPT_TOO_LONG',
      message: `El prompt no puede exceder ${API_CONFIG.MAX_PROMPT_LENGTH} caracteres`,
      status: 400,
    };
    throw error;
  }
};

/**
 * Generates text based on the provided prompt (Simulated API)
 * This function simulates an AI text generation API for development purposes.
 * In production, replace with actual API call to OpenAI or similar service.
 * 
 * @param request - The generation request containing the prompt
 * @param signal - Optional AbortSignal for request cancellation
 * @returns Promise resolving to the generated text response
 * @throws ApiError if the request fails or is invalid
 * 
 * @example
 * ```typescript
 * const response = await generateText({ prompt: "Dame nombres de chicos" });
 * console.log(response.result);
 * ```
 */
export const generateText = async (
  request: GenerateTextRequest,
  signal?: AbortSignal
): Promise<GenerateTextResponse> => {
  // Validate the request
  validateRequest(request);

  // Check if request was aborted
  if (signal?.aborted) {
    const error: ApiError = {
      code: 'REQUEST_ABORTED',
      message: 'La solicitud fue cancelada',
      status: 499,
    };
    throw error;
  }

  // Simulate network delay
  await simulateNetworkDelay();

  // Check again after delay
  if (signal?.aborted) {
    const error: ApiError = {
      code: 'REQUEST_ABORTED',
      message: 'La solicitud fue cancelada',
      status: 499,
    };
    throw error;
  }

  // Detect the category and get appropriate response
  const category = detectPromptCategory(request.prompt);
  
  let result: string;
  
  if (category && SPECIFIC_RESPONSES[category]) {
    const responses = SPECIFIC_RESPONSES[category];
    result = responses[Math.floor(Math.random() * responses.length)];
  } else {
    result = generateGenericResponse(request.prompt);
  }

  return {
    result,
    metadata: {
      model: 'simulated-ai-v1',
      tokensUsed: Math.floor(result.length / 4),
      processingTime: Date.now(),
    },
  };
};

/**
 * Production API implementation (commented out)
 * Uncomment and configure when connecting to a real AI service
 * 
 * @example
 * ```typescript
 * // In production, use this implementation:
 * export const generateText = async (
 *   request: GenerateTextRequest,
 *   signal?: AbortSignal
 * ): Promise<GenerateTextResponse> => {
 *   validateRequest(request);
 *   
 *   const response = await fetch('/api/generate', {
 *     method: 'POST',
 *     headers: {
 *       'Content-Type': 'application/json',
 *     },
 *     body: JSON.stringify(request),
 *     signal,
 *   });
 *   
 *   if (!response.ok) {
 *     const errorData = await response.json().catch(() => ({}));
 *     throw {
 *       code: 'API_ERROR',
 *       message: errorData.message || 'Error en la generación de texto',
 *       status: response.status,
 *     } as ApiError;
 *   }
 *   
 *   return response.json();
 * };
 * ```
 */

/**
 * Validates a prompt without making an API call
 * Useful for real-time form validation
 * 
 * @param prompt - The prompt to validate
 * @returns Validation result with isValid flag and optional error message
 */
export const validatePrompt = (prompt: string): { isValid: boolean; error?: string } => {
  if (!prompt || typeof prompt !== 'string') {
    return {
      isValid: false,
      error: 'El prompt es requerido',
    };
  }

  const trimmedPrompt = prompt.trim();

  if (trimmedPrompt.length < API_CONFIG.MIN_PROMPT_LENGTH) {
    return {
      isValid: false,
      error: `El prompt debe tener al menos ${API_CONFIG.MIN_PROMPT_LENGTH} caracteres`,
    };
  }

  if (trimmedPrompt.length > API_CONFIG.MAX_PROMPT_LENGTH) {
    return {
      isValid: false,
      error: `El prompt no puede exceder ${API_CONFIG.MAX_PROMPT_LENGTH} caracteres`,
    };
  }

  return { isValid: true };
};

export default generateText;
