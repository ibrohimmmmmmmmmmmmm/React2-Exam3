import React, { memo } from "react"
import { User, CreditCardIcon, LogOutIcon, SettingsIcon, UserIcon, LogOut } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { getToken } from "@/utils/token"

export default memo(function UserDropdown() {
  return (
    <>
      {getToken() && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative p-2 rounded-full hover:bg-neutral-100 transition"
              aria-label="User"
            >
              <User size={20} strokeWidth={1.8} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <UserIcon className="mr-2 h-4 w-4" />
              Account
            </DropdownMenuItem>

            <DropdownMenuItem>
              <CreditCardIcon className="mr-2 h-4 w-4" />
              My order
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem variant="destructive">
              <LogOutIcon className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  )
})