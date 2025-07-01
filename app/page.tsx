import Search from "@/components/ArabicSearchTool";
import SelectFont from "@/components/SelectFont";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="max-w-3xl flex-1">
      <nav className="flex-1 flex justify-between">
        <BookOpen size={32} className="sm:size-11" color="#838383" />
        <div className="flex items-end sm:items-center gap-5 sm:gap-7 flex-col sm:flex-row">
          <SelectFont />
          <span className="text-lg sm:text-xl hidden sm:inline">|</span>
          <ThemeSwitcher />
        </div>
      </nav>
      <Search />
    </div>
  );
}
