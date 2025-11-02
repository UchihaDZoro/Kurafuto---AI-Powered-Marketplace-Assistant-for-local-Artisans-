

import { GoogleGenAI, Type, Modality } from "@google/genai";
import { PriceSuggestion, Auction } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

type ProductDetails = { name: string; description: string; story: string; hashtags: string[] };

export const generateProductDetailsFromImage = async (base64ImageData: string, mimeType: string, craftType: string): Promise<ProductDetails | null> => {
    try {
        const prompt = `You are an expert in describing artisanal crafts. Based on the provided image of a handmade product and knowing it's a type of '${craftType}', generate a suitable product name, a short, evocative product description (2-3 sentences), a compelling one-sentence story, and an array of 3-5 relevant hashtags. The tone should be authentic and appealing to modern buyers. Provide the output in a JSON object with keys: "name", "description", "story", and "hashtags".`;
        
        const imagePart = {
            inlineData: { data: base64ImageData, mimeType },
        };
        const textPart = { text: prompt };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        description: { type: Type.STRING },
                        story: { type: Type.STRING },
                        hashtags: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error generating product details from image:", error);
        return null;
    }
};


export const suggestPrice = async (description: string): Promise<PriceSuggestion | null> => {
    try {
        const prompt = `You are an e-commerce pricing expert for handmade goods. For a product with the following description: "${description}", suggest a fair market price in USD. Provide your answer as a JSON object with "price" (a number) and "justification" (a brief explanation for your suggestion).`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        price: { type: Type.NUMBER },
                        justification: { type: Type.STRING }
                    }
                }
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Error suggesting price:", error);
        return null;
    }
};

export const generateArtisanBio = async (craftType: string, location: string): Promise<string | null> => {
    try {
        const prompt = `You are a master storyteller specializing in cultural heritage. Write a short, personal bio (around 100 words) for an artisan from ${location} who practices ${craftType}. The story should touch upon their heritage, creative process, and the cultural significance of their craft. It should be written in the first person ("I...").`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error generating artisan story:", error);
        return null;
    }
};

export const findAuctions = async (craftType: string) => {
    try {
        const prompt = `You are an assistant for artisans. Find upcoming auctions relevant to handmade '${craftType}' items. Include both online and physical auctions worldwide. For each, provide the auction name, a brief description, the date, and a direct URL. Format the response as a JSON array of objects, each with keys "name", "date", "description", and "url".`;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                tools: [{googleSearch: {}}],
            },
        });

        // A regular expression to extract a JSON array from the response text
        const jsonRegex = /\[\s*\{[\s\S]*?\}\s*\]/;
        const jsonMatch = response.text.match(jsonRegex);
        
        if (jsonMatch) {
            const auctions: Auction[] = JSON.parse(jsonMatch[0]);
            const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
            return { auctions, groundingChunks };
        } else {
             // Fallback if regex fails - maybe the response is not a perfect array.
             console.warn("Could not parse auction JSON from response:", response.text);
             return { auctions: [], groundingChunks: [] };
        }

    } catch (error) {
        console.error("Error finding auctions:", error);
        return { auctions: [], groundingChunks: [] };
    }
};

export const enhanceImage = async (base64ImageData: string, mimeType: string): Promise<string | null> => {
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: { data: base64ImageData, mimeType },
                    },
                    {
                        text: 'Professionally enhance this product photo for an e-commerce website. Make the background a clean, consistent white and ensure the product colors are vibrant and true-to-life.',
                    },
                ],
            },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                return part.inlineData.data; // Return the base64 string of the enhanced image
            }
        }
        return null;
    } catch (error) {
        console.error("Error enhancing image:", error);
        return null;
    }
};


export const summarizeProductPerformance = async (stats: { name: string, views: number, sales: number, conversionRate: number }): Promise<string | null> => {
    try {
        const prompt = `You are a data analyst for an e-commerce platform for handmade goods. Based on the following stats for the product '${stats.name}', provide a brief, 2-sentence summary of its performance and one actionable suggestion for the artisan.
        
        Stats:
        - Views: ${stats.views}
        - Sales: ${stats.sales}
        - Conversion Rate: ${stats.conversionRate}%
        
        Keep the tone encouraging and constructive. Start the summary directly, without preamble.`;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error summarizing product performance:", error);
        return null;
    }
};
