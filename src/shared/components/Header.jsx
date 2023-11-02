import React from 'react';
import Button from './Button';

const Header = ({ user, onSignOut }) => {
  return (
    <div className="bg-slate-100 flex justify-between p-3 shadow sticky top-0 z-10">
      <h2 className="text-[20px] font-bold">Quản lý</h2>

      <div className="flex items-center gap-10">
        <div className="flex items-center gap-2 flex-shrink-0">
          <img src={user.photoURL} alt="avatar" className="h-7 w-7 rounded-full" />
          <p className="w-full">{user.displayName}</p>
        </div>

        <Button text="Logout" onClick={onSignOut} />
      </div>
    </div>
  );
};

export default Header;
