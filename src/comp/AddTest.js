import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Variable_Add from './Variable_Add';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


const AddTest = ({cln, addItem}) => {

    const classes1 = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open1, setOpen1] = React.useState(false);

    const [variable, setVariable] = useState(null)
    const [type_Of_Value, setType_Of_Value] = useState('num') 
    const [arr_var_type, setArr_Var_Type] = useState("num")
    const [arr_Var, setArr_Var] = useState(null)

    useEffect(() => {
        // if(type_Of_Value === "arr") setVariable({type: "arr", var: []})
        if(type_Of_Value === "arr") handleOpen()
    }, [type_Of_Value])

    // console.log(variable)

    const handleOpen = () => {
        setOpen1(true);
      };
    
      const handleClose = () => {
        setOpen1(false);
      };
    
      const body = (
        <div style={modalStyle} className={classes1.paper}>
          <h2 id="simple-modal-title">Text in a modal</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      );

      const done = (ele) => {
        setVariable(ele)
        handleClose()
      }


    return (
        <div  className={`${cln} add_test_modal`}>
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
                    <input type="string" onChange={e => setVariable({type: "num", var: e.target.value})} />
                </div>
            }
            {type_Of_Value === "str" && 
                <div>
                    <label>The String</label>
                    <input type="string" onChange={e => setVariable({type: "str", var: e.target.value})} />
                </div>
            }
            {/* {type_Of_Value === "arr" && 
                <div>
                    <label>The Array</label>
                    <p>[{variable?.var?.map((vari, idx) => vari?.type === "str" ? `"${vari?.var}"${idx !== variable.var.length - 1 ? ", " : ""}` : `${vari?.var}${idx !== variable.var.length - 1 ? ", ": ""}`)}]</p>
                    <div>
                        <label>Variable type</label>
                        <select onChange={e => setArr_Var_Type(e.target.value)}>
                            <option value="str">String</option>
                            <option selected value="num">Number</option>
                        </select>
                        <input type="text" onChange={e => setArr_Var({type: arr_var_type, var: e.target.value})} />
                        <button onClick={() => setVariable({type: "arr", var: [...variable.var, arr_Var]})}>Add</button>
                    </div>
                </div>
            } */}
            {
                type_Of_Value === "arr" && 
                <div>
                    <label>The Array</label>
                    <p>[{variable?.map((vari, idx) => vari?.type === "str" ? `"${vari?.var}"${idx !== variable.length - 1 ? ", " : ""}` : `${vari?.var}${idx !== variable.length - 1 ? ", ": ""}`)}]</p>
                </div>
            }
            <br />
            <button onClick={() => addItem(variable)}>Add</button>

            <Modal
                open={open1}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {/* {body} */}
                <Variable_Add st={modalStyle} cl={classes1.paper} done={done} handle={handleOpen} />
            </Modal>
        </div>
    )
}

export default AddTest
