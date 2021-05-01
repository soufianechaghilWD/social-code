import React, { useState } from 'react'
import "../styles/signup.css"
import Logo from "../files/LogoWhite.png"
import { AiFillGithub } from "react-icons/ai"
import { useHistory } from 'react-router-dom';

const Signin = () => {

    const history = useHistory();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div className="signup">
            <div className="signin signup__content">
                <div className="signup__logo">
                    <img src={Logo} alt="" />
                </div>
                <form>
                    <div>
                        <label>Email</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder="Type your Email"/>
                    </div>
                    <div>
                        <label>Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder="Type your Password"/>
                    </div>
                    <button>Sign in</button>
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
