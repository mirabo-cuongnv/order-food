import React, { useState } from 'react';

const Upload = ({ cls, text, onChangeInput }) => {
  return (
    <label htmlFor="upload-image" className={cls}>
      <input
        type="file"
        id="upload-image"
        name="upload-image"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={onChangeInput}
      />
      {text}
    </label>
  );
};

export default Upload;
