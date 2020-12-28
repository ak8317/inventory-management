import './App.css';
import React, { useEffect, useContext } from 'react';
import Navbar from './components/main/Navbar';
import SignUp from './components/auth/SignUp';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import Login from './components/auth/Login';

import setAuthToken from './utils/setAuthToken';
import { AuthContext } from './context/context';
import Sidebar from './components/main/SideBar';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const { loadUser } = useContext(AuthContext);
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/home' component={Sidebar} />
        <Redirect from='/' to='/signup' />
      </Switch>
    </Router>
  );
}

export default App;
