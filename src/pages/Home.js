import React from 'react'
import { useStateValue } from "../comp/StateProvider";
import { useHistory } from 'react-router-dom';

const Home = () => {

    const [ state , dispatch] = useStateValue();
    const history = useHistory();

    console.log(state)

    return (
        <div>
            <h1>Home Page</h1>
            <button onClick={e => history.push('/signup')}>sign up</button>
            <button onClick={e => history.push('/signin')}>sign in</button>
        </div>
    )
}

export default Home
