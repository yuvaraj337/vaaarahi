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

Answer questions about Varahi Eat & Fit using ONLY the menu data provided below.

You can answer about:
- item names
- prices
- calories
- protein
- ingredients
- descriptions
- recommendations
- comparisons between menu items

Never invent a price, calorie value, protein value, ingredient, or menu item.

If the requested information is not present in the menu data, say:
"I don't have that information for this item yet."

MENU DATA:
${JSON.stringify(menuservice)}

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