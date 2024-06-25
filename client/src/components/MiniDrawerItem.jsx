import React from 'react';
import { Link } from 'react-router-dom';

function MiniDrawerItem({ title, to, handleClose }) {
  return (
    <Link className='mini-drawer-link' to={to} onClick={() => handleClose()}>
      {title}
    </Link>
  );
}

export default MiniDrawerItem;
