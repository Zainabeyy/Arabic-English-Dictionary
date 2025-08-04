import { NextRequest, NextResponse } from "next/server";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { SYSTEM_PROMPTS } from "@/app/lib/prompt";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4o";

export async function POST(req: NextRequest) {
  const { userMessage, direction } = await req.json();
  if (!userMessage || !direction) {
    console.error("Missing userMessage or direction.");
  }

  if (!token) {
    throw new Error("Missing GITHUB_TOKEN in environment variables.");
  }

  const client = ModelClient(endpoint, new AzureKeyCredential(token!));
  const systemPrompt = SYSTEM_PROMPTS[direction as keyof typeof SYSTEM_PROMPTS];

  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          { role: "user", content: userMessage },
        ],
        temperature: 1.0,
        top_p: 1.0,
        model,
      },
    });

    if (isUnexpected(response)) {
      console.error("Unexpected response:", response.body);
      return NextResponse.json({ error: response.body.error }, { status: 500 });
    }

    const reply = response.body.choices[0]?.message?.content;
     if (!reply) {
      console.error("Missing reply in response:", response.body);
      return NextResponse.json(
        { error: "No reply from model." },
        { status: 500 }
      );
    }
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Azure error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}