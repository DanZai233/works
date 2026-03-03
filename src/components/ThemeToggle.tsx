import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

type ColorScheme = "light" | "dark" | "auto";

export default function ThemeToggle() {
  const [scheme, setScheme] = useState<ColorScheme>("auto");
  const [currentScheme, setCurrentScheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("StackColorScheme") as ColorScheme;
    setScheme(stored || "auto");
    updateScheme(stored || "auto");

    const handleStorageChange = () => {
      const newScheme = localStorage.getItem("StackColorScheme") as ColorScheme;
      setScheme(newScheme || "auto");
      updateScheme(newScheme || "auto");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateScheme = (newScheme: ColorScheme) => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const effective = newScheme === "auto" ? (prefersDark ? "dark" : "light") : newScheme;
    setCurrentScheme(effective);
    document.documentElement.dataset.scheme = effective;
  };

  const toggle = () => {
    const schemes: ColorScheme[] = ["light", "dark", "auto"];
    const currentIndex = schemes.indexOf(scheme);
    const nextScheme = schemes[(currentIndex + 1) % schemes.length];
    setScheme(nextScheme);
    localStorage.setItem("StackColorScheme", nextScheme);
    updateScheme(nextScheme);
  };

  const getIcon = () => {
    if (scheme === "auto") return currentScheme === "dark" ? <Moon size={18} /> : <Sun size={18} />;
    return scheme === "dark" ? <Moon size={18} /> : <Sun size={18} />;
  };

  const getLabel = () => {
    if (scheme === "auto") return "自动";
    return scheme === "dark" ? "暗色" : "亮色";
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-md border border-gray-200/50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 text-sm text-gray-600 font-medium dark:bg-gray-800/60 dark:border-gray-700/50 dark:text-gray-300"
      title={`当前模式: ${getLabel()}`}
    >
      {getIcon()}
      <span>{getLabel()}</span>
    </button>
  );
}
