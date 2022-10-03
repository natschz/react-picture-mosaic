import React, {useEffect, useState} from "react"

const usePageVisibility = (): boolean => {
  const [isPageVisible, setIsPageVisible] = useState(document.visibilityState !== "hidden")

  useEffect(() => {// startSimulation and pauseSimulation defined elsewhere
    const handleVisibilityChange = () => {
      setIsPageVisible(document.visibilityState !== "hidden")
    }

    document.addEventListener("visibilitychange", handleVisibilityChange, false)

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [setIsPageVisible])

  return isPageVisible
}

export default usePageVisibility