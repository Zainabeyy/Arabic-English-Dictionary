import axios from "axios";

export async function fetchWordData(query: string) {
  if (!query.trim()) return { error: "Empty query", data: null, direction: null };

  const isArabic = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(query);
  const direction = isArabic ? "arToEn" : "enToAr";

  try {
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/dictionary`, 
      { userMessage: query, direction },
      {headers: { "Content-Type": "application/json" }}
    );

    const result = res.data;
    const data = result.reply === "Word Not found." ? "Word Not found." : JSON.parse(result.reply);

    return { data, direction, error: null };
  } catch (e) {
    console.log("Fetch error:", e);
    return { error: "Something went wrong.", data: null, direction: null };
  }
}
