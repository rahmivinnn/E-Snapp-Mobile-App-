import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useIsPortrait() {
  const [isPortrait, setIsPortrait] = React.useState<boolean>(true)

  React.useEffect(() => {
    const mql = window.matchMedia("(orientation: portrait)")
    const onChange = (e: MediaQueryListEvent) => {
      setIsPortrait(e.matches)
    }
    
    // Force portrait mode
    if (!mql.matches) {
      try {
        // For iOS
        if (screen.orientation) {
          screen.orientation.lock("portrait").catch(() => {
            console.log("Orientation lock not supported")
          })
        }
      } catch (error) {
        console.log("Orientation API not supported")
      }
    }
    
    mql.addEventListener("change", onChange)
    setIsPortrait(mql.matches)
    
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return isPortrait
}
