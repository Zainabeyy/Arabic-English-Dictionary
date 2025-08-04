export async function fetchWordData(query: string) {
  if (!query.trim())
    return { error: "Empty query", data: null, direction: null };

  const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(query);
  const direction = isArabic ? "arToEn" : "enToAr";

  const isServer = typeof window === "undefined";

  const url = !isServer
    ? `${process.env.NEXT_PUBLIC_SITE_URL}/api/dictionary`
    : "http://localhost:3000/api/dictionary";
  try {
    console.log("Fetching url:", url);
    const res = await fetch(url, {
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
    const data =
      result.reply === "Word Not found."
        ? "Word Not found."
        : JSON.parse(result.reply);

    return { data, direction, error: null };
  } catch (e) {
    console.log("Fetch error:", e);
    return { error: "Something went wrong.", data: null, direction: null };
  }
}
