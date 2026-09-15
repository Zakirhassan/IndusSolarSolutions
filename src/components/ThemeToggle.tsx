import { useEffect, useState } from "react";
import { Palette } from "lucide-react";

const STORAGE_KEY = "isolar-color-theme";

function applyTheme(theme: "gold" | "blue") {
  if (theme === "blue") {
    document.documentElement.setAttribute("data-color-theme", "blue");
  } else {
    document.documentElement.removeAttribute("data-color-theme");
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"gold" | "blue">("gold");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "blue" || stored === "gold") {
      setTheme(stored);
      applyTheme(stored);
    }
  }, []);

  const toggle = () => {
    const next = theme === "gold" ? "blue" : "gold";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const nextLabel = theme === "gold" ? "Switch to blue theme" : "Switch to gold theme";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={nextLabel}
      title={nextLabel}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-charcoal/20 text-ink transition hover:bg-charcoal hover:text-white"
    >
      <Palette size={16} />
    </button>
  );
}
