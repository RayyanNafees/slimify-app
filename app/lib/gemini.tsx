import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyDcuswpF8sAUBVTvrUlnpADXF4gHjTTAxA",
});

const _prompt = `Parse the image and extract the value of weight from the image. change the value to be in kilogram if necessary.if the image does not read weight return value of weight as -1`;

export const weightPrompt = async (
  image: string,
  mimeType = "image/jpeg",
  prompt = _prompt
) =>
  await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [
      {
        inlineData: {
          data: image,
          mimeType,
        },
      },
      prompt,
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          weight: {
            type: Type.NUMBER,
          },
        },
      },
    },
  });
