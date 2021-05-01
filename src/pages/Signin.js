import React, { useState, useEffect } from 'react'
import "../styles/signup.css"
import Logo from "../files/LogoWhite.png"
import { AiFillGithub } from "react-icons/ai"
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { useStateValue } from "../comp/StateProvider";
import { VscLoading } from 'react-icons/vsc'
import firebase from 'firebase'
import axios from '../axios'

const Signin = () => {

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ state , dispatch] = useStateValue();
    const [err, setErr] = useState(null)
    const [loading, setLoading] = useState(false)
    const [logged, setLogged] = useState(false)

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
                    if(logged){
                        localStorage.setItem('social-user', JSON.stringify(res.user))
                    }
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

    const handleSignUpWithGithub = () => {
        const provider = new firebase.auth.GithubAuthProvider()

        firebase.auth() // Signup or signin with github
        .signInWithPopup(provider)
        .then((result) => {

            // The signed-in user info.
            var user = result.user;

            axios.post('/user', { // Create the user on the DB if it's not created
                email: user.email,
                username: result.additionalUserInfo.username,
                name: result.additionalUserInfo.profile.name || result.additionalUserInfo.username
            })
            .then((res) => {
                if(res.status === 200){
                    user.updateProfile({
                        displayName: res.data._id
                    })
                    .then(() => {
                        const pro = new Promise((reso, reje) => {
                            reso(dispatch({
                                type: "SET__USER",
                                user: user
                            }))
                        })
                        pro.then(() => {
                            if(logged){
                                localStorage.setItem('social-user', JSON.stringify(user))
                            }
                            history.push('/')
                        })
                    })
                }
            })
            .catch(err => {
                if(err.response.status === 301){
                    const pro = new Promise((reso, reje) => {
                    reso(dispatch({
                        type: "SET__USER",
                        user: user
                    }))
                    })
                    pro.then(() => {
                        if(logged){
                            localStorage.setItem('social-user', JSON.stringify(user))
                        }
                        history.push('/')
                    }) 
                }
            })
        })
        .catch(err => alert(err.message))
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
                    <div className="signup__logged">
                        <label>Stay Logged in</label>
                        <input type="checkbox" value={logged} onChange={e => setLogged(!logged)} />
                    </div>
                    <button onClick={signInWithEmail} disabled={loading} >{!loading ? "Sign in" : <VscLoading className="icon-spin" />}</button>
                </form>
                <div className="signup__github" onClick={handleSignUpWithGithub} >
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
