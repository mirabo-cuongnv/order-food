import React from 'react';
import Button from '../../../components/Button';
import { formatPrice } from '../../../utils/formation';

const AdminDepositItem = ({ infoRequestPayment, onConfirmDeposit, onRejectDeposit }) => {
  return (
    <div className="bg-slate-100 flex justify-between gap-2 items-center rounded px-3 py-1 mt-5">
      <div className="text-sm">
        <h3>
          Yêu cầu nạp tiền từ:{' '}
          <span className="font-mono text-md font-semibold">
            {infoRequestPayment.userInfo.displayName}
          </span>
        </h3>
        <p className="text-sm">
          Số tiền:{' '}
          <span className="font-mono text-md font-semibold">
            {formatPrice(infoRequestPayment.amount)}
          </span>
        </p>
      </div>
      <div className="flex gap-3 flex-shrink-0">
        <Button
          text="Xác nhận"
          cls="bg-green-400 text-white"
          onClick={() => onConfirmDeposit(infoRequestPayment.uid, infoRequestPayment)}
        />
        <Button
          text="Từ chối"
          cls="bg-red-400 text-white"
          onClick={() => onRejectDeposit(infoRequestPayment.uid)}
        />
      </div>
    </div>
  );
};

export default AdminDepositItem;
