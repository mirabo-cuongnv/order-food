"use client";

import { useRouter } from "next/navigation";
import Button from "../../shared/components/Button";

const Admin = () => {
  const router = useRouter();
  const classBtn = "py-3 px-5";

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-5">
        <Button
          text="Thêm món"
          cls={classBtn}
          onClick={() => handleNavigate("admin/add-food")}
        />
        <Button
          text="Cập nhật QA nạp tiền"
          cls={classBtn}
          onClick={() => handleNavigate("admin/qr-code")}
        />
        <Button
          text="Xác nhận nạp tiền"
          cls={classBtn}
          onClick={() => handleNavigate("admin/deposit-confirm")}
        />
        <Button
          text="Lịch sử nạp tiền"
          cls={classBtn}
          onClick={() => handleNavigate("admin/history")}
        />
        <Button
          text="Quản lý người dùng"
          cls={classBtn}
          onClick={() => handleNavigate("admin/customer")}
        />
        <Button
          text="Đơn đặt hàng"
          cls={classBtn}
          onClick={() => handleNavigate("admin/ordered")}
        />
      </div>
    </div>
  );
};

export default Admin;
