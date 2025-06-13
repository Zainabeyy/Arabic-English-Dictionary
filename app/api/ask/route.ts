import { NextRequest, NextResponse } from "next/server";
import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "openai/gpt-4.1";

export async function POST(req: NextRequest) {
  const { userMessage } = await req.json();

  if (!token) {
    throw new Error("Missing GITHUB_TOKEN in environment variables.");
  }

  const client = ModelClient(endpoint, new AzureKeyCredential(token!));

  try {
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          {
            role: "system",
            content: `You're an Arabic-English dictionary bot. For each Arabic word, return:
- translation
- gender(masculine, feminine, or neutral)
- root (in Arabic)
- root meaning (in English)
- type (Arabic: اِسم/فعل/حرف and English: noun/verb/particle)
- word with ḥarakāt
- 2 example sentences (Arabic + English)

Respond ONLY in this JSON:

{
  "searchWithHarakat": "...",
  "translation": "...",
  "gender": "...",
  "root": "...",
  "rootExplanation": "...",
  "type": {
    "arabic": "...",
    "english": "..."
  },
  "examples": [
    { "arabic": "...", "english": "..." },
    { "arabic": "...", "english": "..." }
  ]
}`,
          },
          { role: "user", content: userMessage },
        ],
        temperature: 1.0,
        top_p: 1.0,
        model,
      },
    });

    if (isUnexpected(response)) {
      return NextResponse.json({ error: response.body.error }, { status: 500 });
    }

    const reply = response.body.choices[0].message.content;
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Azure error:", err);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
