import './App.css';
import Signup from './pages/Signup';
import { BrowserRouter as Router , Route, Switch } from "react-router-dom"
import Signin from './pages/Signin';
import Home from './pages/Home';
import Test from './pages/Test';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
