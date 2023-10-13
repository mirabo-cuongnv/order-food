import React from 'react';
import Layout from '../../layouts/Layout';
import { Outlet } from 'react-router-dom';

const CustomerRoot = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default CustomerRoot;
