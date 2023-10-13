import React, { useEffect, useLayoutEffect } from 'react';
import { Navigate, useNavigate, useOutletContext } from 'react-router-dom';
import { formatPrice } from '../../../../utils/formation';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';

const OrderInfo = () => {
  const navigate = useNavigate();
  const { orderInfo } = useOutletContext();
  const handleEditOrder = () => {
    navigate('edit');
  };

  useEffect(() => {
    if (!orderInfo) navigate('create', { replace: true });
  }, []);
  console.log(orderInfo);
  return (
    <div>
      {orderInfo?.isOrdered ? (
        <div className="flex flex-col justify-center items-center font-mono">
          <img
            className="h-40"
            src="https://statics.pancake.vn/web-media/95/d8/ce/12/162091a0dd4a470ad12d8949feb44833806d5f8c09f2020c11e4e70b.png"
            alt=""
          />
          Đã đặt hành thành công
        </div>
      ) : (
        <>
          <h3 className="text-md font-semibold pb-5">Món đã chọn</h3>
          <div className="w-full p-5 rounded-lg bg-gray-100">
            {orderInfo?.dishs?.map((dishName, i) => (
              <div key={i} className="font-mono font-semibold py-1 text-sm">
                - {dishName}
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-gray-200 my-3" />
          <div className="text-sm text-right">
            Giá tiền :{' '}
            <span className="font-mono font-semibold">{formatPrice(orderInfo?.price)}</span>
          </div>
          <Button text="Sửa món" cls="float-right mt-5" onClick={handleEditOrder} />
        </>
      )}
    </div>
  );
};

export default OrderInfo;
