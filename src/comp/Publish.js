import React, { useState } from 'react'
import '../styles/publish.css'
import { AiOutlinePlus } from "react-icons/ai"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddTest from './AddTest';
  
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
    const [inputs, setInputs] = useState([])
    const [outputs, setOutputs] = useState([])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const body = (
    //     <div  className={`${classes.paper} add_test_modal`}>
    //         <h2 id="simple-modal-title">Text in a modal</h2>
    //         <p id="simple-modal-description">
    //             Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    //         </p>
    //     </div>
    // );


    const publish_A_Challenge = (e) => {
        e.preventDefault()
        console.log("test")
    }

    const addItem = (item) => {
        setInputs([...inputs, item])
        setOpen(false)
    }

    console.log("in", inputs.length, "\n", inputs)

    return (
        <div className="publish">
            <h1>Publish a challenge</h1>
            <div className="form__container">
                <form>
                    <div>
                        <label>The Name of the challenge</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>The Level of the challenge</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label>The Average solving time of the challenge</label>
                        <select>
                            <option value="15">15min</option>
                            <option selected value="30">30min</option>
                            <option value="45">45min</option>
                            <option value="60">60min</option>
                        </select>
                    </div>
                    <div>
                        <label>The Description of the challenge</label>
                        <textarea rows={6} />
                    </div>
                    <div>
                        <label>The Skelet of the challenge</label>
                        <textarea rows={6} />
                    </div>
                    <div>
                        <label>The Tag of the challenge</label>
                        <select>
                            <option value="functions">Functions</option>
                            <option selected value="arrays">Arrays</option>
                            <option value="objects">Objects</option>
                            <option value="classes">Classes</option>
                        </select>
                    </div>
                    <div>
                        <label>The Tests of the challenge</label>
                        <div>
                            <span>The first output is the first input’s output</span>
                            <div>
                                <h3>Inputs</h3>
                                <AiOutlinePlus onClick={handleOpen} />
                            </div>
                            <div>
                                <h3>Outputs</h3>
                                <AiOutlinePlus />
                            </div>
                        </div>
                    </div>
                    <button onClick={publish_A_Challenge}>Publish</button>
                </form>
            </div>
            <Modal
                className={classes.all}
                open={open}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <AddTest cln={classes.paper} addItem={addItem} />
            </Modal>
        </div>
    )
}

export default Publish
