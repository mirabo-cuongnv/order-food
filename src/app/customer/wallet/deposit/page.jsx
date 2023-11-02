"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useRouter } from "next/navigation";

import Button from "../../../../shared/components/Button";
import Modal from "../../../../shared/components/Modal";
import {
  addDocumentAutoID,
  getDocment,
} from "../../../../shared/lib/firebase/service";
import { STATE_PAYMENT } from "../../../../shared/constant/status";
import { AuthProviderContext } from "../../../../shared/context/AuthProvider";
import { TEMPLATE_QA_CODE_V2 } from "../../../../shared/constant/template";

const CustomerDeposit = () => {
  const router = useRouter();
  const depositAmountRef = useRef(0);
  const { user, balance } = useContext(AuthProviderContext);
  const [isOpen, setIsOpen] = useState(false);
  const [qaCode, setQaCode] = useState(null);

  const handleRequestDisposit = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleChangeDepositAmount = (e) => {
    depositAmountRef.current = e.floatValue;
  };

  const handleConfirmDeposit = (e) => {
    e.preventDefault();

    addDocumentAutoID(
      {
        amount: depositAmountRef.current,
        status: STATE_PAYMENT.REQUEST,
        user: user.uid,
        userInfo: {
          displayName: user.displayName,
        },
        balance,
      },
      "payments"
    )
      .then(() => {
        setIsOpen(false);
      })
      .catch(() => console.log("tao that bai"))
      .finally(() => router.push("customer/wallet"));
  };

  useEffect(() => {
    getDocment("admin-create", "qaCode")
      .then((res) => {
        const createQRCode = `${import.meta.env.VITE_API_QA_CODE}/${
          res.bankId
        }-${res.accountNo}-${TEMPLATE_QA_CODE_V2}.png`;

        setQaCode(createQRCode);
      })
      .catch(() => console.log("Loi"));
  }, []);

  return (
    <div className="p-10 flex flex-col gap-5 h-[644px]">
      {!isOpen && (
        <div className="flex-1">
          <p className="text-base text-gray-900">Nhập số tiền</p>
          <NumericFormat
            value={depositAmountRef.current}
            allowLeadingZeros
            thousandSeparator=","
            suffix=" VND"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onValueChange={handleChangeDepositAmount}
            valueIsNumericString
          />
          <Button text="Thanh toán" onClick={handleRequestDisposit} />
        </div>
      )}

      <Modal
        title="Mã QR thanh toán"
        isOpen={isOpen}
        onClose={handleClose}
        onSave={handleConfirmDeposit}
        content={
          <div className="mx-auto w-[450px] h-[450px] overflow-hidden">
            {qaCode ? (
              <img
                src={`${qaCode}?amount=${depositAmountRef.current}`}
                alt=""
                className="w-full h-full object-contain"
              />
            ) : (
              "Admin chưa cập nhật mã QR"
            )}
          </div>
        }
        textSave="Xác nhận"
        textClose="Đóng"
      />
    </div>
  );
};

export default CustomerDeposit;
