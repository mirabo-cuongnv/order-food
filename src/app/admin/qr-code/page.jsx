"use client";

import React, { useEffect, useState } from "react";
import Button from "../../../shared/components/Button";
import Modal from "../../../shared/components/Modal";
import Select from "../../../shared/components/Select";
import TextField from "../../../shared/components/TextField";
import { getValuesInform } from "../../../shared/utils/functions";
import { addDocument } from "../../../shared/lib/firebase/service";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../shared/lib/firebase/config";

const AdminQA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [QACodeInfo, setQACodeInfo] = useState([]);

  const handleCreateQAInfo = (e) => {
    e.preventDefault();

    const payload = getValuesInform(e.target);

    addDocument(
      "admin-create",
      {
        ...payload,
        bankId: payload.bankId.split("-")[0],
        name: payload.bankId.split("-")[1],
      },
      "qaCode"
    )
      .then(() => {
        console.log("OK");
      })
      .catch(() => console.log("tao that bai"))
      .finally(() => setIsOpen(false));
  };

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_BANKS)
      .then((data) => data.json())
      .then((res) => {
        const formatDataBanks = res.data.map((bank) => ({
          id: bank.id,
          name: bank.shortName,
          value: `${bank.code}-${bank.shortName}`,
        }));

        setBanks(formatDataBanks);
      });
  }, []);

  useEffect(() => {
    const q = query(collection(db, "qaCode"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push(doc.data());
      });

      setQACodeInfo(datas[0]);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex items-center justify-center flex-col p-5">
      {QACodeInfo?.accountNo ? (
        <>
          <div className="rounded-lg overflow-hidden mb-20 text-center">
            <h3 className="text-lg font-semibold">Thông tin tài khoản</h3>
            <p>
              Ngân hàng:{" "}
              <span className="font-mono text-lg font-semibold">
                {QACodeInfo.name}
              </span>
            </p>
            <p className="text-md">
              Số tài khoản:{" "}
              <span className="font-mono text-lg font-semibold">
                {QACodeInfo.accountNo}
              </span>
            </p>
          </div>

          <Button text="Cập nhật QA code" onClick={() => setIsOpen(true)} />
        </>
      ) : (
        <Button text="Tạo thông tin QA code" onClick={() => setIsOpen(true)} />
      )}
      <Modal
        isOpen={isOpen}
        title="Nhập thông tin ngân hàng"
        content={
          <div className="px-6">
            <Select label="Ngân hàng" options={banks || []} name="bankId" />
            <TextField
              label="Số tài khoản"
              cls="mb-5"
              name="accountNo"
              required
            />
            <TextField
              label="Nội dung chuyển khoản"
              value="CK cơm"
              name="addInfo"
              readOnly
            />
          </div>
        }
        onSave={handleCreateQAInfo}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default AdminQA;
