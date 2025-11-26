import { GoogleGenAI, Type } from "@google/genai";
import { LocationTarget } from "../types";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const searchLocationWithGemini = async (query: string): Promise<LocationTarget | null> => {
  if (!apiKey || !ai) {
    console.warn("Gemini API not configured");
    return null;
  }

  try {
    // We use the model to "guess" the coordinates based on its knowledge base.
    // This is faster and provides the JSON structure we need for navigation.
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find the geographical coordinates for: "${query}". 
      Return the result strictly as a JSON object with keys: 
      "name" (string), 
      "latitude" (number), 
      "longitude" (number), 
      "description" (short string).
      Do not include markdown code blocks.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                name: { type: Type.STRING },
                latitude: { type: Type.NUMBER },
                longitude: { type: Type.NUMBER },
                description: { type: Type.STRING }
            },
            required: ["name", "latitude", "longitude"]
        }
      },
    });

    const text = response.text;
    if (!text) return null;

    const data = JSON.parse(text);
    return {
      name: data.name,
      coords: {
        latitude: data.latitude,
        longitude: data.longitude,
      },
      description: data.description,
    };
  } catch (e) {
    console.error("Gemini Search Error:", e);
    return null;
  }
};

export const getDarshanBlessing = async (locationName: string): Promise<string> => {
  if (!apiKey || !ai) return "May peace and guidance be with you on this journey.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Write a short, poetic, spiritual blessing or message (max 30 words) for a devotee reaching ${locationName}. Focus on peace, darshan, and divine connection.`,
    });
    return response.text || "Om Dram Dattaya Namaha.";
  } catch (e) {
    console.error("Gemini Blessing Error:", e);
    return "Om Dram Dattaya Namaha.";
  }
};
