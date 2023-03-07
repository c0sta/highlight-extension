import type { PlasmoCSConfig } from "plasmo"
import { useEffect, useRef, useState } from "react"

export const config: PlasmoCSConfig = {
  matches: ["<all_urls>"]
}

document.addEventListener("selectionchange", (e) => {
  const element = document.getSelection()
  // element.parentElement.id = "highlight-selected"
})

document.addEventListener("mousedown", (e) => {
  const clearId = document.querySelector("#highlight-selected")
  clearId.id = ""
})

const HighlightTooltip = () => {
  const [show, setShow] = useState(false)
  const [selected, setSelected] = useState("")
  const [selectedPosition, setSelectPosition] = useState<
    { element: DOMRect; parent: DOMRect } | undefined
  >()
  // const mounted = useRef<boolean>(false)
  const selectedElement = document.querySelector("#highlight-selected")
  console.log("🚀 ~ HighlightTooltip ~ selectedElement", selectedElement)

  useEffect(() => {
    setTimeout(() => {
      if (selectedElement && window.getSelection().toString().length) {
        console.log("triggered function")
        setSelected(window.getSelection().toString())
        setSelectPosition({
          element: window
            .getSelection()
            ?.getRangeAt(0)
            ?.getBoundingClientRect(),
          parent: (
            document.body.parentNode as HTMLElement
          ).getBoundingClientRect()
        })
        setShow(true)
      }
    }, 300)

    return () => {
      console.log("unmounted extension...")
    }
  }, [JSON.stringify(selectedElement)])

  // document.addEventListener("selectionchange", (e) => {
  //   const selectionEnded = window.getSelection().focusNode
  //   if (mounted.current && selectionEnded)
  //     setTimeout(() => {
  //       if (mounted.current && window.getSelection().toString().length) {
  //         console.log("triggered function")
  //         setSelected(window.getSelection().toString())
  //         setSelectPosition({
  //           element: window
  //             .getSelection()
  //             ?.getRangeAt(0)
  //             ?.getBoundingClientRect(),
  //           parent: (
  //             document.body.parentNode as HTMLElement
  //           ).getBoundingClientRect()
  //         })
  //         setShow(true)
  //       }
  //     }, 300)
  // })

  // document.addEventListener("mousedown", (e) => {
  //   setShow(false)
  // })

  if (!show) return
  return (
    <button
      style={{
        display: "block",
        position: "fixed", // stays fixed on the screen, and not above the selected text
        top:
          selectedPosition?.element?.bottom -
          selectedPosition?.parent?.top +
          "px",
        right:
          -(
            selectedPosition?.element?.right -
            selectedPosition?.parent?.right -
            21
          ) + "px"
      }}>
      Highlight
    </button>
  )
}

export default HighlightTooltip
