"use client";

import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../shared/lib/firebase/config";

const SignIn = () => {
  const onGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    console.log(userCredential);
  };

  return (
    <div className="flex items-center justify-center">
      <button className="px-5 py-2 rounded-lg border" onClick={onGoogleLogin}>
        Login with Google
      </button>
    </div>
  );
};

export default SignIn;
