import React, { useCallback, useMemo } from "react"
import { motion } from "framer-motion"
import clickSound from "./click.mp3.mp3"

function ButtonPannel({ onButtonClick }) {
  const calculatorButtons = useMemo(() => [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C", "⌫"
  ], [])

  const playClickSound = useCallback(() => {
    const audio = new Audio(clickSound)
    audio.play().catch(err => console.warn("Sound error:", err))
  }, [])

  const handleClick = useCallback((buttonValue) => {
    playClickSound()
    if (buttonValue === "C") {
      onButtonClick("CLEAR")
    } else if (buttonValue === "⌫") {
      onButtonClick("BACKSPACE")
    } else {
      onButtonClick(buttonValue)
    }
  }, [onButtonClick, playClickSound])

  const getButtonClass = useCallback((buttonValue) => {
    if (buttonValue === "=") return "btn-primary"
    if (buttonValue === "C") return "btn-danger"
    if (["/", "*", "-", "+"].includes(buttonValue)) return "btn-info"
    return "btn-dark"
  }, [])

  const getButtonAriaLabel = useCallback((buttonValue) => {
    switch (buttonValue) {
      case "/": return "Divide"
      case "*": return "Multiply"
      case "-": return "Subtract"
      case "+": return "Add"
      case "=": return "Equals"
      case "C": return "Clear input"
      case "⌫": return "Backspace"
      case ".": return "Decimal point"
      default: return buttonValue
    }
  }, [])

  return (
    <div className="row g-2">
      {calculatorButtons.map((btn) => (
        <div className="col-3" key={btn}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={`btn ${getButtonClass(btn)} w-100 fs-5 py-3`}
            onClick={() => handleClick(btn)}
            aria-label={getButtonAriaLabel(btn)}
          >
            {btn}
          </motion.button>
        </div>
      ))}
    </div>
  )
}

export default ButtonPannel
