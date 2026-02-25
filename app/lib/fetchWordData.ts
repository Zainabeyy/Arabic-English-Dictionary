export async function fetchWordData(query: string) {
  // ---- get the word and direction ----

  if (!query.trim())
    return { error: "Please enter a word", data: null, direction: null };

  const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(query);
  const direction = isArabic ? "arToEn" : "enToAr";

  // ---- get url for next api----
  const getBaseUrl = () => {
    if (typeof window !== "undefined") return "";
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return "http://localhost:3000";
  };

  // ---- fetch function ----

  try {
    const res = await fetch(`${getBaseUrl()}/api/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userMessage: query, direction }),
    });

    // ---- res error ----

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

    if (result.reply.includes("Word Not found.")) {
      return { data: "Word Not found.", direction, error: null };
    }

    // ---- parse data ----

    let parsedData;
    try {
      parsedData =
        typeof result.reply === "string"
          ? JSON.parse(result.reply)
          : result.reply;
    } catch {
      console.error("JSON Parsing Error:", result.reply);
      return {
        error: "AI returned invalid data format.",
        data: null,
        direction,
      };
    }

    return { data: parsedData, direction, error: null };

    // ---- error handling ----
  } catch (e) {
    console.error("Fetch error:", e);
    return {
      error: "Check your internet connection.",
      data: null,
      direction: null,
    };
  }
}
