import React, { useEffect } from 'react'
import { useStateValue } from "../comp/StateProvider";
import { useHistory } from 'react-router-dom';

const Home = () => {

    const [ state , dispatch] = useStateValue();
    const history = useHistory();

    useEffect(() => {
        if(state.user === null ){
            if(localStorage.getItem('social-user') !== null){
                dispatch({
                    type: "SET__USER",
                    user: JSON.parse(localStorage.getItem('social-user'))
                })
            }else{
                history.push('/signin')
            }
        }
    }, [state, localStorage])

    return (
        <div>
            <h1>Home Page</h1>
            <h2>{state?.user?.displayName}</h2>
            <button onClick={e => history.push('/signup')}>sign up</button>
            <button onClick={e => history.push('/signin')}>sign in</button>
            {/* <button onClick={() => localStorage.removeItem('social-user')}>Delete the local storage</button> */}
        </div>
    )
}

export default Home
