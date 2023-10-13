import React, { useContext, useEffect, useState } from 'react';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import dayjs from 'dayjs';

import { AuthProviderContext } from '../../context/AuthProvider';
import { db } from '../../lib/firebase/config';
import OrderInfo from './components/order/OrderInfo';

const CustomerOrder = () => {
  const navigate = useNavigate();
  const { user, dish } = useContext(AuthProviderContext);
  const [ordered, setOrdered] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, 'orders'),
      where('user', '==', user?.uid),
      where('orderDate', '==', dayjs().format('DD/MM/YYYY')),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push({
          uid: doc.id,
          ...doc.data(),
        });
      });

      if (datas.length) {
        setLoading(false);
        setOrdered(datas[0]);
      } else {
        setLoading(false);
        navigate('create');
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  return (
    <div className="p-10 pb-20 overflow-auto">
      <>{loading ? <div>loading...</div> : <Outlet context={{ orderInfo: ordered }} />}</>
    </div>
  );
};

export default CustomerOrder;
