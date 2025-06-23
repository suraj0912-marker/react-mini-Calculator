import { useState, useCallback } from "react"
import Display from "./componensts/Display"
import ButtonPannel from "./componensts/ButtonPannel"
import styles from "./App.module.css"
import { motion } from "framer-motion"
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  const [currentInput, setCurrentInput] = useState("")
  const [calculationHistory, setCalculationHistory] = useState([])

  const safeEvaluateExpression = (expression) => {
    if (!expression || /[^0-9+\-*/.() ]/.test(expression)) {
      return "Error"
    }

    try {
      const result = new Function(`return ${expression}`)()
      if (!Number.isFinite(result)) {
        return "Error"
      }
      return result.toString()
    } catch {
      return "Error"
    }
  }

  const handleCalculatorButtonClick = useCallback((buttonValue) => {
    switch (buttonValue) {
      case "CLEAR":
        setCurrentInput("")
        break
      case "BACKSPACE":
        setCurrentInput((prev) => prev.slice(0, -1))
        break
      case "=":
        if (!currentInput.trim()) break
        const result = safeEvaluateExpression(currentInput)
        if (result === "Error") {
          setCurrentInput("Error")
        } else {
          const record = `${currentInput} = ${result}`
          setCalculationHistory((prev) => [record, ...prev])
          setCurrentInput(result)
        }
        break
      default:
        setCurrentInput((prev) => prev + buttonValue)
        break
    }
  }, [currentInput])

  const handleClearHistory = useCallback(() => {
    setCalculationHistory([])
  }, [])

  return (
    <div className="bg-light vh-100 d-flex justify-content-center align-items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className={`${styles.calculator} shadow p-4 bg-white rounded-4`}
      >
        <h2 className="text-center text-primary fw-bold mb-3">Suraj's Calculator</h2>

        <Display value={currentInput} />

        <ButtonPannel onButtonClick={handleCalculatorButtonClick} />

        {calculationHistory.length > 0 && (
          <div className="mt-4">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="text-muted m-0">Calculation History</h5>
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={handleClearHistory}
              >
                Clear History
              </button>
            </div>
            <ul className="list-group list-group-flush" style={{ maxHeight: "150px", overflowY: "auto" }}>
              {calculationHistory.map((item, index) => (
                <li key={`history-${index}`} className="list-group-item small text-muted py-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="text-center mt-3 text-muted" style={{ fontSize: "0.9rem" }}>
          For the Confidence, by Suraj.
        </div>
      </motion.div>
    </div>
  )
}

export default App
