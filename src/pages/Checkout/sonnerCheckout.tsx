"use client"

import { toast } from "sonner"
import { Button } from "../../components/ui/button"

export function SonnerTypes() {
  return (
    <div className="w-full">
      <Button
        type="submit"
        className="
          w-full sm:w-[220px]
          h-[54px]
          rounded-2xl
          bg-[#DB4444]
          hover:bg-[#c93c3c]
          text-white
          text-[15px] sm:text-[16px]
          font-semibold
          shadow-md
          transition-all duration-200
          active:scale-[0.98]
        "
        onClick={() => toast.success("Order placed successfully")}
      >
        Place Order
      </Button>
    </div>
  )
}