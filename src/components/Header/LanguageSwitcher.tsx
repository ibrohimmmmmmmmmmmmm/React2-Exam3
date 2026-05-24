import { Languages } from "lucide-react"
import { useTranslation } from "react-i18next"

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  return (
    <div
      className="
        flex items-center gap-2

        rounded-xl
        border border-gray-200
        dark:border-white/10

        bg-gray-50/60
        dark:bg-[#121218]/60

        backdrop-blur-xl

        px-3 py-2

        shadow-sm
        dark:shadow-[0_0_20px_rgba(255,255,255,0.04)]

        transition-all duration-300

        hover:scale-[1.02]
      "
    >
      <Languages
        size={15}
        className="
          text-[#46A358]
          drop-shadow-sm
        "
      />

      <select
        value={i18n.language}
        onChange={(e) =>
          i18n.changeLanguage(e.target.value)
        }
        className="
          bg-transparent

          text-xs font-semibold

          text-black
          dark:text-white

          outline-none

          cursor-pointer

          transition-all
        "
      >
        <option value="en">🇺🇸 EN</option>
        <option value="ru">🇷🇺 RU</option>
      </select>
    </div>
  )
}