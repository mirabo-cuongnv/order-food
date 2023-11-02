"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import OrderForm from "../components/order/OrderForm";
import { AuthProviderContext } from "../../../shared/context/AuthProvider";
import { updateDocment } from "../../../shared/lib/firebase/service";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../shared/lib/firebase/config";
import dayjs from "dayjs";

const OrderEdit = () => {
  const router = useRouter();
  const [ordered, setOrdered] = useState(null);
  const { dish, balance, user } = useContext(AuthProviderContext);

  const [isOpen, setIsOpen] = useState();
  const [allchecked, setAllChecked] = useState([]);
  const priceOrderRef = useRef();

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

    updateDocment(
      ordered.uid,
      { dishs: allchecked, price: priceOrderRef.current },
      "orders"
    )
      .then(() => router.push("/customer/order-info"))
      .catch(() => console.log("Loi"))
      .finally(() => setIsOpen(false));
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
        setOrdered(datas[0]);
        setAllChecked(datas[0]?.dishs);
        priceOrderRef.current = datas[0]?.price;
      } else {
        router.push("/customer/order");
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);
  console.log(dish);
  return (
    <OrderForm
      balance={balance}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      totalPrice={priceOrderRef.current}
      dish={dish?.dishValue}
      valuesDish={allchecked || []}
      onPayment={handlePayment}
      onChangePrice={handleChangeMoney}
      onChangeCheckBox={handleChange}
      onOrder={handleUpdateOrder}
    />
  );
};

export default OrderEdit;
