import OpenAI from 'openai';

// Helper to check if an API key is available (either in Env or LocalStorage)
export const getActiveApiKey = () => {
  const envKey = import.meta.env.VITE_OPENAI_API_KEY;
  const localKey = localStorage.getItem("user_openai_key");
  
  const activeKey = (envKey?.trim() || localKey?.trim());
  return activeKey || null;
};

// Export a dynamic client wrapper so other files can import `openai` normally
// without triggering crashes at load-time when the key is missing.
const openai = {
  chat: {
    completions: {
      create: async (config) => {
        const key = getActiveApiKey();
        if (!key) {
          throw new Error("OpenAI API key is missing. Please configure a key.");
        }
        
        const client = new OpenAI({
          apiKey: key,
          dangerouslyAllowBrowser: true,
        });
        
        return client.chat.completions.create(config);
      }
    }
  }
};

export default openai;