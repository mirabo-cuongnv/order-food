import React from 'react';
import { formatDate, formatPrice } from '../../../utils/formation';
import { getKeyByValue } from '../../../utils/functions';
import { STATE_PAYMENT, STATE_PAYMENT_CUSTOMER_VI } from '../../../constant/status';

const DepositHistory = ({ payment, iconSuccess, iconRequest, iconError, iconOrder }) => {
  let status;
  let clsStatus;
  if (
    payment.status === STATE_PAYMENT.CONFIRM ||
    payment.status === STATE_PAYMENT.ADMIN_UPDATE_DEP
  ) {
    clsStatus = 'text-green-500';
    status = iconSuccess;
  } else if (payment.status === STATE_PAYMENT.REQUEST) {
    clsStatus = 'text-gray-500';
    status = iconRequest;
  } else if (
    payment.status === STATE_PAYMENT.PAYMENT_ORDER ||
    payment.status === STATE_PAYMENT.ADMIN_UPDATE_WITHDRAW
  ) {
    clsStatus = 'text-green-500';
    status = iconOrder;
  } else if (payment.status === STATE_PAYMENT.REJECT) {
    clsStatus = 'text-red-500';
    status = iconError;
  }

  return (
    <div className="flex justify-between items-center p-2 px-3 border-b mt-2 font-mono">
      <p className="flex items-center gap-2">
        {status} {formatPrice(payment.amount)} /{' '}
        <span className="text-xs text-gray-600">{formatDate(payment.createdAt.seconds)}</span>
      </p>
      <p className={`p-2 font-mono text-sm font-bold ${clsStatus}`}>
        {STATE_PAYMENT_CUSTOMER_VI[getKeyByValue(STATE_PAYMENT, payment.status)]}
      </p>
    </div>
  );
};

export default DepositHistory;
