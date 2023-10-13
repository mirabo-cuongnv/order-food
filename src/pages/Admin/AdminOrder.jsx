import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore';
import dayjs from 'dayjs';

import { db } from '../../lib/firebase/config';
import { STATE_PAYMENT } from '../../constant/status';
import { AuthProviderContext } from '../../context/AuthProvider';
import { formatPrice } from '../../utils/formation';
import { updateDocment } from '../../lib/firebase/service';
import OrderItem from './components/order/OrderItem';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

const AdminOrder = () => {
  const totalOrderRef = useRef();
  const { dish } = useContext(AuthProviderContext);
  const [ordered, setOrdered] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    date: dayjs().format('DD/MM/YYYY'),
  });

  const handleOrder = async (e) => {
    e.preventDefault();

    updateDocment(dish?.uid, { isLock: true }, 'dish');
    // Initialize batched
    const batched = writeBatch(db);

    ordered.forEach((orderInfo) => {
      if (orderInfo.isOrdered) return;
      const startOrderRequest = doc(db, 'orders', orderInfo.uid);
      const startCreatePayment = doc(db, 'payments', orderInfo.uid);
      const startUpdateBalance = doc(db, 'wallet', orderInfo.user);
      batched.update(startOrderRequest, { isOrdered: true });
      batched.update(startUpdateBalance, {
        balance: orderInfo.userInfo.balance - orderInfo.price,
        updatedAt: serverTimestamp(),
      });
      batched.set(startCreatePayment, {
        amount: orderInfo.price,
        status: STATE_PAYMENT.PAYMENT_ORDER,
        user: orderInfo.user,
        userInfo: orderInfo.userInfo,
        balance: orderInfo.userInfo.balance,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      });
    });

    await batched.commit();
  };

  useEffect(() => {
    const q = query(
      collection(db, 'orders'),
      where('orderDate', '==', filterOptions.date),
      where('isOrdered', '==', false),
      orderBy('createdAt', 'desc'),
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
        totalOrderRef.current = datas.reduce((acc, curr) => (acc += curr.price), 0);
        setOrdered(datas);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [filterOptions]);

  return (
    <div className="px-10 py-5 flex flex-col gap-3">
      {dish?.isLock ? (
        <div className="text-lg text-center font-semibold pt-20">Đơn hàng đã được đặt</div>
      ) : (
        <>
          <div className="flex justify-between items-center sticky top-[56px] py-5 bg-white">
            <p>
              Tổng giá tiền:{' '}
              <span className="font-mono font-semibold pl-1">
                {formatPrice(totalOrderRef.current || 0)}
              </span>{' '}
              / {ordered.length} đơn
            </p>

            <Button text="Đặt hàng" disabled={!ordered.length} onClick={() => setIsOpen(true)} />
          </div>
          {ordered.map((orderInfo) => (
            <div className="p-5 rounded-xl bg-gray-100" key={orderInfo.uid}>
              <div className="flex justify-between py-2 border-b border-gray-400">
                <div className="">
                  Tên:{' '}
                  <span className="font-mono font-semibold pl-1">
                    {orderInfo.userInfo.displayName}
                  </span>
                </div>
                <div>
                  Đơn giá:{' '}
                  <span className="font-mono font-semibold pl-1">
                    {formatPrice(orderInfo.price)}
                  </span>
                </div>
              </div>
              {orderInfo.dishs.map((dishName, i) => (
                <OrderItem value={dishName} key={i} />
              ))}
            </div>
          ))}
        </>
      )}
      <Modal
        title="Xác nhận đặt đơn hàng"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={handleOrder}
      />
    </div>
  );
};

export default AdminOrder;
