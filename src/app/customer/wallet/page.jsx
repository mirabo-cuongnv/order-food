"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";

import { db } from "../../../shared/lib/firebase/config";
import { AuthProviderContext } from "../../../shared/context/AuthProvider";
import { formatPrice } from "../../../shared/utils/formation";
import Button from "../../../shared/components/Button";
import Empty from "../../../shared/components/Empty";
import DepositHistory from "../components/DepositHistory";
import IconPlus from "../../../shared/assets/IconPlus";
import IconRequest from "../../../shared/assets/IconRequest";
import IconError from "../../../shared/assets/IconError";
import IconMinus from "../../../shared/assets/IconMinus";

const CustomerWallet = () => {
  const router = useRouter();
  const { user, balance } = useContext(AuthProviderContext);
  const [historyPayments, setHistoryPayments] = useState([]);
  const clsButton = "px-8 py-2 shadow-md";

  const handleDeposit = () => {
    router.push("wallet/deposit");
  };

  useEffect(() => {
    const q = query(
      collection(db, "payments"),
      where("user", "==", user?.uid),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push(doc.data());
      });
      setHistoryPayments(datas);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  return (
    <div className="p-10 h-full">
      <div className="flex flex-col items-center justify-center">
        <h3 className="text-xl font-medium text-center">
          Số dư{" "}
          <span className="text-2xl font-bold font-mono pl-3">
            {formatPrice(balance || 0)}
          </span>
        </h3>

        <div className="grid grid-cols-2 gap-3 mt-10">
          <Button text="Nạp tiền" cls={clsButton} onClick={handleDeposit} />
          <Button text="Rút tiền" cls={clsButton} />
        </div>
      </div>

      <div className="mt-10 p-5">
        <h3 className="text-lg font-medium text-gray-700 pb-5 border-b-2">
          Lịch sử nạp
        </h3>

        {historyPayments.length ? (
          <>
            {historyPayments.map((payment, i) => (
              <DepositHistory
                key={i}
                payment={payment}
                iconOrder={<IconMinus />}
                iconSuccess={<IconPlus cls="w-4 h-4" />}
                iconRequest={<IconRequest />}
                iconError={<IconError />}
              />
            ))}
          </>
        ) : (
          <Empty textEmpty="Chưa có giao dịch" />
        )}
      </div>
    </div>
  );
};

export default CustomerWallet;
