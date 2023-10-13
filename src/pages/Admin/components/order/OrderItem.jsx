import React from 'react';

const OrderItem = ({ value }) => {
  return <div className="font-mono font-semibold py-1 text-sm">- {value}</div>;
};

export default OrderItem;
