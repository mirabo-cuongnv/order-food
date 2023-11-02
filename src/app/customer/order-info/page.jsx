"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatPrice } from "../../../shared/utils/formation";
import Button from "../../../shared/components/Button";
import { AuthProviderContext } from "../../../shared/context/AuthProvider";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import dayjs from "dayjs";
import { db } from "../../../shared/lib/firebase/config";

const OrderInfo = () => {
  const router = useRouter();
  const { user } = useContext(AuthProviderContext);
  const [ordered, setOrdered] = useState(null);

  const handleEditOrder = () => {
    router.push("order-edit");
  };

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      where("user", "==", user?.uid),
      where("orderDate", "==", dayjs().format("DD/MM/YYYY"))
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push({
          uid: doc.id,
          ...doc.data(),
        });
      });

      if (datas.length) {
        setOrdered(datas[0]);
      } else {
        router.push("/customer/order");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  return (
    <div className="px-5 pt-10">
      {ordered?.isOrdered ? (
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
            {ordered?.dishs?.map((dishName, i) => (
              <div key={i} className="font-mono font-semibold py-1 text-sm">
                - {dishName}
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-gray-200 my-3" />
          <div className="text-sm text-right">
            Giá tiền :{" "}
            <span className="font-mono font-semibold">
              {formatPrice(ordered?.price)}
            </span>
          </div>
          <Button
            text="Sửa món"
            cls="float-right mt-5"
            onClick={handleEditOrder}
          />
        </>
      )}
    </div>
  );
};

export default OrderInfo;
