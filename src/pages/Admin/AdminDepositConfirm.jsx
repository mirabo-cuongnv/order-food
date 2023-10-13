import React, { useEffect, useRef, useState } from 'react';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../lib/firebase/config';
import { STATE_PAYMENT } from '../../constant/status';
import { updateDocment } from '../../lib/firebase/service';
import AdminDepositItem from './components/AdminDepositItem';
import Modal from '../../components/Modal';
import TextArea from '../../components/TextArea';
import Empty from '../../components/Empty';

const AdminDepositConfirm = () => {
  const rejectNoteRef = useRef();
  const [paymentsConfirm, setPaymentsConfirm] = useState([]);
  const [isConfirmDeposit, setIsConfirmDeposit] = useState(false);
  const [isRejectDeposit, setIsRejectDeposit] = useState(false);
  const [idPaymentRequest, setIdPaymentRequest] = useState();
  const [balanceInfo, setBalanceInfo] = useState();

  const handleSetIsConfirmDeposit = (idPayment, inforPayments) => {
    setIsConfirmDeposit(true);
    setIdPaymentRequest(idPayment);
    setBalanceInfo(inforPayments);
  };

  const handleSetIsRejectDeposit = (idPayment) => {
    setIsRejectDeposit(true);
    setIdPaymentRequest(idPayment);
  };

  const handleConfirmDeposit = (e) => {
    e.preventDefault();

    updateDocment(idPaymentRequest, { status: STATE_PAYMENT.CONFIRM }, 'payments')
      .then(() =>
        updateDocment(
          balanceInfo.user,
          { balance: balanceInfo.balance + balanceInfo.amount },
          'wallet',
        )
          .then(() => console.log('OK'))
          .catch(() => console.log('loi')),
      )
      .catch(() => console.log('loi'))
      .finally(() => {
        setIsConfirmDeposit(false);
      });
  };

  const handleRejectDeposit = (e) => {
    e.preventDefault();

    updateDocment(
      idPaymentRequest,
      { status: STATE_PAYMENT.REJECT, note: rejectNoteRef.current },
      'payments',
    )
      .then(() => console.log('OK'))
      .catch(() => console.log('loi'))
      .finally(() => {
        rejectNoteRef.current = '';
        setIsRejectDeposit(false);
      });
  };

  useEffect(() => {
    const q = query(collection(db, 'payments'), where('status', '==', STATE_PAYMENT.REQUEST));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push({ uid: doc.id, ...doc.data() });
      });
      setPaymentsConfirm(datas);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="p-10">
      {!paymentsConfirm.length ? (
        <Empty textEmpty="No data" />
      ) : (
        paymentsConfirm.map((paymentInfo) => (
          <AdminDepositItem
            key={paymentInfo.uid}
            infoRequestPayment={paymentInfo}
            onConfirmDeposit={handleSetIsConfirmDeposit}
            onRejectDeposit={handleSetIsRejectDeposit}
          />
        ))
      )}

      <Modal
        title="Từ chối nạp tiền"
        isOpen={isRejectDeposit}
        content={
          <div className="px-6">
            <p className="text-gray-900 mb-5 font-semibold">Lý do từ chối</p>
            <TextArea onChange={(e) => (rejectNoteRef.current = e.target.value)} />
          </div>
        }
        onClose={() => setIsRejectDeposit(false)}
        onSave={handleRejectDeposit}
      />
      <Modal
        title="Xác nhận nạp tiền"
        isOpen={isConfirmDeposit}
        content={<div className="px-6">Kiểm tra kỹ khi xác nhận</div>}
        onClose={() => setIsConfirmDeposit(false)}
        onSave={handleConfirmDeposit}
      />
    </div>
  );
};

export default AdminDepositConfirm;
