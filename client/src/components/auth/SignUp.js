import React, { useContext, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/context';

const initialState = {
  name: '',
  email: '',
  password: '',
  password2: '',
};
const SignUp = () => {
  const history = useHistory();
  const [formData, setFormData] = useState(initialState);

  const { name, email, password, password2 } = formData;

  const { addUser, setAlert, alerts } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('password do not Match', 'password2', 'danger');
      // console.log(alerts);
    }

    addUser(formData);
    history.push('/home');
    setFormData(initialState);
  };
  return (
    <section className='container'>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <FaUser className='user-icon' />
        Create your Account
      </p>
      <form className='form' noValidate onSubmit={handleSubmit}>
        <div className='form-inputs'>
          <input
            className='form-input'
            placeholder='Name'
            type='text'
            name='name'
            value={name}
            onChange={handleChange}
          />
          {alerts &&
            alerts.map((alert) => {
              if (alert.param === 'name') {
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
            placeholder='Email'
            type='text'
            name='email'
            value={email}
            onChange={handleChange}
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
        <div className='form-inputs'>
          <input
            className='form-input'
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={handleChange}
          />
          {alerts &&
            alerts.map((alert) => {
              if (alert.param === 'password2') {
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
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </section>
  );
};

export default SignUp;
