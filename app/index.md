import SelectFont from "@/components/SelectFont";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { BookOpen } from "lucide-react";


export default function Home() {
  // const [reply, setReply] = useState("");

  // const askQuestion = async () => {
  //   const response = await fetch("/api/ask", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ userMessage: 'كاتب' }),
  //   });

  //   const data = await response.json();
  //   setReply(data.reply);
  // };
  // console.log(reply);

  return (
    <div className="max-w-3xl flex-1 flex justify-between">
      <BookOpen size={32} className="sm:size-11" color="#838383"/>
      <div className="flex items-center gap-7">
        <SelectFont/>
        <span className="text-xl">|</span>
      <ThemeSwitcher/>
      </div>
      {/* <button
        onClick={askQuestion}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Ask GPT
      </button>
      {reply && (
        <p className="mt-4 text-white">
          <strong>Reply:</strong> {reply}
        </p>
      )} */}
    </div>
  );
}
