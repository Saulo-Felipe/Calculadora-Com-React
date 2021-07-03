import React, { useEffect, useState } from 'react'
import './style.css'

function App() {
    useEffect(() => {
        require('./script.js')
    }, [])

    const [initialValue, setValue] = useState({
        operator: false,
        values: ["0", String()],
        typeOperator: String(),
        simbolOperator: String()
    })
    
    function digit(valor) {
        function addNew() {
            var local = document.querySelector(".ResultOficial")
            if (local.innerText === "0" && initialValue.operator == false) {
                var newvalues = initialValue.operator === true
                ? initialValue.values[1] = `${valor}`
                : initialValue.values[0] = `${valor}`
            } else {
                var newvalues = initialValue.operator === true
                ? initialValue.values[1] += `${valor}`
                : initialValue.values[0] += `${valor}`
            }
            setValue({
                operator: initialValue.operator,
                values: initialValue.operator === true
                ? [initialValue.values[0], `${newvalues}`]
                : [`${newvalues}`, String()]
                ,typeOperator: initialValue.typeOperator,
                simbolOperator: initialValue.simbolOperator
            })
        }
        if (initialValue.values[0].length < 9 && initialValue.operator == false){
            addNew()
        }
        if (initialValue.operator == true && initialValue.values[1].length < 9) {
            addNew()
        }
    }
    function pont(valor) {
        function newAdd() {
            var newvalues = initialValue.operator === true
            ? initialValue.values[1] += initialValue.values[1].length == 0 ? `0${valor}` : `${valor}`
            : initialValue.values[0] += initialValue.values[0].length == 0 ? `0${valor}` : `${valor}`
            setValue({
                operator: initialValue.operator,
                values: initialValue.operator === true
                    ? [initialValue.values[0], `${newvalues}`]
                    : [`${newvalues}`, String()]
                ,typeOperator: initialValue.typeOperator,
                simbolOperator: initialValue.simbolOperator
            })
        }
        if ((String(initialValue.values[0]).indexOf(".") == -1 && initialValue.operator == false)) {
            newAdd()
        } else {
            if ((String(initialValue.values[1]).indexOf(".") == -1) && initialValue.operator == true) {
                newAdd()
            }
        }
    }
    function Clear() {
        document.querySelector("#result").style.animationName = "clearAnimated"
        setTimeout(() => {
            document.querySelector("#result").style.animationName = ""
        }, 500)
        setValue({
            operator: false,
            values: ["0", String()],
            typeOperator: String(),
            simbolOperator: String()
        })
    }
    function operator(oper, simbol) {
        if (oper == "igual") {
            if (initialValue.values[0] != "" && initialValue.values[1] != "" ) {
                var resultado = String()
                switch (initialValue.typeOperator) {
                    case "somar":
                        resultado = Number(initialValue.values[0]) + Number(initialValue.values[1])
                        break
                    case "dividir":
                        resultado = Number(initialValue.values[0]) / Number(initialValue.values[1])
                        break
                    case "diminuir":
                        resultado = Number(initialValue.values[0]) - Number(initialValue.values[1])
                        break
                    case "multiplicar":
                        resultado = Number(initialValue.values[0]) * Number(initialValue.values[1])
                        break
                    default:
                        document.querySelector("#result").innerHTML = "Erro no Sistema"
                }
                resultado = resultado.length <= 9 ? resultado : String(resultado).slice(0, 9)
                setValue({
                    operator: false,
                    values: [resultado, String()],
                    typeOperator: String(),
                    simbolOperator: String()
                })
            }
        } else {
            if (document.querySelector("#result").innerText != "") {
                function NewAdd() {
                    setValue({
                        operator: true,
                        values: initialValue.values,
                        typeOperator: oper,
                        simbolOperator: simbol
                    })
                }
                if (initialValue.operator === true) {
                    NewAdd()
                } else {
                    NewAdd()
                }
            }
        }
    }
    function calcule(numberOne, numberTwo, operator) {
        if (initialValue.values[1] != "") {
            if (operator == "+") {
                return `${Number(numberOne) + Number(numberTwo)} = `
            } else if (operator == "-") {
                return `${Number(numberOne) - Number(numberTwo)} = `
            } else if (operator == "x") {
                return `${Number(numberOne) * Number(numberTwo)} = `
            } else if (operator == "÷") {
                return `${Number(numberOne) / Number(numberTwo)} = `
            } else {
                return ""
            }
        }
    }
    function apagar() {
        if (initialValue.operator == false && initialValue.values[0] !== "0") {
            var deletar = initialValue.values[0].slice(initialValue.values[0].length - 1, initialValue.values[0].length)
            setValue({
                operator: initialValue.operator,
                values: [initialValue.values[0].substring(0, initialValue.values[0].lastIndexOf(deletar)), initialValue.values[1]],
                typeOperator: initialValue.typeOperator,
                simbolOperator: initialValue.simbolOperator
            })
        } else if (initialValue.operator == true) {
            var deletar = initialValue.values[1].slice(initialValue.values[1].length - 1, initialValue.values[1].length)
            setValue({
                operator: initialValue.operator,
                values: [initialValue.values[0], initialValue.values[1].substring(0, initialValue.values[1].lastIndexOf(deletar))],
                typeOperator: initialValue.typeOperator,
                simbolOperator: initialValue.simbolOperator
            })
        }
    }    
    return (
        <div id="body-calculator">
            <div id="result">
                <div id="config">
                    <div id="togle">
                        <div id="on" className="turnOn"></div>
                        <div id="off" className="turnOff"></div>
                    </div>
                </div>
                <div id="ResultValue">
                    <span> {calcule(initialValue.values[0], initialValue.values[1], initialValue.simbolOperator)}</span>
                     {initialValue.values[0]} {initialValue.simbolOperator} {initialValue.values[1]}
                </div>
                <div className="ResultOficial">{initialValue.values[1] || initialValue.simbolOperator || initialValue.values[0]}</div>
            </div>
            <div id="numbers">
                <button className="buttons" onClick={() => { digit(7) }}>7</button>
                <button className="buttons" onClick={() => { digit(8) }}>8</button>
                <button className="buttons" onClick={() => { digit(9) }}>9</button>
                <button className="buttons" onClick={() => { digit(4) }}>4</button>
                <button className="buttons" onClick={() => { digit(5) }}>5</button>
                <button className="buttons" onClick={() => { digit(6) }}>6</button>
                <button className="buttons" onClick={() => { digit(1) }}>1</button>
                <button className="buttons" onClick={() => { digit(2) }}>2</button>
                <button className="buttons" onClick={() => { digit(3) }}>3</button>
                <button className="buttons zero" onClick={() => { digit(0) }}>0</button>
                <button className="buttons virg" onClick={() => { pont(".") }}>.</button>
                <button className="buttons equal" onClick={() => { operator("igual", "=") }}>=</button>
            </div>
            <div id="operators">
                <button className="buttons-operator apagar" onClick={() => { apagar() }}>.</button>
                <button className="buttons-operator" onClick={() => { Clear() }}>C</button>
                <button className="buttons-operator div" onClick={() => { operator("dividir", "÷") }}>÷</button>
                <button className="buttons-operator multi" onClick={() => { operator("multiplicar", "x") }}>x</button>
                <button className="buttons-operator sub" onClick={() => { operator("diminuir", "-") }}>-</button>
                <button className="buttons-operator sum" onClick={() => { operator("somar", "+") }}>+</button>
            </div>
        </div>
    )    
}

export default App;
