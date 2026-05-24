import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme()

  return (
    <div
      className="
        flex items-center gap-1
        rounded-full
        bg-neutral-100 dark:bg-neutral-900
        border border-neutral-200 dark:border-neutral-800
        p-1
        shadow-sm
      "
    >
      <button
        onClick={() => setTheme("light")}
        className={`
          relative flex items-center justify-center
          rounded-full p-2.5
          transition-all duration-300

          ${
            theme === "light"
              ? "bg-amber-400 text-white shadow-md scale-105"
              : "text-neutral-600 hover:bg-white dark:hover:bg-neutral-800 hover:text-black dark:text-neutral-300"
          }
        `}
      >
        <Sun
          size={15}
          strokeWidth={2.2}
          className="dark:text-amber-300"
        />
      </button>

      <button
        onClick={() => setTheme("dark")}
        className={`
          relative flex items-center justify-center
          rounded-full p-2.5
          transition-all duration-300

          ${
            theme === "dark"
              ? "bg-neutral-950 text-white shadow-lg shadow-black/40 scale-105 ring-1 ring-neutral-700"
              : "text-neutral-600 hover:bg-white dark:hover:bg-neutral-800 hover:text-black dark:text-neutral-300"
          }
        `}
      >
        <Moon
          size={17}
          strokeWidth={2.2}
          className="dark:text-neutral-100"
        />
      </button>
    </div>
  )
}