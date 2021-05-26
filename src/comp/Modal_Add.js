import React, { useState } from 'react'
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript'

const Modal_Add = ({cln, add}) => {

    const [valueIn, setValueIn] = useState('')
    const [valueOu, setValueOu] = useState('')

    return (
        <div  className={`${cln} add_test_modal`}>
            <h5>Read Guidelines on how type the inputs !</h5>
            <h4>Add the Inputs</h4>
            <CodeMirror
            value={valueIn}
            options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
                lineWrapping: true
            }}
            onBeforeChange={(editor, data, value) => {
                setValueIn(value)
            }}
            className="inputs"
            />
            <h4>Add the Outputs</h4>
            <CodeMirror
            value={valueOu}
            options={{
                mode: 'javascript',
                theme: 'material',
                lineNumbers: true,
                lineWrapping: true
            }}
            onBeforeChange={(editor, data, value) => {
                setValueOu(value)
            }}
            className="inputs"
            />
            <button onClick={() => add(valueIn, valueOu)}>Submit</button>
        </div>
    )
}

export default Modal_Add
