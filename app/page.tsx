import Search from "@/components/ArabicSearchTool";
import SelectFont from "@/components/SelectFont";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-3xl flex-1">
      <nav className=" flex-1 flex justify-between">
        <BookOpen size={32} className="sm:size-11" color="#838383" />
        <div className="flex items-center gap-7">
          <SelectFont />
          <span className="text-xl">|</span>
          <ThemeSwitcher />
        </div>
      </nav>
      <Search />
    </div>
  );
}
