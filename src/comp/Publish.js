import React, { useState } from 'react'
import '../styles/publish.css'
import { AiOutlinePlus } from "react-icons/ai"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Modal_Add from './Modal_Add';
import { TheRightSizeIn } from '../outils';
import {Controlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript'


const useStyles = makeStyles((theme) => ({
paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    outline: "none"
},
all: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}
}));


const Publish = () => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [inputs, setInputs] = useState(null)
    const [outputs, setOutputs] = useState(null)
    const [name, setName] = useState('')
    const [level, setLevel] = useState('me')
    const [time, setTime] = useState('30')
    const [desc, setDesc] = useState("")
    const [tag, setTag] = useState("arrays")
    const [skelet, setSkelet] = useState("")

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const publish_A_Challenge = (e) => {
        e.preventDefault()
        console.log("test", name, level, desc, time, tag, inputs, outputs)
    }

    const add = (inputs, outputs) => {
        setInputs(inputs)
        setOutputs(outputs)
        setOpen(false)
    }


    return (
        <div className="publish">
            <h1>Publish a challenge</h1>
            <div className="form__container">
                <form>
                    <div>
                        <label>The Name of the challenge</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div>
                        <label>The Level of the challenge</label>
                        <select onChange={e => setLevel(e.target.value)}>
                            <option value="ea">Easy</option>
                            <option selected value="me">Meduim</option>
                            <option value="ha">Hard</option>
                            <option value="vh">Very Hard</option>
                        </select>
                    </div>
                    <div>
                        <label>The Average solving time of the challenge</label>
                        <select onChange={e => setTime(e.target.value)}>
                            <option value="15">15min</option>
                            <option selected value="30">30min</option>
                            <option value="45">45min</option>
                            <option value="60">60min</option>
                        </select>
                    </div>
                    <div>
                        <label>The Description of the challenge</label>
                        <textarea rows={6} value={desc} onChange={e => setDesc(e.target.value)} />
                    </div>
                    <div>
                        <label>The Skelet of the challenge</label>
                        <div>
                            <CodeMirror
                            value={skelet}
                            options={{
                                mode: 'javascript',
                                theme: 'material',
                                lineNumbers: true,
                                lineWrapping: true
                            }}
                            onBeforeChange={(editor, data, value) => {
                                setSkelet(value)
                            }}
                            className="skelet"
                            />
                        </div>
                    </div>
                    <div>
                        <label>The Tag of the challenge</label>
                        <select onChange={e => setTag(e.target.value)}>
                            <option value="functions">Functions</option>
                            <option selected value="arrays">Arrays</option>
                            <option value="objects">Objects</option>
                            <option value="classes">Classes</option>
                        </select>
                    </div>
                    <div>
                        <label>The Tests of the challenge</label>
                        <div>
                            <div>
                                <div>
                                    <h3>Inputs</h3>
                                    {inputs !== null && <p>{ TheRightSizeIn(inputs)}</p>}
                                </div>
                                <div className="outputs">
                                    <h3>Outputs</h3>
                                    {outputs !== null && <p>{ TheRightSizeIn(outputs)}</p>}
                                </div>
                            </div>
                            {(inputs === null && outputs === null) && 
                                <div>
                                <AiOutlinePlus onClick={handleOpen} />
                                </div>
                            }
                            
                        </div>
                    </div>
                    <button onClick={publish_A_Challenge}>Publish</button>
                </form>
            </div>
            <Modal
                className={classes.all}
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <Modal_Add cln={classes.paper} add={add} />
            </Modal>
        </div>
    )
}

export default Publish
