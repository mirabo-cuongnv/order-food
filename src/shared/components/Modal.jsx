import React from 'react';
import Button from './Button';

const Modal = ({ title, textClose, textSave, content, isOpen, onClose, onSave }) => {
  return (
    <>
      {isOpen ? (
        <form onSubmit={onSave}>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-full my-6 mx-auto max-w-lg px-5">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <Button text="x" cls="w-3 py-0 h-4 rounded-full" onClick={onClose} />
                </div>
                {/*body*/}
                <div className="relative py-6 flex-auto w-full">{content}</div>
                {/*footer*/}
                <div className="flex items-center justify-end gap-5 p-5 border-t border-solid border-slate-200 rounded-b">
                  <Button text={textClose || 'Close'} onClick={onClose} type="button" />
                  <Button text={textSave || 'OK'} type="submit" />
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </form>
      ) : null}
    </>
  );
};

export default Modal;
