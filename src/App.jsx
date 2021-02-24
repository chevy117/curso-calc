import React, { useState} from 'react'
import words from 'lodash.words'
import Functions from './components/Functions'
import MathOperations from './components/MathOperations'
import Numbers from './components/Numbers'
import Result from './components/Result'
import './App.css'

const App = () => {
    const [stack, setStack] = useState("")
    const items = words(stack, /[^-^+^*^/]+/g)
    let value = items.length > 0 ? items[items.length -1] : "0"

    if(stack.substring(0,1) === "-"){
        value = stack.substring(0,1) + value
    }
    return (
    <main className='react-calculator'>
        <Result value={value} />
        <Numbers onClickNumber={
            number => {
                if(stack !== "0"){
                    setStack(`${stack}${number}`)
                }else{
                    const newStack3 = stack.substring(0, stack.length - 1)
                    setStack(`${newStack3}${number}`)
                }
            }
        }/>
        <Functions 
            onContentClear={() => setStack('')}
            onDelete={() => {
                if(stack.length>0){
                    const newStack = stack.substring(0, stack.length - 1)
                    setStack(newStack)
                }
            }}
            onPoint={() => {
                if(value.includes(".") === false ){
                    setStack(`${stack}.`)
                }
            }}
        />
        
        <MathOperations onClickOperation={operation => {
            if(stack && stack !== "."){
                if(stack.charAt(stack.length - 1) !== "+"
                && stack.charAt(stack.length - 1) !== "-"
                && stack.charAt(stack.length - 1) !== "/"
                && stack.charAt(stack.length - 1) !== "*"){
                    setStack(`${stack}${operation}`)        
                }else{
                    const newStack2 = stack.substring(0, stack.length - 1)
                    setStack(`${newStack2}${operation}`)
                }
            }
            }}
            
            onClickEqual={equal => {
                if (stack && stack !== "."){
                    if((stack.slice(0, 1) !== "/" 
                     && stack.slice(0, 1) !== "*" ) && 
                       (stack.charAt(stack.length - 1) !== "+" ) && 
                       (stack.charAt(stack.length - 1) !== "-" ) && 
                       (stack.charAt(stack.length - 1) !== "*" ) && 
                       (stack.charAt(stack.length - 1) !== "/" )){
                            setStack(eval(stack).toString())
                    }
                }
            }}
        />
    </main>)
}

export default App

