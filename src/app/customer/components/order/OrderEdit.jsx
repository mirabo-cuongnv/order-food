import React, { useContext, useRef, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

import OrderForm from './OrderForm';
import { AuthProviderContext } from '../../../../context/AuthProvider';
import { updateDocment } from '../../../../lib/firebase/service';

const OrderEdit = () => {
  const navigate = useNavigate();
  const { dish, balance } = useContext(AuthProviderContext);
  const { orderInfo } = useOutletContext();
  const [isOpen, setIsOpen] = useState();
  const [allchecked, setAllChecked] = useState(orderInfo.dishs);
  const priceOrderRef = useRef(orderInfo.price);

  const handleChange = (e) => {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  };

  const handlePayment = () => {
    setIsOpen(true);
  };

  const handleUpdateOrder = (e) => {
    e.preventDefault();

    updateDocment(orderInfo.uid, { dishs: allchecked, price: priceOrderRef.current }, 'orders')
      .then(() => navigate('..'))
      .catch(() => console.log('Loi'))
      .finally(() => setIsOpen(false));
  };

  const handleChangeMoney = ({ floatValue }) => {
    priceOrderRef.current = floatValue;
  };

  return (
    <OrderForm
      balance={balance}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      totalPrice={priceOrderRef.current}
      dish={dish}
      valuesDish={allchecked}
      onPayment={handlePayment}
      onChangePrice={handleChangeMoney}
      onChangeCheckBox={handleChange}
      onOrder={handleUpdateOrder}
    />
  );
};

export default OrderEdit;
