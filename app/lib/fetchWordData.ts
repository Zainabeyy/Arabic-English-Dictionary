export async function fetchWordData(query: string) {
  if (!query.trim())
    return { error: "Please enter a word", data: null, direction: null };

  const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(query);
  const direction = isArabic ? "arToEn" : "enToAr";

  const getBaseUrl = () => {
    if (typeof window !== "undefined") return ""; // Browser should use relative path
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // Production (Vercel)
    return "http://localhost:3000"; // Local Development
  };

  try {
    const res = await fetch(`${getBaseUrl()}/api/translate`, {
      // Use relative path for Next.js
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: query, direction }),
    });

    // 1. Check if the HTTP request actually succeeded
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Server Error:", errorText);
      return {
        error: "Server is having trouble. Try again later.",
        data: null,
        direction,
      };
    }

    const result = await res.json();

    if (!result.reply) {
      return { error: "No data received from AI.", data: null, direction };
    }

    // 2. Handle the "Word Not found" case specifically
    if (result.reply.includes("Word Not found.")) {
      return { data: "Word Not found.", direction, error: null };
    }

    // 3. Safely parse the reply if it's a string, or use it if it's already an object
    let parsedData;
    try {
      parsedData =
        typeof result.reply === "string"
          ? JSON.parse(result.reply)
          : result.reply;
    } catch (parseError) {
      console.error("JSON Parsing Error:", result.reply);
      return {
        error: "AI returned invalid data format.",
        data: null,
        direction,
      };
    }

    return { data: parsedData, direction, error: null };
  } catch (e) {
    console.error("Fetch error:", e);
    return {
      error: "Check your internet connection.",
      data: null,
      direction: null,
    };
  }
}
