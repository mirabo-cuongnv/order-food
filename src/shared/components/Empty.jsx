import React from 'react';

const Empty = ({
  image = 'https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg',
  textEmpty,
}) => {
  return (
    <div className="flex justify-center flex-col items-center">
      <img src={image} alt="" className="max-w-[80px] max-h-[80px]" />
      <span className="text-gray-400 font-mono">{textEmpty}</span>
    </div>
  );
};

export default Empty;
