import React, { useReducer, createContext } from 'react';
import authReducer from './authReducer';
import alertReducer from './alertReducer';
import { v4 as uuid } from 'uuid';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};
const initialStateAlert = [];
export const AuthContext = createContext(initialState);

export const Provider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, initialState);
  const [alerts, dispatchAlerts] = useReducer(alertReducer, initialStateAlert);

  const setAlert = (msg, param, alertType, timeout = 3000) => {
    const id = uuid();
    dispatchAlerts({
      type: 'SET_ALERT',
      payload: { msg, param, alertType, id },
    });
    setTimeout(
      () =>
        dispatchAlerts({
          type: 'REMOVE_ALERT',
          payload: id,
        }),
      timeout
    );
  };
  const addUser = async (formData) => {
    const { name, email, password } = formData;
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ name, email, password });
    try {
      const res = await axios.post('/api/users', body, config);
      // console.log(token);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: res.data,
      });
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, error.param, 'danger'));
      }
      dispatch({
        type: 'REGISTER_FAIL',
      });
    }
  };
  //load user
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
      console.log(res);

      dispatch({
        type: 'USER_LOADED',
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: 'AUTH_ERROR',
      });
    }
  };

  //Login User
  const loginUser = async (formData) => {
    console.log(formData);
    const { email, password } = formData;

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({ email, password });
    try {
      const res = await axios.post('/api/auth', body, config);
      //console.log(res);
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      // console.log(err);
      const errors = err.response.data.errors;
      // console.log(errors);
      if (errors) {
        errors.forEach((error) => setAlert(error.msg, error.param, 'danger'));
      }
      dispatch({
        type: 'LOGIN_FAIL',
      });
    }
  };
  //Logout
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        setAlert,
        alerts,
        addUser,
        logout,
        loginUser,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
