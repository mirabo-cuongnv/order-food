import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import dayjs from 'dayjs';

import { auth, db } from '../lib/firebase/config';
import { addDocument } from '../lib/firebase/service';

export const AuthProviderContext = createContext({ user: null });

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const [dish, setDish] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscibed = auth.onAuthStateChanged((user) => {
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({
          displayName,
          email,
          uid,
          photoURL,
        });
        setLoading(false);
        if (email === 'mountain.olive.472@example.com') {
          navigate('/admin');
        } else {
          navigate('/customer');
        }
        return;
      }

      // reset user info

      setLoading(false);
      setUser({});
      navigate('/login');
    });

    return () => {
      unsubscibed();
    };
  }, []);

  useEffect(() => {
    if (!user?.uid || loading) return;

    const unsub = onSnapshot(doc(db, 'wallet', user?.uid), (doc) => {
      if (doc.exists()) {
        setBalance(doc.data().balance);
      } else {
        setBalance(0);
        addDocument(user?.uid, { balance: 0, ...user }, 'wallet');
        addDocument(user?.uid, user, 'users');
      }
    });

    const q = query(collection(db, 'dish'), where('orderDate', '==', dayjs().format('DD/MM/YYYY')));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push({
          uid: doc.id,
          ...doc.data(),
        });
      });

      if (datas.length) {
        setDish(datas[0]);
      }
    });

    return () => {
      unsub();
      unsubscribe();
    };
  }, [user, loading]);

  return (
    <AuthProviderContext.Provider value={{ user, balance, dish }}>
      {!loading ? children : <>loading...</>}
    </AuthProviderContext.Provider>
  );
};

export default AuthProvider;
