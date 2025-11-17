// API Client for Cloudflare Workers Chat Backend

const API_BASE_URL = 'https://workers-getting-started.joshuamagnase0.workers.dev';

// Type definitions
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: number;
}

export interface Conversation {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface ChatRequest {
  message: string;
  conversationId?: string;
  systemPrompt?: string;
}

export interface StreamChunk {
  type: 'conversationId' | 'content' | 'done' | 'error';
  conversationId?: string;
  content?: string;
  error?: string;
}

// Create a new conversation
export async function createConversation(): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/new`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to create conversation: ${response.statusText}`);
    }

    const data = await response.json();
    return data.conversationId;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
}

// Get conversation history
export async function getConversation(conversationId: string): Promise<Conversation> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat/${conversationId}`);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Conversation not found');
      }
      throw new Error(`Failed to get conversation: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error getting conversation:', error);
    throw error;
  }
}

// Send a message and receive streaming response
export async function sendMessage(
  request: ChatRequest,
  onChunk: (chunk: StreamChunk) => void,
  onError: (error: Error) => void,
  abortSignal?: AbortSignal
): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
      signal: abortSignal,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    if (!response.body) {
      throw new Error('No response body');
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // Decode the chunk and add to buffer
      buffer += decoder.decode(value, { stream: true });

      // Process complete lines (SSE format: "data: {...}\n\n")
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        const trimmedLine = line.trim();

        // Skip empty lines or non-data lines
        if (!trimmedLine || !trimmedLine.startsWith('data:')) {
          continue;
        }

        // Extract JSON after "data: " prefix
        const jsonStr = trimmedLine.slice(5).trim();

        if (jsonStr) {
          try {
            const chunk: StreamChunk = JSON.parse(jsonStr);
            onChunk(chunk);

            // If error chunk, throw error
            if (chunk.type === 'error') {
              throw new Error(chunk.error || 'Unknown error from API');
            }
          } catch (parseError) {
            console.error('Error parsing chunk:', parseError, 'Raw:', jsonStr);
          }
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
        return; // Don't treat abort as error
      }
      onError(error);
    } else {
      onError(new Error('Unknown error occurred'));
    }
  }
}

// Conversation storage helpers (localStorage)
const STORAGE_KEY = 'chronochat-conversations';

export interface ConversationMap {
  [characterId: string]: string; // characterId -> conversationId
}

export function getStoredConversations(): ConversationMap {
  if (typeof window === 'undefined') return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error('Error reading stored conversations:', error);
    return {};
  }
}

export function saveConversationId(characterId: string, conversationId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const conversations = getStoredConversations();
    conversations[characterId] = conversationId;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Error saving conversation ID:', error);
  }
}

export function getConversationId(characterId: string): string | null {
  const conversations = getStoredConversations();
  return conversations[characterId] || null;
}

export function clearConversation(characterId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const conversations = getStoredConversations();
    delete conversations[characterId];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations));
  } catch (error) {
    console.error('Error clearing conversation:', error);
  }
}

export function clearAllConversations(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing all conversations:', error);
  }
}
