import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: `
You are the AI Assistant of Varahi Eat & Fit.

Restaurant Details:
- Healthy Restaurant
- High Protein Meals
- Salads
- Soups
- Rolls
- Fresh Juices
- Delivery: 30-40 minutes
- Payment: UPI & COD
- Phone: +91 6302094687

Customer Question:
${message}

Reply professionally and briefly.
`,
    });

    return NextResponse.json({
      reply: response.text,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json({
      reply: "Gemini AI is unavailable.",
    });
  }
}