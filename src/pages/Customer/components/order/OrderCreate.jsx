import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import OrderForm from './OrderForm';
import { AuthProviderContext } from '../../../../context/AuthProvider';
import { addDocumentAutoID } from '../../../../lib/firebase/service';

const OrderCreate = () => {
  const priceOrderRef = useRef();
  const navigate = useNavigate();
  const { dish, balance, user } = useContext(AuthProviderContext);
  const [isOpen, setIsOpen] = useState();
  const [allchecked, setAllChecked] = useState([]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setAllChecked([...allchecked, e.target.value]);
    } else {
      setAllChecked(allchecked.filter((item) => item !== e.target.value));
    }
  };

  const handleOrder = (e) => {
    e.preventDefault();
    if (balance < priceOrderRef.current) return alert('Số dự không đủ!');

    addDocumentAutoID(
      {
        dishs: allchecked,
        user: user?.uid,
        userInfo: {
          ...user,
          balance,
        },
        price: priceOrderRef.current,
        orderDate: dayjs().format('DD/MM/YYYY'),
        isOrdered: false,
      },
      'orders',
    )
      .then(() => navigate('..'))
      .catch(() => console.log('Loi'))
      .finally(() => setIsOpen(false));
  };

  const handlePayment = () => {
    setIsOpen(true);
  };

  const handleChangeMoney = ({ floatValue }) => {
    priceOrderRef.current = floatValue;
  };

  return (
    <div>
      {dish?.isLock ? (
        <div className="text-lg text-center pt-10 font-semibold">Admin đã đặt hàng</div>
      ) : (
        <>
          {dish?.dishValue ? (
            <OrderForm
              balance={balance}
              dish={dish?.dishValue}
              totalPrice={priceOrderRef.current}
              valuesDish={allchecked}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              onChangeCheckBox={handleChange}
              onChangePrice={handleChangeMoney}
              onPayment={handlePayment}
              onOrder={handleOrder}
            />
          ) : (
            <>No data</>
          )}
        </>
      )}
    </div>
  );
};

export default OrderCreate;
