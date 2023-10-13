import React, { useEffect, useRef, useState } from 'react';
import { collection, onSnapshot, query, serverTimestamp } from 'firebase/firestore';
import { NumericFormat } from 'react-number-format';

import { db } from '../../lib/firebase/config';
import { formatPrice } from '../../utils/formation';
import { addDocumentAutoID, updateDocment } from '../../lib/firebase/service';
import { getValuesInform } from '../../utils/functions';
import { STATE_PAYMENT } from '../../constant/status';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';

const AdminManagerCustomer = () => {
  const balanceRef = useRef();
  const totalBalanceRef = useRef();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);

  const handleChangeDepositAmount = ({ floatValue }) => {
    balanceRef.current = floatValue;
  };

  const handleUpdateBalance = () => {
    return updateDocment(
      customerInfo.uid,
      { balance: customerInfo.balance + balanceRef.current },
      'wallet',
    )
      .then(() => true)
      .catch(() => false)
      .finally(() => setIsOpen(false));
  };

  const handleCreatePayment = (note) => {
    return addDocumentAutoID(
      {
        amount: balanceRef.current,
        status:
          balanceRef.current < 0
            ? STATE_PAYMENT.ADMIN_UPDATE_WITHDRAW
            : STATE_PAYMENT.ADMIN_UPDATE_DEP,
        user: customerInfo.uid,
        userInfo: customerInfo,
        note,
        balance: customerInfo.balance,
        updatedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
      },
      'payments',
    )
      .then(() => true)
      .catch(() => false)
      .finally(() => setIsOpen(false));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!customerInfo) return alert('Loi');

    const { note } = getValuesInform(e.target);
    handleCreatePayment(note)
      .then((status) => {
        if (!status) return;

        handleUpdateBalance().then(() => alert('Cập nhật thành công'));
      })
      .catch((e) => alert('Loi', e));
  };

  const handleOpenModal = (customerInfo) => {
    setCustomerInfo(customerInfo);
    setIsOpen(true);
  };

  useEffect(() => {
    const q = query(collection(db, 'wallet'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push({
          uid: doc.id,
          ...doc.data(),
        });
      });

      if (datas.length) {
        totalBalanceRef.current = datas.reduce((acc, curr) => (acc += curr.balance), 0);

        setLoading(false);
        setCustomers(datas);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="p-10">
      {loading ? (
        <>loading...</>
      ) : (
        <>
          <h1 className="text-base font-semibold">Thông tin khách hàng</h1>
          <div className="flex items-center justify-between text-md py-5 bg-white sticky top-0">
            <div>Số lượng: {customers.length}</div>
            <div>
              Tổng số dư{' '}
              <span className="font-mono font-semibold">
                {formatPrice(totalBalanceRef.current)}
              </span>
            </div>
          </div>
          {customers.map((customerInfo) => (
            <div
              key={customerInfo.uid}
              className="md:flex items-center justify-between p-3 rounded-lg bg-gray-100 mt-5"
            >
              <div>
                <p>{customerInfo.displayName}</p>
                <p className="text-sm">Email: {customerInfo.email}</p>
                <p className="text-sm">
                  Số dư:{' '}
                  <span className="font-mono font-semibold">
                    {formatPrice(customerInfo.balance)}
                  </span>
                </p>
              </div>
              <div>
                <Button text="Cập nhật số dư" onClick={() => handleOpenModal(customerInfo)} />
              </div>
            </div>
          ))}
          <Modal
            isOpen={isOpen}
            title="Cập nhật"
            content={
              <div className="px-10">
                <p className="text-base text-gray-900 pb-2">Nhập số tiền (cộng, trừ)</p>
                <NumericFormat
                  value={0}
                  allowLeadingZeros
                  thousandSeparator=","
                  suffix=" VND"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onValueChange={handleChangeDepositAmount}
                  valueIsNumericString
                />

                <label className="py-3 block">
                  <span className="py-3 block">Nội dung</span>
                  <TextArea name="note" />
                </label>
              </div>
            }
            onClose={() => setIsOpen(false)}
            onSave={handleUpdate}
          />
        </>
      )}
    </div>
  );
};

export default AdminManagerCustomer;
