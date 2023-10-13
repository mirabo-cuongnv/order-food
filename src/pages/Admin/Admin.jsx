import React from 'react';
import Layout from '../../layouts/Layout';
import Button from '../../components/Button';
import { Outlet, useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const classBtn = 'py-3 px-5';

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-2 gap-5">
        <Button text="Thêm món" cls={classBtn} onClick={() => handleNavigate('add')} />
        <Button
          text="Cập nhật QA nạp tiền"
          cls={classBtn}
          onClick={() => handleNavigate('qa-code')}
        />
        <Button
          text="Xác nhận nạp tiền"
          cls={classBtn}
          onClick={() => handleNavigate('diposit-confirm')}
        />
        <Button text="Lịch sử nạp tiền" cls={classBtn} onClick={() => handleNavigate('history')} />
        <Button
          text="Quản lý người dùng"
          cls={classBtn}
          onClick={() => handleNavigate('customer')}
        />
        <Button text="Đơn đặt hàng" cls={classBtn} onClick={() => handleNavigate('ordered')} />
      </div>
    </div>
  );
};

export default Admin;
