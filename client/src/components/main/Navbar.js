import React, { useContext } from 'react';
import icon from '../../assets/home-icon.jpg';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/context';
import { FiLogOut } from 'react-icons/fi';
import { GiHamburgerMenu } from 'react-icons/gi';
const Navbar = () => {
  const { authState, logout } = useContext(AuthContext);
  const { isAuthenticated, loading } = authState;
  const history = useHistory();
  const handleClick = () => {
    logout();
    history.push('/login');
  };
  const authLinks = (
    <ul className='logout-list' id='logout-list'>
      <li onClick={handleClick} className='logout'>
        <FiLogOut />
        Logout
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className='register-list'>
      <li>
        <Link to='/signup'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  const handleHamburger = () => {
    if (isAuthenticated && window.matchMedia('(max-width: 700px)')) {
      var sidebar = document.getElementById('sidebar');

      sidebar.style.display =
        sidebar.style.display === 'none' ? 'block' : 'none';
    }
  };
  return (
    <nav className='navbar bg-dark'>
      <div className='header'>
        <div className='title'>
          <img src={icon} alt='Home-Icon' />
          <h1>Inventory Management</h1>
        </div>
      </div>
      {isAuthenticated && (
        <GiHamburgerMenu className='hamburger' onClick={handleHamburger} />
      )}

      {/* <input type='checkbox' className='hamburger' /> */}
      {!loading && <>{isAuthenticated ? <></> : guestLinks}</>}
      {/* <ul>
        <li>
          <Link to='/signup'>Register</Link>
        </li>
        <li>
          <Link to='/signup>Login</Link>
        </li>
      </ul> */}
    </nav>
  );
};

export default Navbar;
