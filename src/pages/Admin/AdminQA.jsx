import React, { useEffect, useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Select from '../../components/Select';
import TextField from '../../components/TextField';
import { getValuesInform } from '../../utils/functions';
import { TEMPLATE_QA_CODE } from '../../constant/template';
import { addDocument, getDocment } from '../../lib/firebase/service';

const AdminQA = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [QACodeInfo, setQACodeInfo] = useState([]);

  const handleCreateQAInfo = (e) => {
    e.preventDefault();

    const payload = getValuesInform(e.target);

    addDocument(
      'admin-create',
      { ...payload, bankId: payload.bankId.split('-')[0], name: payload.bankId.split('-')[1] },
      'qaCode',
    )
      .then(() => {
        console.log('OK');
      })
      .catch(() => console.log('tao that bai'))
      .finally(() => setIsOpen(false));
  };

  useEffect(() => {
    fetch(import.meta.env.VITE_API_BANKS)
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
    getDocment('admin-create', 'qaCode')
      .then((res) => {
        setQACodeInfo(res);
      })
      .catch(() => console.log('tao that bai'));
  }, []);

  return (
    <div className="flex items-center justify-center flex-col p-5">
      {QACodeInfo?.accountNo ? (
        <>
          <div className="rounded-lg overflow-hidden mb-20 text-center">
            <h3 className="text-lg font-semibold">Thông tin tài khoản</h3>
            <p>
              Ngân hàng: <span className="font-mono text-lg font-semibold">{QACodeInfo.name}</span>
            </p>
            <p className="text-md">
              Số tài khoản:{' '}
              <span className="font-mono text-lg font-semibold">{QACodeInfo.accountNo}</span>
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
            <TextField label="Số tài khoản" cls="mb-5" name="accountNo" required />
            <TextField label="Nội dung chuyển khoản" value="CK cơm" name="addInfo" readOnly />
          </div>
        }
        onSave={handleCreateQAInfo}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default AdminQA;
