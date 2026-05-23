"use client"

import { toast } from "sonner"

import { Button } from "../../components/ui/button"

export function SonnerTypes() {
  return (
    <>
      <Button
       className="py-4 px-12 bg-[#DB4444] text-white w-[190px] h-[56px] text-[16px]"
        variant="outline"
        onClick={() => toast.success("Event has been created")}
      >
        Place order
      </Button>
    </>
  )
}
