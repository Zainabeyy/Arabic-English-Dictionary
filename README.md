# 📘 Arabic ↔ English Dictionary

A simple, fast, and smart dictionary for translating between Arabic and English — with pronunciation, roots, examples, and more.

[🔗 Live Website](https://arabic-english-dictionary.vercel.app/)

---

## 🚀 What It Does

- 🔁 Translate **English ⇄ Arabic**
- 🧠 Uses **OpenAI** to fetch smart data: root words, types, examples, etc.
- Can bookmark data.
- Can sign up, log in, and log out using email & password or Google authentication.
- Can toggle dark and light mode also it checks the default system color without flickering.
- An animated owl follows your cursor around 🦉.
- Can select fonts for Arabic words.
- 🔉 Click a button to **hear Arabic pronunciation**
- 🪄 Clean UI built with **Next.js**, **Tailwind CSS**, and a touch of **Framer Motion**
- 📱 Fully responsive — works on all screen sizes

---

## 🔡 Data You Get (From OpenAI)

Each word comes with:

- Full **ḥarakāt** (diacritics) in Arabic
- **Gender forms** (masculine & feminine)
- **Root** + short explanation
- **Word type** in Arabic & English (noun, verb, etc.)
- **Examples** with translations
- **Related words or roots**

<details>
<summary>Example JSON (English to Arabic)</summary>

```json
{
  "englishWord": "write",
  "arabicTranslation": "كَتَبَ",
  "genderForms": {
    "masculine": "كَاتِب",
    "feminine": "كَاتِبَة"
  },
  "type": {
    "arabic": "فِعْل",
    "english": "verb"
  },
  "root": "ك ت ب",
  "rootExplanation": "Related to writing or books",
  "relatedRoots": ["كِتَاب", "مَكْتُوب"],
  "examples": [
    { "arabic": "هُوَ يَكْتُبُ رِسَالَةً", "english": "He is writing a letter." },
    { "arabic": "هِيَ كَتَبَتْ فِي دَفْتَرِهَا", "english": "She wrote in her notebook." }
  ]
}

```

</details>

<br>


# ⚙️ Built With

- **Next.js** – React framework  
- **Tailwind CSS** – Utility-first styling  
- **Framer Motion** – Smooth animations  
- **OpenAI** – AI-powered word data  
- **Lucide Icons** – Clean, modern icons  
- **Rive** – Animated graphics  
- **Firebase** – Authentication & database  



# 👩‍💻 Made By

Zainab  
[GitHub](https://github.com/Zainabeyy/Arabic-English-Dictionary)

