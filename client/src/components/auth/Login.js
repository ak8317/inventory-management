import React, { useContext, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/context';
const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);

  const { email, password } = formData;
  const { loginUser, alerts } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(formData);
    loginUser(formData);
    history.push('/home');
    setFormData(initialState);
  };

  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <FaUser className='user-icon' />
        Sign into Your Account
      </p>
      <form className='form' noValidate onSubmit={handleSubmit}>
        <div className='form-inputs'>
          <input
            className='form-input'
            placeholder='Email'
            type='text'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
          {alerts &&
            alerts.map((alert) => {
              if (alert.param === 'email') {
                return (
                  <p
                    key={alert.id}
                    className={`alert alert-${alert.alertType}`}
                  >
                    {alert.msg}
                  </p>
                );
              }
              return <></>;
            })}
        </div>
        <div className='form-inputs'>
          <input
            className='form-input'
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
            required
          />
          {alerts &&
            alerts.map((alert) => {
              if (alert.param === 'password') {
                return (
                  <p
                    key={alert.id}
                    className={`alert alert-${alert.alertType}`}
                  >
                    {alert.msg}
                  </p>
                );
              }
              return <></>;
            })}
        </div>
        <button className='btn btn-primary' type='submit'>
          Submit
        </button>
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/signup'>Sign Up</Link>
      </p>
    </section>
  );
};

export default Login;
