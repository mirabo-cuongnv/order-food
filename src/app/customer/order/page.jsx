"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

import OrderForm from "../components/order/OrderForm";
import { AuthProviderContext } from "../../../shared/context/AuthProvider";
import { addDocumentAutoID } from "../../../shared/lib/firebase/service";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../shared/lib/firebase/config";

const OrderCreate = () => {
  const priceOrderRef = useRef();
  const router = useRouter();
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
    if (balance < priceOrderRef.current) return alert("Số dự không đủ!");

    addDocumentAutoID(
      {
        dishs: allchecked,
        user: user?.uid,
        userInfo: {
          ...user,
          balance,
        },
        price: priceOrderRef.current,
        orderDate: dayjs().format("DD/MM/YYYY"),
        isOrdered: false,
      },
      "orders"
    )
      .then(() => router.push("/customer/order-info"))
      .catch(() => console.log("Loi"))
      .finally(() => setIsOpen(false));
  };

  const handlePayment = () => {
    if (!allchecked.length) return alert("Vui lòng chọn món");
    if (!priceOrderRef.current) return alert("Nhập giá xuất ăn");
    setIsOpen(true);
  };

  const handleChangeMoney = ({ floatValue }) => {
    priceOrderRef.current = floatValue;
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
        router.push("/customer/order-info");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  return (
    <div>
      {dish?.isLock ? (
        <div className="text-lg text-center pt-10 font-semibold">
          Admin đã đặt hàng
        </div>
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
