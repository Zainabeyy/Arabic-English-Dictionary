import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPTS } from "@/app/lib/prompt";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    const { userMessage, direction } = await req.json();

    if (!userMessage || !direction) {
      return NextResponse.json(
        { error: "Missing query or direction" },
        { status: 400 },
      );
    }

    if (!apiKey) {
      console.error("Missing GEMINI_API_KEY in .env.local");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction:
        SYSTEM_PROMPTS[direction as keyof typeof SYSTEM_PROMPTS],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "application/json",
    };

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: userMessage }] }],
      generationConfig,
    });

    const reply = result.response.text();

    if (!reply) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 },
      );
    }

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini API Error:", err);
    return NextResponse.json({ error: getErrorMessage(err) }, { status: 500 });
  }
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : "Internal Server Error";
}
