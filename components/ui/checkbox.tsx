"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    color?: string
  }
>(({ className, color, checked, ...props }, ref) => {
  const [isChecked, setIsChecked] = React.useState(checked ?? false)

  React.useEffect(() => {
    setIsChecked(checked ?? false)
  }, [checked])

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      checked={isChecked}
      onCheckedChange={(checked) => {
        setIsChecked(checked === true)
        props.onCheckedChange?.(checked)
      }}
      className={cn(
        "peer h-5 w-5 shrink-0 rounded-sm border ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
        className
      )}
      style={{
        borderColor: isChecked && color ? color : color ? `${color}40` : undefined,
        backgroundColor: isChecked && color ? color : "transparent",
        ...props.style,
      }}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn("flex items-center justify-center text-current")}
        style={{
          color: isChecked ? "white" : undefined,
        }}
      >
        <CheckIcon className="h-4 w-4" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }

