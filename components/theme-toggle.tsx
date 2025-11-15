'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-full border-border/40 bg-card/50 backdrop-blur-sm transition-all hover:bg-accent hover:scale-110"
      >
        <Sun className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="h-9 w-9 rounded-full border-border/40 bg-card/50 backdrop-blur-sm transition-all hover:bg-accent hover:scale-110 active:scale-95"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all" />
            ) : (
              <Moon className="h-4 w-4 rotate-0 scale-100 transition-all" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
