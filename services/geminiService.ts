import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

// System instruction to give the AI its persona
const SYSTEM_INSTRUCTION = `
You are "Gunny", the expert AI Tactical Advisor for TacWorld Holsters. 
Your goal is to assist customers in selecting the perfect holster or tactical gear from our catalog.
Our main products are:
1. The Compact IWB (Concealed carry, minimalist)
2. Vertical Shoulder System (Duty, range, driving)
3. Classic OWB Pancake (Comfort, concealment)
4. Tuckable Hybrid (Hot weather, deep concealment)

Your tone should be professional, concise, and knowledgeable (tactical expert). 
Do not be overly flowery. Use tactical terminology correctly (printing, retention, cant, ride height).
If a user asks about a gun model we might not support, suggest they contact custom support, but generally assume we support major brands (Glock, Sig, S&W).
Always prioritize safety in your advice.
If asked about prices, give approximate ranges based on the catalog ($80-$170).
Keep responses under 100 words unless detailed explanation is requested.
`;

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      temperature: 0.7,
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    const response = await chat.sendMessage({ message });
    return response.text || "Negative. I couldn't process that intel. Please repeat.";
  } catch (error) {
    console.error("Gemini communication breakdown:", error);
    return "Comms interference. Please try again later.";
  }
};

export const generateHolsterImage = async (manufacturer: string, model: string): Promise<string | null> => {
  try {
    const prompt = `A professional studio product photography shot of a premium leather gun holster custom molded for a ${manufacturer} ${model}. 
    The holster is rich brown italian leather, detailed stitching, tactical lighting, isolated on a dark sleek background. 
    High resolution, 4k, cinematic.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: prompt }] }
    });

    // Extract image from response
    // Iterate through parts to find inlineData
    const candidates = response.candidates;
    if (candidates && candidates[0] && candidates[0].content && candidates[0].content.parts) {
      for (const part of candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
};