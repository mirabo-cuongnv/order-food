import React, { useContext } from 'react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { AuthProviderContext } from '../context/AuthProvider';
import Header from '../components/Header';
import { auth } from '../lib/firebase/config';

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthProviderContext);

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="container mx-auto max-w-screen-sm border rounded h-screen min-h-screen overflow-auto">
      {user?.uid && <Header user={user} onSignOut={handleSignOut} />}
      {children}
    </div>
  );
};

export default Layout;
