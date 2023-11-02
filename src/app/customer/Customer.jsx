import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";

const Customer = () => {
  const navigate = useNavigate();
  const classBtn = "py-3 px-20";

  const handleOrder = () => {
    navigate("order");
  };

  const handleDiposit = () => {
    navigate("wallet");
  };

  const post = async () => {
    const a = await axios.post("http://localhost:3000/api/alert", {
      title: "title day",
      message: "message ne",
      url: "https://order-food-six.vercel.app",
    });
    console.log(a);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-5">
        <Button text="Đặt món" cls={classBtn} onClick={handleOrder} />
        <Button text="Ví" cls={classBtn} onClick={handleDiposit} />
      </div>
    </div>
  );
};

export default Customer;
