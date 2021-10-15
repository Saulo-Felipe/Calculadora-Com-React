import React, { useState, useEffect } from 'react'
import changeTheme from './changeTheme'
import './style.css'

function App() {
  const [value, setValue] = useState("0")
  const [result, setResult] = useState({
    number01: "0",
    number02: null,
    operationType: null
  })
  const [preview, setPreview] = useState({
    numb01: "0",
    numb02: "",
    result: ""
  })

  useEffect(() => {
    changeTheme()
  }, [])

  useEffect(() => {
    previewState()

    if (value === "" || value.length === 0) {
      setValue("0")
    }
  }, [value, result])

  function insertButtons() {
    var numbers = []
    var simbols = []

    for (var c=1; c < 10; c++) {
      numbers.push(<button className="button-number buttons" onClick={(c) => newNumber(c.target.innerHTML)}>{c}</button>)
    }
    
    numbers.reverse()
    numbers.push(<button className="button-number buttons" onClick={() => operation("=")}>=</button>)
    numbers.push(<button className="button-number buttons" onClick={() => newNumber(".")}>.</button>)
    numbers.push(<button className="button-number buttons radius-left" onClick={() => newNumber("0")}>0</button>)

    simbols.push(<button className="button-simbol buttons delete" onClick={() => operation("delete")}>.</button>)
    simbols.push(<button className="button-simbol buttons" onClick={() => operation("C")}>C</button>)
    simbols.push(<button className="button-simbol buttons" onClick={() => operation("÷")}>÷</button>)
    simbols.push(<button className="button-simbol buttons" onClick={() => operation("x")}>x</button>)
    simbols.push(<button className="button-simbol buttons" onClick={() => operation("-")}>-</button>)
    simbols.push(<button className="button-simbol buttons radius-right" onClick={() => operation("+")}>+</button>)
    
    return {numbers, simbols}
  }

  function newNumber(number) {
    if (((number === "." && value.indexOf('.') === -1) || number !== '.') && value.length < 10) {

      // Update value
      if ((isNaN(Number(value)) === false && value !== "0") || number === ".") {
        number = value + number
      }

      setValue(number)

      setPreview({
        numb01: result.operationType === null ? number : preview.numb01,
        numb02: result.operationType !== null ? number : preview.numb02,
        result: preview.result
      })

      // Update results
      if (result.operationType === null) {
        setResult({
          number01: value,
          number02: result.number02,
          operationType: result.operationType
        })
      } else if (isNaN(Number(value)) === false) {
        setResult({
          number01: result.number01,
          number02: value,
          operationType: result.operationType
        })
      }
    }
  }

  function operation(simbol) {
    if (simbol === "delete") {
      var valueRemove = value.slice(0, -1)
      setValue(valueRemove)
      setPreview({
        numb01: result.operationType === null ? valueRemove : preview.numb01,
        numb02: result.operationType !== null ? valueRemove : preview.numb02,
        result: preview.result
      })

    } else if (simbol === "C") {
      setResult({
        number01: "0",
        number02: null,
        operationType: null
      })
      setPreview({
        numb01: "0",
        numb02: "",
        result: ""
      })
      setValue("0")
      
    } else {
      if (result.operationType === null && simbol !== "=") {
        setResult({
          number01: value,
          number02: result.number02,
          operationType: simbol
        })
        setValue(simbol)
      } else if (((simbol === "=" && result.operationType !== null) || (simbol === result.operationType)) && isNaN(Number(value)) === false) {
        calcResult()
      }  
    }
  }

  function calculation() {
    var num01 = Number(result.number01)
    var num02 = Number(value)

    if (result.operationType === "+")
      return num01 + num02
    else if (result.operationType === "-")
      return num01 - num02
    else if (result.operationType === "÷")
      return num01 / num02
    else if (result.operationType === "x")
      return num01 * num02    
  }

  function calcResult() {
    var calcResult = calculation()
    
    setResult({
      number01: String(calcResult),
      number02: null,
      operationType: null
    })

    setPreview({
      numb01: String(calcResult).substring(0, 10),
      numb02: "",
      result: ""
    })

    setValue(String(calcResult).substring(0, 10))
  }

  function previewState() {
    var calcResult = calculation()

    if (typeof calcResult !== "undefined") 
      calcResult = String(calcResult).length > 4 && String(calcResult).indexOf(".") !== -1 ? calcResult.toFixed(4) : calcResult

    setPreview({
      numb01: preview.numb01,
      numb02: preview.numb02,
      result: typeof calcResult === 'undefined' || isNaN(calcResult) ? "" : " = " + String(calcResult)
    })

  }

  return (
    <div id="calculator">
      <div id="toggle-theme">
        <div className="toggle-point" id="toggle-dark"></div>
        <div className="toggle-point" id="toggle-white"></div>
      </div>

      <section id="panel">
        <div id="value-panel">{value}</div>
        <div id="preview">{preview.numb01} {result.operationType} {preview.numb02} {preview.result}</div>
      </section>

      <section id="buttons">
        <div id="buttons-container-01">
          {
            insertButtons().numbers.map((element) => element)
          }
        </div>

        <div id="buttons-container-02">
          {
            insertButtons().simbols.map((element) => element)
          }
        </div>
      </section>
    </div>
  )
}



export default App
