import React, { useState, useEffect } from 'react'
import "../styles/signup.css"
import Logo from "../files/LogoWhite.png"
import { AiFillGithub } from "react-icons/ai"
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { useStateValue } from "../comp/StateProvider";
import { VscLoading } from 'react-icons/vsc'

const Signin = () => {

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ state , dispatch] = useStateValue();
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(err !== null){
            alert(err)
        }
    }, [err])

    const signInWithEmail = (e) => {
        e.preventDefault()

        setLoading(true)
        auth.signInWithEmailAndPassword(email, password) // Signing in using firebase Auth
        .then(res => {
            if(res){
                const pro = new Promise((reso, reje) => {
                    reso(dispatch({
                        type: "SET__USER",
                        user: res.user
                    }))
                })
                pro.then(() => {
                    history.push('/')
                    setLoading(false)
                })
                .catch(() => {
                    setErr(true)
                    setLoading(false)
                })
            }
        })
        .catch(err => {
            setErr(err)
            setLoading(false)
        })
    }

    return (
        <div className="signup">
            <div className="signin signup__content">
                <div className="signup__logo">
                    <img src={Logo} alt="" />
                </div>
                <form>
                    <div>
                        <label>Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Type your Email"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Type your Password"/>
                    </div>
                    <button onClick={signInWithEmail} disabled={loading} >{!loading ? "Sign in" : <VscLoading className="icon-spin" />}</button>
                </form>
                <div className="signup__github">
                    <div>
                        <AiFillGithub />
                        <p>Sign in with Github</p>
                    </div>
                </div>
                <p>If you don't have an account <span onClick={e => history.push('/signup')}>Sign Up</span></p>
            </div>
        </div>
    )
}

export default Signin
