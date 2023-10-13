import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';

import { db } from '../../lib/firebase/config';
import { STATE_PAYMENT } from '../../constant/status';
import Empty from '../../components/Empty';
import DepositHistory from '../Customer/components/DepositHistory';
import IconRequest from '../../assets/IconRequest';
import IconError from '../../assets/IconError';
import IconTranfer from '../../assets/IconTranfer';

const AdminHistoryDeposit = () => {
  const [historyPayments, setHistoryPayments] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, 'payments'),
      where('status', 'in', [STATE_PAYMENT.CONFIRM, STATE_PAYMENT.REJECT]),
      orderBy('updatedAt', 'desc'),
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push(doc.data());
      });
      setHistoryPayments(datas);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="mt-10 h-full p-5">
      <h3 className="text-lg font-medium text-gray-700 pb-5 border-b-2">Lịch sử giao dịch</h3>

      {historyPayments.length ? (
        <>
          {historyPayments.map((payment, i) => (
            <DepositHistory
              key={i}
              payment={payment}
              iconSuccess={<IconTranfer cls="w-4 h-4" />}
              iconRequest={<IconRequest />}
              iconError={<IconError />}
            />
          ))}
        </>
      ) : (
        <Empty textEmpty="Chưa có giao dịch" />
      )}
    </div>
  );
};

export default AdminHistoryDeposit;
