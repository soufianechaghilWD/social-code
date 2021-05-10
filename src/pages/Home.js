import React, { useEffect, useState } from 'react'
import { useStateValue } from "../comp/StateProvider";
import { useHistory } from 'react-router-dom';
import Publish from '../comp/Publish';
import Header from '../comp/Header';
import axios from '../axios'

const Home = () => {

    const [ state , dispatch] = useStateValue();
    const history = useHistory();
    const [user, setUser] = useState(null)

    useEffect(() => {
        if(state.user === null ){
            if(localStorage.getItem('social-user') !== null){
                dispatch({
                    type: "SET__USER",
                    user: JSON.parse(localStorage.getItem('social-user'))
                })
                axios.get(`/user/user/${JSON.parse(localStorage.getItem('social-user')).displayName}`)
                .then((res) => {
                    if(res.status === 200){
                        setUser(res.data)
                        dispatch({
                            type: "SET__USERINFO",
                            userInfo: res.data
                        })
                    }
                })
                .catch((err) => {
                    const errr = new Error(err)
                    setUser(errr)
                })
            }else{
                history.push('/signin')
            }
        }else{
            axios.get(`/user/user/${state?.user?.displayName}`)
            .then((res) => {
                if(res.status === 200){
                    setUser(res.data)
                    dispatch({
                        type: "SET__USERINFO",
                        userInfo: res.data
                    })
                }
            })
            .catch((err) => {
                const errr = new Error(err)
                setUser(errr)
            })
        }
    }, [state, localStorage])

    console.log("wooo", state)

    return (
        <div>
            {/* <h1>Home Page</h1>
            <h2>{state?.user?.displayName}</h2>
            <button onClick={e => history.push('/signup')}>sign up</button>
            <button onClick={e => history.push('/signin')}>sign in</button>
            <button onClick={() => localStorage.removeItem('social-user')}>Delete the local storage</button> */}
            <Header user={user} />
            <Publish />
        </div>
    )
}

export default Home
