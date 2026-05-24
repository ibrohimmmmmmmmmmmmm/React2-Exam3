import React, { memo } from "react"
import {
  User,
  CreditCardIcon,
  LogOutIcon,
  UserIcon,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getToken, RemoveToken } from "@/utils/token"
import { useNavigate } from "react-router-dom"

export default memo(function UserDropdown() {
  const navigate = useNavigate()

  function logout() {
    RemoveToken()

    navigate("/signup2")

    window.location.reload()
  }

  return (
    <>
      {getToken() && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="
                relative p-2.5 rounded-full

                text-black
                dark:text-white

                bg-transparent
                hover:bg-neutral-100
                dark:hover:bg-white/10

                border border-transparent
                dark:border-white/5

                transition-all duration-300

                hover:scale-105
                active:scale-95
              "
              aria-label="User"
            >
              <User
                size={20}
                strokeWidth={1.9}
              />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="
              w-[220px]

              rounded-2xl
              border border-neutral-200
              dark:border-white/10

              bg-white/95
              dark:bg-[#111116]/95

              backdrop-blur-xl

              shadow-xl
              dark:shadow-[0_10px_40px_rgba(0,0,0,0.55)]

              p-2
            "
          >
            <div
              className="
                px-3 py-2 mb-1
                rounded-xl

                bg-neutral-50
                dark:bg-white/5

                border border-neutral-100
                dark:border-white/5
              "
            >
              <p
                className="
                  text-[13px]
                  text-neutral-500
                  dark:text-neutral-400
                "
              >
                Welcome back
              </p>

              <h4
                className="
                  text-sm font-semibold
                  text-black
                  dark:text-white
                "
              >
                FastCart User
              </h4>
            </div>

            <DropdownMenuItem
              onSelect={() => navigate("/account")}
              className="
                h-11 rounded-xl

                text-black
                dark:text-white

                cursor-pointer

                hover:!bg-neutral-100
                dark:hover:!bg-white/10

                focus:!bg-neutral-100
                dark:focus:!bg-white/10

                transition-all
              "
            >
              <UserIcon className="mr-3 h-4 w-4" />
              Account
            </DropdownMenuItem>

            <DropdownMenuItem
              className="
                h-11 rounded-xl

                text-black
                dark:text-white

                cursor-pointer

                hover:!bg-neutral-100
                dark:hover:!bg-white/10

                focus:!bg-neutral-100
                dark:focus:!bg-white/10

                transition-all
              "
            >
              <CreditCardIcon className="mr-3 h-4 w-4" />
              My order
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-neutral-200 dark:bg-white/10 my-2" />

            <DropdownMenuItem
              onClick={logout}
              className="
                h-11 rounded-xl

                text-red-500
                dark:text-red-400

                cursor-pointer

                hover:!bg-red-50
                dark:hover:!bg-red-500/10

                focus:!bg-red-50
                dark:focus:!bg-red-500/10

                transition-all
              "
            >
              <LogOutIcon className="mr-3 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
})