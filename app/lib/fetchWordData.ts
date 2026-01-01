export async function fetchWordData(query: string) {
  if (!query.trim())
    return { error: "Empty query", data: null, direction: null };

  const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(query);
  const direction = isArabic ? "arToEn" : "enToAr";


  try {
    const res = await fetch("https://arabic-english-dictionary.vercel.app/api/dictionary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userMessage: query, direction }),
    });

    const result = await res.json();

    if (!result.reply) {
      console.error("API error or empty reply:", result.error || result);
      return {
        error: result.error || "Empty reply from server",
        data: null,
        direction,
      };
    }

    // Fix: safely parse reply
    let data;
    if (result.reply === "Word Not found.") {
      data = "Word Not found.";
    } else if (typeof result.reply === "string") {
      try {
        data = JSON.parse(result.reply);
      } catch {
        data = result.reply;
      }
    } else {
      data = result.reply;
    }

    return { data, direction, error: null };
  } catch (e) {
    console.error("Fetch error:", e);
    return { error: "Something went wrong.", data: null, direction: null };
  }
}
