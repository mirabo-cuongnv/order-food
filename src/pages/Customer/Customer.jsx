import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const Customer = () => {
  const navigate = useNavigate();
  const classBtn = 'py-3 px-20';

  const handleOrder = () => {
    navigate('order');
  };

  const handleDiposit = () => {
    navigate('wallet');
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-5">
        <Button text="Đặt món" cls={classBtn} onClick={handleOrder} />
        <Button text="Ví" cls={classBtn} onClick={handleDiposit} />
      </div>
    </div>
  );
};

export default Customer;
