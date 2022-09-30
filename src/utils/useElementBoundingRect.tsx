import React, {MutableRefObject, useEffect, useRef, useState} from "react"

const useElementBoundingRect = (): [MutableRefObject<any>, DOMRect | undefined] => {
  const ref = useRef<any>()
  const [rect, setRect] = useState<DOMRect | undefined>()

  useEffect(() => {
    if (ref.current) {
      const listener = () => {
        const a = ref.current!.getBoundingClientRect()
        setRect(ref.current!.getBoundingClientRect())
      };

      listener()
      window.addEventListener("resize",  listener)

      return () => {
        window.removeEventListener("resize",  listener)
      }
    }
  }, [ref.current])

  return [ref, rect]
}

export default useElementBoundingRect