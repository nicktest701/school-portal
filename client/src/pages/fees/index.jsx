import React from 'react';
import { Outlet } from 'react-router-dom';
import FeeNav from './layout/FeeNav';

const Fees = () => {
  return (
    <div>
      <FeeNav />
      <Outlet />
    </div>
  );
};

Fees.propTypes = {};

export default Fees;
