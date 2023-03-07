import { useEffect, useState } from "react"

function useDebounce<T>(func: T, delay?: number) {
  //   const [debouncedValue, setDebouncedValue] = useState<T>(func)

  useEffect(() => {
    const timer = setTimeout(() => func, delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [func, delay])
}

export default useDebounce
