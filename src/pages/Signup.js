import React, { useState, useEffect } from 'react'
import "../styles/signup.css"
import Logo from "../files/LogoWhite.png"
import { AiFillGithub } from "react-icons/ai"
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import axios from '../axios'
import { useStateValue } from "../comp/StateProvider";
import { VscLoading } from 'react-icons/vsc'

const Signup = () => {

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState(null)
    const [ state , dispatch] = useStateValue();
    const [userExists, setUserExists] = useState(null)
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        if(err !== null){
            alert(err)
        }
    }, [err])

    const handleSignUpWithEmail = (e) => {
        
        e.preventDefault()
        setLoading(true)
        // Handle the sign up if the user choices to type his info
        axios.post('/user', { 
            username: username,
            name: name,
            email: email
        }) // Create the user in DB
        .then((res) => {
            if(res.status === 200){
                auth.createUserWithEmailAndPassword(email, password) // Create the user on Firebase
                .then(ress => {
                    if(ress.user){
                        ress.user.updateProfile({
                            displayName: res.data._id
                        }) // Update the user in firebase (putting the Id from DB in the displayname)
                        .then(() => {
                            dispatch({
                            type: "SET__USER",
                            user: ress.user
                        })
                        })
                        .then(() => {
                            setLoading(false)
                            history.push('/')
                        })
                        .catch(err => {setErr(err); setLoading(false)})
                    }else{
                        setErr(true)
                        setLoading(false)
                    }
                    
                })
                .catch(err => {setErr(err); setLoading(false)})
            }else{
                setErr(true)
                setLoading(false)
            }
        })
        .catch(err => {
            if(err.response.status === 301) setUserExists(err.response.data)
            else setErr(err)
            setLoading(false)
        })
    }


    return (
        <div className="signup">
            <div className="signup__content">
                <div className="signup__logo">
                    <img src={Logo} alt="" />
                </div>
                <form>
                    <div>
                        <label>Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Type your Email"/>
                        {(userExists && userExists === "email") && <p>The Email already exists</p>}
                    </div>
                    <div>
                        <label>Name</label>
                        <input value={name} onChange={e => setName(e.target.value)}  type="text" placeholder="Type your Name"/>
                    </div>
                    <div>
                        <label>Username</label>
                        <input value={username} onChange={e => setUsername(e.target.value)}  type="text" placeholder="Type your Username"/>
                        {(userExists && userExists === "username") && <p>The Username already exists</p>}
                    </div>
                    <div>
                        <label>Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)}  type="password" placeholder="Type your Password"/>
                    </div>
                    <button onClick={handleSignUpWithEmail} disabled={loading} >{!loading ? "Sign up" : <VscLoading className="icon-spin" />}</button>
                </form>
                <div className="signup__github">
                    <div>
                        <AiFillGithub />
                        <p>Sign up with Github</p>
                    </div>
                </div>
                <p>If you already have an account <span onClick={e => history.push('/signin')}>Sign in</span></p>
            </div>
        </div>
    )
}

export default Signup
