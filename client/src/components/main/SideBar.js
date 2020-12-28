import React, { useContext } from 'react';
import { GrCatalog } from 'react-icons/gr';
import { FaPlus, FaBuffer } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/context';
const SideBar = () => {
  const { authState, logout } = useContext(AuthContext);
  const { isAuthenticated, loading } = authState;
  const history = useHistory();
  const handleClick = () => {
    logout();
    history.push('/login');
  };
  return (
    <div className='sidebar' id='sidebar'>
      <ul>
        <li>
          <Link to='/home'>
            <FaBuffer className='catalog-icon' />
            Catalog
          </Link>
        </li>
        <li>
          <Link to='/add'>
            <FaPlus />
            Add Items
          </Link>
        </li>
        <li onClick={handleClick}>
          <Link to='/login'>
            <FiLogOut />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
