import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import Layout from '../layouts/Layout';
import { auth } from '../lib/firebase/config';

const SignIn = () => {
  const onGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
  };

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <button className="px-5 py-2 rounded-lg border" onClick={onGoogleLogin}>
          Login with Google
        </button>
      </div>
    </Layout>
  );
};

export default SignIn;
