import React from 'react';
import { Link } from 'react-router-dom';

function MiniDrawerItem({ title, to }) {
  return (
    <Link className='mini-drawer-link' to={to} >
      {title}
    </Link>
  );
}

export default MiniDrawerItem;
