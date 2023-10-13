import React from 'react';
import { NumericFormat } from 'react-number-format';

import Checkbox from '../../../../components/Checkbox';
import TextArea from '../../../../components/TextArea';
import Button from '../../../../components/Button';
import Modal from '../../../../components/Modal';
import { formatPrice } from '../../../../utils/formation';

const OrderForm = ({
  dish,
  balance,
  totalPrice,
  valuesDish,
  isOpen,
  setIsOpen,
  onChangeCheckBox,
  onPayment,
  onChangePrice,
  onOrder,
}) => {
  return (
    <div className="p-10 pb-20 overflow-auto">
      <div className="grid grid-cols-2 grid-rows-6 gap-1 max-h-[400px] h-[400px] overflow-auto">
        {dish.map((dishName, index) => (
          <div key={index}>
            <Checkbox
              value={dishName}
              label={dishName}
              name={dishName}
              id={index}
              onChange={onChangeCheckBox}
              checked={valuesDish.includes(dishName)}
            />
          </div>
        ))}
      </div>
      <TextArea value={valuesDish} row={6} cls="my-5" readOnly />
      <div className="flex-1">
        <p className="text-base text-gray-900">Xuất ăn giá</p>
        <NumericFormat
          allowLeadingZeros
          thousandSeparator=","
          suffix=" VND"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          valueIsNumericString
          value={totalPrice}
          onValueChange={onChangePrice}
        />
        <Button text="Thanh toán" cls="mt-5" onClick={onPayment} />
      </div>
      <Modal
        isOpen={isOpen}
        title="Xác nhận đơn hàng"
        content={
          <div className="px-6 grid grid-cols-1 gap-2">
            {valuesDish.map((dishName, i) => (
              <p className="w-full px-5 py-2 text-sm rounded bg-gray-100" key={i}>
                {dishName}
              </p>
            ))}
            <div className="h-[1px] bg-gray-200 my-3" />
            <div className="text-sm text-right">
              Giá tiền : <span className="font-mono font-semibold">{formatPrice(totalPrice)}</span>
            </div>
            {!balance && (
              <div className="text-sm text-right">
                Số dư :{' '}
                <span className="font-mono font-semibold text-red-500">{formatPrice(balance)}</span>
              </div>
            )}
          </div>
        }
        textSave="Đặt"
        onSave={onOrder}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default OrderForm;
