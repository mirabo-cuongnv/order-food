'use client';

import React, { useContext, useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import dayjs from 'dayjs';
import axios from 'axios';

import Button from '../../../shared/components/Button';
import Modal from '../../../shared/components/Modal';
import TextArea from '../../../shared/components/TextArea';
import { addDocument, addDocumentAutoID } from '../../../shared/lib/firebase/service';
import { db } from '../../../shared/lib/firebase/config';
import { AuthProviderContext } from '../../../shared/context/AuthProvider';

const AdminCreateDish = () => {
  const { user } = useContext(AuthProviderContext);
  const [isOpen, setIsOpen] = useState();
  const [dishs, setDishs] = useState([]);

  const handleCreate = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { dish } = Object.fromEntries(formData);
    const payload = dish.split('\n').map((food) => `\n${food}`);
    // if (!dishs?.length) {
    //   await axios.post("/api/alert", {
    //     message: "Có cơm rồi mau vào đặt thôi",
    //     title: "Mirabo food",
    //   });
    // }
    // if (!dishs.length) return;

    addDocument(
      'foodName',
      {
        dishValue: payload,
        isLock: false,
        orderDate: `${dayjs().format('DD/MM/YYYY')}`,
      },
      'dish',
    )
      .then(() => {
        setIsOpen(false);
        setDishs(payload);
      })
      .catch(() => console.log('tao that bai'));
  };

  useEffect(() => {
    const q = query(collection(db, 'dish'), where('orderDate', '==', dayjs().format('DD/MM/YYYY')));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const datas = [];
      querySnapshot.forEach((doc) => {
        datas.push({
          uid: doc.id,
          ...doc.data(),
        });
      });

      if (datas.length) {
        setDishs(datas[0]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user?.uid]);

  return (
    <div className="p-5">
      {dishs?.isLock ? (
        <div className="text-lg font-semibold text-center pt-20">Bạn đã đặt hàng ngày hôm nay</div>
      ) : (
        <>
          <div className="flex justify-between">
            <h2>Danh sách món</h2>
            <Button text="Thêm món" cls="w-32" onClick={handleCreate} />
          </div>

          <div>
            {dishs?.dishValue?.map((dish, i) => (
              <div className="text-[14px]" key={i}>
                {i + 1}. {dish}
              </div>
            ))}
          </div>
          {/* Modal create */}
          <Modal
            title="Thêm món"
            content={
              <div className="px-6">
                <TextArea name="dish" row={5} />
              </div>
            }
            isOpen={isOpen}
            onClose={handleClose}
            onSave={handleSave}
          />
        </>
      )}
    </div>
  );
};

export default AdminCreateDish;
