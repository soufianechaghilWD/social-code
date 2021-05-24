import React, { useState, useEffect } from 'react'

const Variable_Add = ({st, cl, done, handle}) => {

    const [type_Of_Value, setType_Of_Value] = useState('num') 
    const [variable, setVariable] = useState([])
    const [num, setNum] = useState("")
    const [str, setStr] = useState("")


    const updateVar = (newVar) => {
        setVariable([...variable, newVar])
        setNum('')
        setStr('')
    }

    // useEffect(() => {
    //     // if(type_Of_Value === "arr") setVariable({type: "arr", var: []})
    //     if(type_Of_Value === "arr") handle()
    // }, [type_Of_Value])


    return (
        <div style={st} className={cl}>
            <h2>Add elements in the Array</h2>
            <p>[{variable?.map((vari, idx) => vari?.type === "str" ? `"${vari?.var}"${idx !== variable.length - 1 ? ", " : ""}` : `${vari?.var}${idx !== variable.length - 1 ? ", ": ""}`)}]</p>
            <div>
                <label>Type of variable</label>
                <select onChange={e => setType_Of_Value(e.target.value)}>
                    <option value="str">String</option>
                    <option selected value="num">Number</option>
                    <option value="arr">Array</option>
                    <option value="obj">Object</option>
                </select>
            </div>
            {type_Of_Value === "num" && 
                <div>
                    <label>The Number</label>
                    <input type="text" value={num} onChange={e => setNum(e.target.value)} />
                    <button onClick={() => updateVar({type: "num", var: num})}>Add</button>
                </div>
            }
            {type_Of_Value === "str" && 
                <div>
                    <label>The String</label>
                    <input type="text" value={str} onChange={e => setStr(e.target.value)} />
                    <button onClick={() => updateVar({type: "str", var: str})}>Add</button>
                </div>
            }
            {
             type_Of_Value === "arr" && <Variable_Add st={st} cl={cl} done={done} handle={handle}/>   
            }
            <button onClick={() => done(variable)}>Done</button>
        </div>
    )
}

export default Variable_Add
